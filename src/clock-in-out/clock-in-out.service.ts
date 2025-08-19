import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { LoginHistory } from '../entities/login-history.entity';
import { ClockInDto, ClockOutDto } from './dto';

@Injectable()
export class ClockInOutService {
  private readonly logger = new Logger(ClockInOutService.name);

  constructor(
    @InjectRepository(LoginHistory)
    private loginHistoryRepository: Repository<LoginHistory>,
    private dataSource: DataSource,
  ) {}

  /**
   * Clock In - Start a new session or continue existing session
   */
  async clockIn(clockInDto: ClockInDto): Promise<{ success: boolean; message: string; sessionId?: number }> {
    try {
      const { userId, clientTime } = clockInDto;

      this.logger.log(`🟢 Clock In attempt for user ${userId} at ${clientTime}`);

      // First, clean up any multiple active sessions (keep newest only)
      await this.cleanupMultipleActiveSessions(userId);

      // Check if user has an active session
      const activeSession = await this.loginHistoryRepository.findOne({
        where: {
          userId,
          status: 1, // Active session
        },
        order: { sessionStart: 'DESC' },
      });

      if (activeSession) {
        this.logger.log(`✅ User ${userId} has active session, continuing existing session`);
        return {
          success: true,
          message: 'Continuing existing session',
          sessionId: activeSession.id,
        };
      }

      // Check if user has a session today that can be continued
      const todaySession = await this.getTodaySession(userId, clientTime);
      
      if (todaySession && todaySession.status === 2) {
        // Continue today's session by making it active again
        await this.loginHistoryRepository.update(todaySession.id, {
          status: 1, // Make it active again
          sessionEnd: null, // Clear end time
          duration: 0, // Reset duration
        });

        this.logger.log(`✅ User ${userId} continuing today's session. Session ID: ${todaySession.id}`);

        return {
          success: true,
          message: 'Continuing today\'s session',
          sessionId: todaySession.id,
        };
      }

      // Check for any old active sessions from previous days and force close them
      await this.forceCloseOldSessions(userId, clientTime);

      // Create new session for today
      const newSession = this.loginHistoryRepository.create({
        userId,
        status: 1, // Active
        sessionStart: clientTime,
        timezone: 'Africa/Nairobi',
        duration: 0, // Will be calculated on clock out
      });

      const savedSession = await this.loginHistoryRepository.save(newSession);

      this.logger.log(`✅ User ${userId} clocked in successfully. Session ID: ${savedSession.id}`);

      return {
        success: true,
        message: 'Successfully clocked in',
        sessionId: savedSession.id,
      };
    } catch (error) {
      this.logger.error(`❌ Clock In failed for user ${clockInDto.userId}: ${error.message}`);
      return {
        success: false,
        message: 'Failed to clock in. Please try again.',
      };
    }
  }

  /**
   * Clock Out - End current session or update session end time
   */
  async clockOut(clockOutDto: ClockOutDto): Promise<{ success: boolean; message: string; duration?: number }> {
    try {
      const { userId, clientTime } = clockOutDto;

      this.logger.log(`🔴 Clock Out attempt for user ${userId} at ${clientTime}`);

      // Find active session
      const activeSession = await this.loginHistoryRepository.findOne({
        where: {
          userId,
          status: 1, // Active session
        },
        order: { sessionStart: 'DESC' },
      });

      if (!activeSession) {
        this.logger.warn(`⚠️ User ${userId} has no active session to clock out`);
        return {
          success: false,
          message: 'You are not currently clocked in.',
        };
      }

      // Calculate duration from original start time to current end time
      const startTime = new Date(activeSession.sessionStart);
      const endTime = new Date(clientTime);
      const durationMinutes = Math.floor((endTime.getTime() - startTime.getTime()) / (1000 * 60));

      // Validate duration (max 8 hours = 480 minutes)
      const validatedDuration = Math.min(durationMinutes, 480);
      
      // If duration exceeds 8 hours, cap the end time to 6:00 PM of the start day
      let finalEndTime = clientTime;
      if (durationMinutes > 480) {
        const cappedEndTime = new Date(startTime);
        cappedEndTime.setHours(18, 0, 0, 0); // 6:00 PM
        finalEndTime = cappedEndTime.toISOString().slice(0, 19).replace('T', ' ');
        this.logger.warn(`⚠️ Session duration exceeded 8 hours, capping end time to 6:00 PM for user ${userId}`);
      }

      // Update session
      await this.loginHistoryRepository.update(activeSession.id, {
        status: 2, // Ended
        sessionEnd: finalEndTime,
        duration: validatedDuration,
      });

      this.logger.log(`✅ User ${userId} clocked out successfully. Duration: ${validatedDuration} minutes`);

      return {
        success: true,
        message: 'Successfully clocked out',
        duration: validatedDuration,
      };
    } catch (error) {
      this.logger.error(`❌ Clock Out failed for user ${clockOutDto.userId}: ${error.message}`);
      return {
        success: false,
        message: 'Failed to clock out. Please try again.',
      };
    }
  }

