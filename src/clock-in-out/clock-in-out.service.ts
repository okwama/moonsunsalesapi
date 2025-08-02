import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginHistory } from '../entities/login-history.entity';
import { ClockInDto, ClockOutDto } from './dto';

@Injectable()
export class ClockInOutService {
  private readonly logger = new Logger(ClockInOutService.name);

  constructor(
    @InjectRepository(LoginHistory)
    private loginHistoryRepository: Repository<LoginHistory>,
  ) {}

  /**
   * Clock In - Start a new session
   */
  async clockIn(clockInDto: ClockInDto): Promise<{ success: boolean; message: string; sessionId?: number }> {
    try {
      const { userId, clientTime } = clockInDto;

      this.logger.log(`🟢 Clock In attempt for user ${userId} at ${clientTime}`);

      // Check if user already has an active session
      const activeSession = await this.loginHistoryRepository.findOne({
        where: {
          userId,
          status: 1, // Active session
        },
        order: { sessionStart: 'DESC' },
      });

      if (activeSession) {
        this.logger.warn(`⚠️ User ${userId} already has an active session`);
        return {
          success: false,
          message: 'You are already clocked in. Please clock out first.',
        };
      }

      // Create new session
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
   * Clock Out - End current session
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

      // Calculate duration
      const startTime = new Date(activeSession.sessionStart);
      const endTime = new Date(clientTime);
      const durationMinutes = Math.floor((endTime.getTime() - startTime.getTime()) / (1000 * 60));

      // Update session
      await this.loginHistoryRepository.update(activeSession.id, {
        status: 2, // Ended
        sessionEnd: clientTime,
        duration: durationMinutes,
      });

      this.logger.log(`✅ User ${userId} clocked out successfully. Duration: ${durationMinutes} minutes`);

      return {
        success: true,
        message: 'Successfully clocked out',
        duration: durationMinutes,
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
  async getCurrentStatus(userId: number): Promise<{ isClockedIn: boolean; sessionStart?: string; duration?: number }> {
    try {
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
} 