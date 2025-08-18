import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginHistory } from '../entities/login-history.entity';

@Injectable()
export class ClockOutSchedulerService {
  private readonly logger = new Logger(ClockOutSchedulerService.name);

  constructor(
    @InjectRepository(LoginHistory)
    private loginHistoryRepository: Repository<LoginHistory>,
  ) {}

  @Cron('0 19 * * *') // 7:00 PM daily
  async autoClockOutAllUsers() {
    this.logger.log('🕕 Running automatic clock-out job at 7:00 PM (showing 6:00 PM end time)');
    
    try {
      // Get current date for 6 PM end time
      const today = new Date();
      const endTime = new Date(today);
      endTime.setHours(18, 0, 0, 0); // 6:00 PM
      
      const formattedEndTime = endTime.toISOString().slice(0, 19).replace('T', ' ');
      
      this.logger.log(`📅 Setting end time to: ${formattedEndTime}`);
      
      // Find all active sessions
      const activeSessions = await this.loginHistoryRepository.find({
        where: {
          status: 1, // Active sessions
        },
      });

      this.logger.log(`🔍 Found ${activeSessions.length} active sessions to clock out`);

      let successCount = 0;
      let errorCount = 0;

      // Process each active session
      for (const session of activeSessions) {
        try {
          // Calculate duration from start to 6 PM
          const startTime = new Date(session.sessionStart);
          const endTimeDate = new Date(formattedEndTime);
          const durationMinutes = Math.floor((endTimeDate.getTime() - startTime.getTime()) / (1000 * 60));

          // Update session to clock out at 6 PM
          await this.loginHistoryRepository.update(session.id, {
            status: 2, // Ended
            sessionEnd: formattedEndTime,
            duration: durationMinutes,
          });

          this.logger.log(`✅ Auto clock-out successful for user ${session.userId}. Duration: ${durationMinutes} minutes`);
          successCount++;
        } catch (error) {
          this.logger.error(`❌ Auto clock-out failed for user ${session.userId}: ${error.message}`);
          errorCount++;
        }
      }

      this.logger.log(`🎯 Automatic clock-out completed: ${successCount} successful, ${errorCount} failed`);
      
      // Log summary
      if (successCount > 0) {
        this.logger.log(`✅ Successfully clocked out ${successCount} users at 6:00 PM`);
      }
      if (errorCount > 0) {
        this.logger.warn(`⚠️ Failed to clock out ${errorCount} users`);
      }
      
    } catch (error) {
      this.logger.error('❌ Automatic clock-out job failed:', error);
    }
  }

  // Manual trigger method for testing
  async manualTriggerClockOut() {
    this.logger.log('🔧 Manually triggering automatic clock-out job');
    await this.autoClockOutAllUsers();
  }

  // Get count of active sessions
  async getActiveSessionsCount(): Promise<number> {
    return await this.loginHistoryRepository.count({
      where: {
        status: 1, // Active sessions
      },
    });
  }
}