  /**
   * Get current clock status
   */
  async getCurrentStatus(userId: number): Promise<{ isClockedIn: boolean; sessionStart?: string; duration?: number; sessionId?: number }> {
    try {
      // First, clean up any multiple active sessions
      await this.cleanupMultipleActiveSessions(userId);

      const activeSession = await this.loginHistoryRepository.findOne({
        where: {
          userId,
          status: 1, // Active session
        },
        order: { sessionStart: 'DESC' },
      });

      if (!activeSession) {
        return { isClockedIn: false };
      }

      // Calculate current duration
      const startTime = new Date(activeSession.sessionStart);
      const now = new Date();
      const currentDuration = Math.floor((now.getTime() - startTime.getTime()) / (1000 * 60));

      return {
        isClockedIn: true,
        sessionStart: activeSession.sessionStart,
        duration: currentDuration,
        sessionId: activeSession.id,
      };
    } catch (error) {
      this.logger.error(`❌ Get current status failed for user ${userId}: ${error.message}`);
      return { isClockedIn: false };
    }
  }

  /**
   * Get today's sessions
   */
  async getTodaySessions(userId: number): Promise<{ sessions: any[] }> {
    try {
      const today = new Date();
      const todayStr = today.toISOString().split('T')[0]; // YYYY-MM-DD

      const sessions = await this.loginHistoryRepository
        .createQueryBuilder('session')
        .where('session.userId = :userId', { userId })
        .andWhere('DATE(session.sessionStart) = :today', { today: todayStr })
        .orderBy('session.sessionStart', 'DESC')
        .getMany();

      const formattedSessions = sessions.map(session => ({
        id: session.id,
        sessionStart: session.sessionStart,
        sessionEnd: session.sessionEnd,
        duration: session.duration,
        status: session.status,
        timezone: session.timezone,
      }));

      return { sessions: formattedSessions };
    } catch (error) {
      this.logger.error(`❌ Get today's sessions failed for user ${userId}: ${error.message}`);
      return { sessions: [] };
    }
  }

