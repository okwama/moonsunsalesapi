import { TargetsService } from './targets.service';
export declare class TargetsController {
    private readonly targetsService;
    constructor(targetsService: TargetsService);
    getMonthlyVisits(userId: string): Promise<any[]>;
    getDashboard(userId: string, period?: string): Promise<any>;
    getVisitStatistics(userId: string, period?: string): Promise<any>;
    checkJourneyData(userId: string): Promise<any>;
}
