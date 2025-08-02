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
    constructor(loginHistoryRepository) {
        this.loginHistoryRepository = loginHistoryRepository;
        this.logger = new common_1.Logger(ClockInOutService_1.name);
    }
    async clockIn(clockInDto) {
        try {
            const { userId, clientTime } = clockInDto;
            this.logger.log(`🟢 Clock In attempt for user ${userId} at ${clientTime}`);
            const activeSession = await this.loginHistoryRepository.findOne({
                where: {
                    userId,
                    status: 1,
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
            await this.loginHistoryRepository.update(activeSession.id, {
                status: 2,
                sessionEnd: clientTime,
                duration: durationMinutes,
            });
            this.logger.log(`✅ User ${userId} clocked out successfully. Duration: ${durationMinutes} minutes`);
            return {
                success: true,
                message: 'Successfully clocked out',
                duration: durationMinutes,
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
};
exports.ClockInOutService = ClockInOutService;
exports.ClockInOutService = ClockInOutService = ClockInOutService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(login_history_entity_1.LoginHistory)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ClockInOutService);
//# sourceMappingURL=clock-in-out.service.js.map