  /**
   * Get clock history with date range
   */
  async getClockHistory(userId: number, startDate?: string, endDate?: string): Promise<{ sessions: any[] }> {
    try {
      this.logger.log(`📅 Getting clock history for user ${userId} from ${startDate} to ${endDate}`);

      let query = this.loginHistoryRepository
        .createQueryBuilder('session')
        .where('session.userId = :userId', { userId })
        .orderBy('session.sessionStart', 'DESC');

      if (startDate && endDate) {
        query = query.andWhere('DATE(session.sessionStart) BETWEEN :startDate AND :endDate', {
          startDate,
          endDate,
        });
      } else if (startDate) {
        query = query.andWhere('DATE(session.sessionStart) >= :startDate', { startDate });
      } else if (endDate) {
        query = query.andWhere('DATE(session.sessionStart) <= :endDate', { endDate });
      }

      const sessions = await query.getMany();

      const formattedSessions = sessions.map(session => ({
        id: session.id,
        sessionStart: session.sessionStart,
        sessionEnd: session.sessionEnd,
        duration: session.duration,
        status: session.status,
        timezone: session.timezone,
        // Add formatted fields for easier frontend consumption
        formattedStart: session.sessionStart ? this.formatDateTime(session.sessionStart) : null,
        formattedEnd: session.sessionEnd ? this.formatDateTime(session.sessionEnd) : null,
        formattedDuration: session.duration ? this.formatDuration(session.duration) : null,
        isActive: session.status === 1,
      }));

      this.logger.log(`✅ Found ${formattedSessions.length} clock sessions for user ${userId}`);

      return { sessions: formattedSessions };
    } catch (error) {
      this.logger.error(`❌ Get clock history failed for user ${userId}: ${error.message}`);
      return { sessions: [] };
    }
  }

  // Stored Procedure Method for optimized fetching
  async getClockSessionsWithProcedure(
    userId: number, 
    startDate?: string, 
    endDate?: string,
    limit: number = 50
  ): Promise<{ sessions: any[] }> {
    try {
      this.logger.log(`🚀 Using stored procedure for clock sessions - User: ${userId}`);

      const result = await this.dataSource.query(
        'CALL GetClockSessions(?, ?, ?, ?)',
        [userId, startDate || null, endDate || null, limit]
      );

      if (result && result.length > 0) {
        const sessions = result[0] || [];

        this.logger.log(`✅ Stored procedure executed successfully`);
        this.logger.log(`📊 Sessions found: ${sessions.length}`);

        return { sessions };
      } else {
        throw new Error('Invalid result from stored procedure');
      }
    } catch (error) {
      this.logger.log(`⚠️ Stored procedure failed, falling back to service method: ${error.message}`);
      return this.getClockSessionsFallback(userId, startDate, endDate);
    }
  }

  // Fallback method using existing service logic
  private async getClockSessionsFallback(
    userId: number, 
    startDate?: string, 
    endDate?: string
  ): Promise<{ sessions: any[] }> {
    const history = await this.getClockHistory(userId, startDate, endDate);
    return { sessions: history.sessions };
  }

  /**
   * Format date time for display
   */
  private formatDateTime(dateTimeStr: string): string {
    try {
      const date = new Date(dateTimeStr);
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
    } catch (e) {
      return dateTimeStr;
    }
  }

