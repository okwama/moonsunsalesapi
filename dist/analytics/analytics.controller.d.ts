import { AnalyticsService } from './analytics.service';
export declare class AnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
    findAll(query: any): Promise<{
        loginStats: {
            totalSessions: number;
            totalDuration: number;
            averageDuration: number;
            activeDays: number;
        };
        journeyStats: {
            totalJourneys: number;
            completedJourneys: number;
            pendingJourneys: number;
            checkInRate: number;
        };
        salesStats: {
            totalSales: number;
            totalAmount: number;
            averageAmount: number;
            completedSales: number;
            pendingSales: number;
        };
        reportStats: {
            totalReports: number;
            productReports: number;
            feedbackReports: number;
            visibilityReports: number;
        };
    }>;
    findOne(id: string): Promise<{
        loginStats: {
            totalSessions: number;
            totalDuration: number;
            averageDuration: number;
            activeDays: number;
        };
        journeyStats: {
            totalJourneys: number;
            completedJourneys: number;
            pendingJourneys: number;
            checkInRate: number;
        };
        salesStats: {
            totalSales: number;
            totalAmount: number;
            averageAmount: number;
            completedSales: number;
            pendingSales: number;
        };
        reportStats: {
            totalReports: number;
            productReports: number;
            feedbackReports: number;
            visibilityReports: number;
        };
    }>;
    create(createAnalyticsDto: any): Promise<{
        message: string;
    }>;
    update(id: string, updateAnalyticsDto: any): Promise<{
        message: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    getDailyLoginHours(userId: string, query: any): Promise<{}>;
    getDailyJourneyVisits(userId: string, query: any): Promise<{}>;
}
