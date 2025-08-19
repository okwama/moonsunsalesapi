"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ClockInOutService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClockInOutService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const login_history_entity_1 = require("../entities/login-history.entity");
let ClockInOutService = ClockInOutService_1 = class ClockInOutService {
    constructor(loginHistoryRepository, dataSource) {
        this.loginHistoryRepository = loginHistoryRepository;
        this.dataSource = dataSource;
        this.logger = new common_1.Logger(ClockInOutService_1.name);
    }
    async clockIn(clockInDto) {
        try {
            const { userId, clientTime } = clockInDto;
            this.logger.log(`🟢 Clock In attempt for user ${userId} at ${clientTime}`);
            await this.cleanupMultipleActiveSessions(userId);
            const activeSession = await this.loginHistoryRepository.findOne({
                where: {
                    userId,
                    status: 1,
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
            const todaySession = await this.getTodaySession(userId, clientTime);
            if (todaySession && todaySession.status === 2) {
                await this.loginHistoryRepository.update(todaySession.id, {
                    status: 1,
                    sessionEnd: null,
                    duration: 0,
                });
                this.logger.log(`✅ User ${userId} continuing today's session. Session ID: ${todaySession.id}`);
                return {
                    success: true,
                    message: 'Continuing today\'s session',
                    sessionId: todaySession.id,
                };
            }
            await this.forceCloseOldSessions(userId, clientTime);
            const newSession = this.loginHistoryRepository.create({
                userId,
                status: 1,
                sessionStart: clientTime,
                timezone: 'Africa/Nairobi',
                duration: 0,
            });
            const savedSession = await this.loginHistoryRepository.save(newSession);
            this.logger.log(`✅ User ${userId} clocked in successfully. Session ID: ${savedSession.id}`);
            return {
                success: true,
                message: 'Successfully clocked in',
                sessionId: savedSession.id,
            };
        }
        catch (error) {
            this.logger.error(`❌ Clock In failed for user ${clockInDto.userId}: ${error.message}`);
            return {
                success: false,
                message: 'Failed to clock in. Please try again.',
            };
        }
    }
    async clockOut(clockOutDto) {
        try {
            const { userId, clientTime } = clockOutDto;
            this.logger.log(`🔴 Clock Out attempt for user ${userId} at ${clientTime}`);
            const activeSession = await this.loginHistoryRepository.findOne({
                where: {
                    userId,
                    status: 1,
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
            const startTime = new Date(activeSession.sessionStart);
            const endTime = new Date(clientTime);
            const durationMinutes = Math.floor((endTime.getTime() - startTime.getTime()) / (1000 * 60));
            const validatedDuration = Math.min(durationMinutes, 480);
            let finalEndTime = clientTime;
            if (durationMinutes > 480) {
                const cappedEndTime = new Date(startTime);
                cappedEndTime.setHours(18, 0, 0, 0);
                finalEndTime = cappedEndTime.toISOString().slice(0, 19).replace('T', ' ');
                this.logger.warn(`⚠️ Session duration exceeded 8 hours, capping end time to 6:00 PM for user ${userId}`);
            }
            await this.loginHistoryRepository.update(activeSession.id, {
                status: 2,
                sessionEnd: finalEndTime,
                duration: validatedDuration,
            });
            this.logger.log(`✅ User ${userId} clocked out successfully. Duration: ${validatedDuration} minutes`);
            return {
                success: true,
                message: 'Successfully clocked out',
                duration: validatedDuration,
            };
        }
        catch (error) {
            this.logger.error(`❌ Clock Out failed for user ${clockOutDto.userId}: ${error.message}`);
            return {
                success: false,
                message: 'Failed to clock out. Please try again.',
            };
        }
    }
    async getCurrentStatus(userId) {
        try {
            await this.cleanupMultipleActiveSessions(userId);
            const activeSession = await this.loginHistoryRepository.findOne({
                where: {
                    userId,
                    status: 1,
                },
                order: { sessionStart: 'DESC' },
            });
            if (!activeSession) {
                return { isClockedIn: false };
            }
            const startTime = new Date(activeSession.sessionStart);
            const now = new Date();
            const currentDuration = Math.floor((now.getTime() - startTime.getTime()) / (1000 * 60));
            return {
                isClockedIn: true,
                sessionStart: activeSession.sessionStart,
                duration: currentDuration,
                sessionId: activeSession.id,
            };
        }
        catch (error) {
            this.logger.error(`❌ Get current status failed for user ${userId}: ${error.message}`);
            return { isClockedIn: false };
        }
    }
    async getTodaySessions(userId) {
        try {
            const today = new Date();
            const todayStr = today.toISOString().split('T')[0];
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
        }
        catch (error) {
            this.logger.error(`❌ Get today's sessions failed for user ${userId}: ${error.message}`);
            return { sessions: [] };
        }
    }
    async getClockHistory(userId, startDate, endDate) {
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
            }
            else if (startDate) {
                query = query.andWhere('DATE(session.sessionStart) >= :startDate', { startDate });
            }
            else if (endDate) {
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
                formattedStart: session.sessionStart ? this.formatDateTime(session.sessionStart) : null,
                formattedEnd: session.sessionEnd ? this.formatDateTime(session.sessionEnd) : null,
                formattedDuration: session.duration ? this.formatDuration(session.duration) : null,
                isActive: session.status === 1,
            }));
            this.logger.log(`✅ Found ${formattedSessions.length} clock sessions for user ${userId}`);
            return { sessions: formattedSessions };
        }
        catch (error) {
            this.logger.error(`❌ Get clock history failed for user ${userId}: ${error.message}`);
            return { sessions: [] };
        }
    }
    async getClockSessionsWithProcedure(userId, startDate, endDate, limit = 50) {
        try {
            this.logger.log(`🚀 Using stored procedure for clock sessions - User: ${userId}`);
            const result = await this.dataSource.query('CALL GetClockSessions(?, ?, ?, ?)', [userId, startDate || null, endDate || null, limit]);
            if (result && result.length > 0) {
                const sessions = result[0] || [];
                this.logger.log(`✅ Stored procedure executed successfully`);
                this.logger.log(`📊 Sessions found: ${sessions.length}`);
                return { sessions };
            }
            else {
                throw new Error('Invalid result from stored procedure');
            }
        }
        catch (error) {
            this.logger.log(`⚠️ Stored procedure failed, falling back to service method: ${error.message}`);
            return this.getClockSessionsFallback(userId, startDate, endDate);
        }
    }
    async getClockSessionsFallback(userId, startDate, endDate) {
        const history = await this.getClockHistory(userId, startDate, endDate);
        return { sessions: history.sessions };
    }
    formatDateTime(dateTimeStr) {
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
        }
        catch (e) {
            return dateTimeStr;
        }
    }
    formatDuration(minutes) {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        if (hours > 0) {
            return `${hours}h ${remainingMinutes}m`;
        }
        else {
            return `${remainingMinutes}m`;
        }
    }
    async cleanupMultipleActiveSessions(userId) {
        try {
            const activeSessions = await this.loginHistoryRepository.find({
                where: {
                    userId,
                    status: 1,
                },
                order: { sessionStart: 'DESC' },
            });
            if (activeSessions.length > 1) {
                this.logger.warn(`⚠️ User ${userId} has ${activeSessions.length} active sessions, cleaning up...`);
                const newestSession = activeSessions[0];
                const sessionsToClose = activeSessions.slice(1);
                for (const session of sessionsToClose) {
                    const startTime = new Date(session.sessionStart);
                    const endTime = new Date(startTime);
                    endTime.setHours(18, 0, 0, 0);
                    const durationMinutes = Math.floor((endTime.getTime() - startTime.getTime()) / (1000 * 60));
                    await this.loginHistoryRepository.update(session.id, {
                        status: 2,
                        sessionEnd: endTime.toISOString().slice(0, 19).replace('T', ' '),
                        duration: durationMinutes,
                    });
                    this.logger.log(`✅ Auto-closed old session ${session.id} for user ${userId}`);
                }
            }
        }
        catch (error) {
            this.logger.error(`❌ Failed to cleanup multiple active sessions for user ${userId}: ${error.message}`);
        }
    }
    async forceCloseOldSessions(userId, currentTime) {
        try {
            const today = new Date(currentTime);
            const todayStr = today.toISOString().split('T')[0];
            const oldSessions = await this.loginHistoryRepository
                .createQueryBuilder('session')
                .where('session.userId = :userId', { userId })
                .andWhere('DATE(session.sessionStart) < :today', { today: todayStr })
                .andWhere('session.status = 1')
                .getMany();
            if (oldSessions.length > 0) {
                this.logger.warn(`⚠️ User ${userId} has ${oldSessions.length} old active sessions, forcing close...`);
                for (const session of oldSessions) {
                    const startTime = new Date(session.sessionStart);
                    const endTime = new Date(startTime);
                    endTime.setHours(18, 0, 0, 0);
                    const durationMinutes = Math.floor((endTime.getTime() - startTime.getTime()) / (1000 * 60));
                    await this.loginHistoryRepository.update(session.id, {
                        status: 2,
                        sessionEnd: endTime.toISOString().slice(0, 19).replace('T', ' '),
                        duration: durationMinutes,
                    });
                    this.logger.log(`✅ Forced closed old session ${session.id} for user ${userId}`);
                }
            }
        }
        catch (error) {
            this.logger.error(`❌ Failed to force close old sessions for user ${userId}: ${error.message}`);
        }
    }
    async getTodaySession(userId, clientTime) {
        try {
            const today = new Date(clientTime);
            const todayStr = today.toISOString().split('T')[0];
            const todaySession = await this.loginHistoryRepository
                .createQueryBuilder('session')
                .where('session.userId = :userId', { userId })
                .andWhere('DATE(session.sessionStart) = :today', { today: todayStr })
                .orderBy('session.sessionStart', 'DESC')
                .getOne();
            return todaySession;
        }
        catch (error) {
            this.logger.error(`❌ Failed to get today's session for user ${userId}: ${error.message}`);
            return null;
        }
    }
    async forceClockOut(userId) {
        try {
            this.logger.log(`🔧 Force clock out requested for user ${userId}`);
            const activeSessions = await this.loginHistoryRepository.find({
                where: {
                    userId,
                    status: 1,
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
                endTime.setHours(18, 0, 0, 0);
                const durationMinutes = Math.floor((endTime.getTime() - startTime.getTime()) / (1000 * 60));
                await this.loginHistoryRepository.update(session.id, {
                    status: 2,
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
        }
        catch (error) {
            this.logger.error(`❌ Force clock out failed for user ${userId}: ${error.message}`);
            return {
                success: false,
                message: 'Failed to force clock out. Please try again.',
            };
        }
    }
};
exports.ClockInOutService = ClockInOutService;
exports.ClockInOutService = ClockInOutService = ClockInOutService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(login_history_entity_1.LoginHistory)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource])
], ClockInOutService);
//# sourceMappingURL=clock-in-out.service.js.map