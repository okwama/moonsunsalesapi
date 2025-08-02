import { Repository } from 'typeorm';
import { LoginHistory } from '../entities/login-history.entity';
import { ClockInDto, ClockOutDto } from './dto';
export declare class ClockInOutService {
    private loginHistoryRepository;
    private readonly logger;
    constructor(loginHistoryRepository: Repository<LoginHistory>);
    clockIn(clockInDto: ClockInDto): Promise<{
        success: boolean;
        message: string;
        sessionId?: number;
    }>;
    clockOut(clockOutDto: ClockOutDto): Promise<{
        success: boolean;
        message: string;
        duration?: number;
    }>;
    getCurrentStatus(userId: number): Promise<{
        isClockedIn: boolean;
        sessionStart?: string;
        duration?: number;
    }>;
    getTodaySessions(userId: number): Promise<{
        sessions: any[];
    }>;
    getClockHistory(userId: number, startDate?: string, endDate?: string): Promise<{
        sessions: any[];
    }>;
    private formatDateTime;
    private formatDuration;
}
