import { Repository } from 'typeorm';
import { LoginHistory } from '../entities/login-history.entity';
export declare class ClockOutSchedulerService {
    private loginHistoryRepository;
    private readonly logger;
    constructor(loginHistoryRepository: Repository<LoginHistory>);
    autoClockOutAllUsers(): Promise<void>;
    manualTriggerClockOut(): Promise<void>;
    getActiveSessionsCount(): Promise<number>;
}
