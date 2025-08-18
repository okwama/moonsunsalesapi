import { ClockInOutService } from './clock-in-out.service';
import { ClockOutSchedulerService } from './clock-out-scheduler.service';
import { ClockInDto, ClockOutDto } from './dto';
export declare class ClockInOutController {
    private readonly clockInOutService;
    private readonly clockOutSchedulerService;
    constructor(clockInOutService: ClockInOutService, clockOutSchedulerService: ClockOutSchedulerService);
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
    getCurrentStatus(userId: string): Promise<{
        isClockedIn: boolean;
        sessionStart?: string;
        duration?: number;
    }>;
    getTodaySessions(userId: string): Promise<{
        sessions: any[];
    }>;
    getClockHistory(userId: string, startDate?: string, endDate?: string): Promise<{
        sessions: any[];
    }>;
    triggerAutoClockOut(): Promise<void>;
    getActiveSessionsCount(): Promise<{
        activeSessionsCount: number;
    }>;
}
