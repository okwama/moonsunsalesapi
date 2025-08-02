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
var SessionsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let SessionsService = SessionsService_1 = class SessionsService {
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.logger = new common_1.Logger(SessionsService_1.name);
    }
    async recordLogin(userId, clientTime) {
        try {
            this.logger.log(`🔐 Recording login for user ${userId} at ${clientTime}`);
            const userLoginTime = new Date(clientTime);
            const now = new Date();
            const localNow = new Date(now.getTime() + (3 * 60 * 60 * 1000));
            const shiftStart = new Date(localNow);
            shiftStart.setHours(9, 0, 0, 0);
            if (userLoginTime < shiftStart) {
                this.logger.warn(`❌ Early login attempt for user ${userId} at ${userLoginTime.toISOString()}`);
                throw new common_1.BadRequestException('Sessions can only be started from 9:00 AM');
            }
            const todayStart = new Date(now);
            todayStart.setHours(0, 0, 0, 0);
            const todayEnd = new Date(todayStart);
            todayEnd.setDate(todayEnd.getDate() + 1);
            this.logger.log(`🔍 Checking for active sessions between ${todayStart.toISOString()} and ${todayEnd.toISOString()}`);
            const activeSession = await this.dataSource.query(`SELECT * FROM LoginHistory 
         WHERE userId = ? AND status = 1 
         AND sessionStart >= ? AND sessionStart < ?`, [userId, todayStart.toISOString(), todayEnd.toISOString()]);
            this.logger.log(`🔍 Found ${activeSession.length} active sessions for user ${userId}`);
            if (activeSession.length > 0) {
                this.logger.warn(`❌ Active session exists for user ${userId}`);
                throw new common_1.ConflictException('You already have an active session for today. Please end your current session first.');
            }
            const localLoginTime = new Date(userLoginTime.getTime() + (3 * 60 * 60 * 1000));
            const formattedLoginTime = localLoginTime.toISOString().slice(0, 19).replace('T', ' ');
            this.logger.log(`📝 Creating new session for user ${userId} at ${formattedLoginTime} (EAT)`);
            const insertQuery = `INSERT INTO LoginHistory (userId, sessionStart, timezone, status) VALUES (?, ?, ?, ?)`;
            const insertParams = [userId, formattedLoginTime, 'Africa/Nairobi', 1];
            this.logger.log(`📝 Executing query: ${insertQuery}`);
            this.logger.log(`📝 Parameters: ${JSON.stringify(insertParams)}`);
            const result = await this.dataSource.query(insertQuery, insertParams);
            this.logger.log(`✅ Session created for user ${userId}, result:`, result);
            return {
                success: true,
                message: 'Session started successfully',
                loginAt: formattedLoginTime,
                sessionId: result.insertId || result[0]?.insertId
            };
        }
        catch (error) {
            this.logger.error(`❌ Error recording login for user ${userId}:`, error);
            throw error;
        }
    }
    async recordLogout(userId, clientTime) {
        try {
            this.logger.log(`🚪 Recording logout for user ${userId} at ${clientTime}`);
            const userLogoutTime = new Date(clientTime);
            const now = new Date();
            const todayStart = new Date(now);
            todayStart.setHours(0, 0, 0, 0);
            const todayEnd = new Date(todayStart);
            todayEnd.setDate(todayEnd.getDate() + 1);
            const activeSession = await this.dataSource.query(`SELECT * FROM LoginHistory 
         WHERE userId = ? AND status = 1 
         AND sessionStart >= ? AND sessionStart < ?
         ORDER BY sessionStart DESC LIMIT 1`, [userId, todayStart.toISOString(), todayEnd.toISOString()]);
            if (activeSession.length === 0) {
                throw new common_1.BadRequestException('No active session found to end');
            }
            const session = activeSession[0];
            const sessionStart = new Date(session.sessionStart);
            const sessionEnd = userLogoutTime;
            const duration = Math.floor((sessionEnd.getTime() - sessionStart.getTime()) / (1000 * 60));
            const localSessionEnd = new Date(sessionEnd.getTime() + (3 * 60 * 60 * 1000));
            const formattedSessionEnd = localSessionEnd.toISOString().slice(0, 19).replace('T', ' ');
            await this.dataSource.query(`UPDATE LoginHistory 
         SET sessionEnd = ?, duration = ?, status = 2 
         WHERE id = ?`, [formattedSessionEnd, duration, session.id]);
            this.logger.log(`✅ Session ended for user ${userId}, duration: ${duration} minutes`);
            return {
                success: true,
                message: 'Session ended successfully',
                logoutAt: formattedSessionEnd,
                duration: duration,
                sessionId: session.id
            };
        }
        catch (error) {
            this.logger.error(`❌ Error recording logout for user ${userId}:`, error);
            throw error;
        }
    }
    async getSessionHistory(userId, startDate, endDate) {
        try {
            this.logger.log(`📊 Getting session history for user ${userId}`);
            let query = `SELECT * FROM LoginHistory WHERE userId = ?`;
            const params = [userId];
            if (startDate) {
                query += ` AND DATE(sessionStart) >= ?`;
                params.push(startDate);
            }
            if (endDate) {
                query += ` AND DATE(sessionStart) <= ?`;
                params.push(endDate);
            }
            query += ` ORDER BY sessionStart DESC`;
            const sessions = await this.dataSource.query(query, params);
            this.logger.log(`✅ Retrieved ${sessions.length} sessions for user ${userId}`);
            return {
                sessions: sessions.map(session => ({
                    id: session.id,
                    userId: session.userId,
                    sessionStart: session.sessionStart,
                    sessionEnd: session.sessionEnd,
                    duration: session.duration,
                    status: session.status,
                    timezone: session.timezone
                }))
            };
        }
        catch (error) {
            this.logger.error(`❌ Error getting session history for user ${userId}:`, error);
            throw error;
        }
    }
    async findAll(query) {
        try {
            const result = await this.dataSource.query('CALL GetSessions(?, ?, ?)', [query.userId, query.status, query.limit]);
            return result[0];
        }
        catch (error) {
            console.error('Error fetching sessions:', error);
            throw new Error('Failed to fetch sessions');
        }
    }
    async findOne(id) {
        try {
            const result = await this.dataSource.query('CALL GetSessionById(?)', [id]);
            return result[0][0];
        }
        catch (error) {
            console.error('Error fetching session by ID:', error);
            throw new Error('Failed to fetch session');
        }
    }
    async create(createSessionDto) {
        try {
            const result = await this.dataSource.query('CALL CreateSession(?, ?, ?, ?)', [
                createSessionDto.userId,
                createSessionDto.startTime,
                createSessionDto.endTime,
                createSessionDto.status
            ]);
            return result[0][0];
        }
        catch (error) {
            console.error('Error creating session:', error);
            throw new Error('Failed to create session');
        }
    }
    async update(id, updateSessionDto) {
        try {
            const result = await this.dataSource.query('CALL UpdateSession(?, ?, ?, ?, ?)', [
                id,
                updateSessionDto.userId,
                updateSessionDto.startTime,
                updateSessionDto.endTime,
                updateSessionDto.status
            ]);
            return result[0][0];
        }
        catch (error) {
            console.error('Error updating session:', error);
            throw new Error('Failed to update session');
        }
    }
    async remove(id) {
        try {
            await this.dataSource.query('CALL DeleteSession(?)', [id]);
            return { message: 'Session deleted successfully' };
        }
        catch (error) {
            console.error('Error deleting session:', error);
            throw new Error('Failed to delete session');
        }
    }
    async checkActiveSession(userId) {
        try {
            this.logger.log(`🔍 Checking active session for user ${userId}`);
            const now = new Date();
            const todayStart = new Date(now);
            todayStart.setHours(0, 0, 0, 0);
            const todayEnd = new Date(todayStart);
            todayEnd.setDate(todayEnd.getDate() + 1);
            const activeSession = await this.dataSource.query(`SELECT * FROM LoginHistory 
         WHERE userId = ? AND status = 1 
         AND sessionStart >= ? AND sessionStart < ?
         ORDER BY sessionStart DESC LIMIT 1`, [userId, todayStart.toISOString(), todayEnd.toISOString()]);
            if (activeSession.length > 0) {
                const session = activeSession[0];
                const sessionStart = new Date(session.sessionStart);
                const currentDuration = Math.floor((now.getTime() - sessionStart.getTime()) / (1000 * 60));
                this.logger.log(`✅ Active session found for user ${userId}, duration: ${currentDuration} minutes`);
                return {
                    hasActiveSession: true,
                    sessionId: session.id,
                    sessionStart: session.sessionStart,
                    duration: currentDuration,
                    timezone: session.timezone
                };
            }
            else {
                this.logger.log(`❌ No active session found for user ${userId}`);
                return {
                    hasActiveSession: false,
                    sessionId: null,
                    sessionStart: null,
                    duration: 0,
                    timezone: null
                };
            }
        }
        catch (error) {
            this.logger.error(`❌ Error checking active session for user ${userId}:`, error);
            throw error;
        }
    }
};
exports.SessionsService = SessionsService;
exports.SessionsService = SessionsService = SessionsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], SessionsService);
//# sourceMappingURL=sessions.service.js.map