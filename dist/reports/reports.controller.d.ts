import { ReportsService } from './reports.service';
export declare class ReportsController {
    private readonly reportsService;
    constructor(reportsService: ReportsService);
    submitReport(reportData: any): Promise<{
        success: boolean;
        report: {
            id: any;
            type: any;
            journeyPlanId: any;
            userId: any;
            clientId: any;
            createdAt: any;
        };
        specificReport: any;
        message: string;
    } | {
        success: boolean;
        error: any;
    }>;
    getReportsByJourneyPlan(journeyPlanId: number): Promise<{
        success: boolean;
        data: any;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        data?: undefined;
    }>;
    getAllReports(): Promise<{
        success: boolean;
        data: any;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        data?: undefined;
    }>;
}