  /**
   * Format duration in hours and minutes
   */
  private formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${remainingMinutes}m`;
    } else {
      return `${remainingMinutes}m`;
    }
  }

  /**
   * Clean up multiple active sessions - keep newest only
   */
  private async cleanupMultipleActiveSessions(userId: number): Promise<void> {
    try {
      const activeSessions = await this.loginHistoryRepository.find({
        where: {
          userId,
          status: 1, // Active sessions
        },
        order: { sessionStart: 'DESC' },
      });

      if (activeSessions.length > 1) {
        this.logger.warn(`⚠️ User ${userId} has ${activeSessions.length} active sessions, cleaning up...`);
        
        // Keep the newest session (first in the array due to DESC order)
        const newestSession = activeSessions[0];
        const sessionsToClose = activeSessions.slice(1);

        for (const session of sessionsToClose) {
          // Auto-close old sessions with 6:00 PM end time
          const startTime = new Date(session.sessionStart);
          const endTime = new Date(startTime);
          endTime.setHours(18, 0, 0, 0); // 6:00 PM
          
          const durationMinutes = Math.floor((endTime.getTime() - startTime.getTime()) / (1000 * 60));

          await this.loginHistoryRepository.update(session.id, {
            status: 2, // Ended
            sessionEnd: endTime.toISOString().slice(0, 19).replace('T', ' '),
            duration: durationMinutes,
          });

          this.logger.log(`✅ Auto-closed old session ${session.id} for user ${userId}`);
        }
      }
    } catch (error) {
      this.logger.error(`❌ Failed to cleanup multiple active sessions for user ${userId}: ${error.message}`);
    }
  }

  /**
   * Force close old sessions for a user
   */
  private async forceCloseOldSessions(userId: number, currentTime: string): Promise<void> {
    try {
      const today = new Date(currentTime);
      const todayStr = today.toISOString().split('T')[0]; // YYYY-MM-DD

      // Find all sessions for the user from previous days
      const oldSessions = await this.loginHistoryRepository
        .createQueryBuilder('session')
        .where('session.userId = :userId', { userId })
        .andWhere('DATE(session.sessionStart) < :today', { today: todayStr })
        .andWhere('session.status = 1') // Only active sessions
        .getMany();

      if (oldSessions.length > 0) {
        this.logger.warn(`⚠️ User ${userId} has ${oldSessions.length} old active sessions, forcing close...`);

        for (const session of oldSessions) {
          const startTime = new Date(session.sessionStart);
          const endTime = new Date(startTime);
          endTime.setHours(18, 0, 0, 0); // 6:00 PM
          
          const durationMinutes = Math.floor((endTime.getTime() - startTime.getTime()) / (1000 * 60));

          await this.loginHistoryRepository.update(session.id, {
            status: 2, // Ended
            sessionEnd: endTime.toISOString().slice(0, 19).replace('T', ' '),
            duration: durationMinutes,
          });

          this.logger.log(`✅ Forced closed old session ${session.id} for user ${userId}`);
        }
      }
    } catch (error) {
      this.logger.error(`❌ Failed to force close old sessions for user ${userId}: ${error.message}`);
    }
  }

  /**
   * Get today's session for a user
   */
  private async getTodaySession(userId: number, clientTime: string): Promise<any> {
    try {
      const today = new Date(clientTime);
      const todayStr = today.toISOString().split('T')[0]; // YYYY-MM-DD

      const todaySession = await this.loginHistoryRepository
        .createQueryBuilder('session')
        .where('session.userId = :userId', { userId })
        .andWhere('DATE(session.sessionStart) = :today', { today: todayStr })
        .orderBy('session.sessionStart', 'DESC')
        .getOne();

      return todaySession;
    } catch (error) {
      this.logger.error(`❌ Failed to get today's session for user ${userId}: ${error.message}`);
      return null;
    }
  }

  /**
   * Force clock out a user (admin function)
   */
  async forceClockOut(userId: number): Promise<{ success: boolean; message: string; closedSessions?: number }> {
    try {
      this.logger.log(`🔧 Force clock out requested for user ${userId}`);

      // Find all active sessions for the user
      const activeSessions = await this.loginHistoryRepository.find({
        where: {
          userId,
          status: 1, // Active sessions
        },
        order: { sessionStart: 'DESC' },
      });

      if (activeSessions.length === 0) {
        return {
          success: false,
          message: 'User has no active sessions to close.',
        };
      }

      let closedCount = 0;

      for (const session of activeSessions) {
        const startTime = new Date(session.sessionStart);
        const endTime = new Date(startTime);
        endTime.setHours(18, 0, 0, 0); // 6:00 PM
        
        const durationMinutes = Math.floor((endTime.getTime() - startTime.getTime()) / (1000 * 60));

        await this.loginHistoryRepository.update(session.id, {
          status: 2, // Ended
          sessionEnd: endTime.toISOString().slice(0, 19).replace('T', ' '),
          duration: durationMinutes,
        });

        closedCount++;
        this.logger.log(`✅ Force closed session ${session.id} for user ${userId}`);
      }

      this.logger.log(`✅ Force clock out completed for user ${userId}. Closed ${closedCount} sessions.`);

      return {
        success: true,
        message: `Successfully closed ${closedCount} active session(s)`,
        closedSessions: closedCount,
      };
    } catch (error) {
      this.logger.error(`❌ Force clock out failed for user ${userId}: ${error.message}`);
      return {
        success: false,
        message: 'Failed to force clock out. Please try again.',
      };
    }
  }
} 