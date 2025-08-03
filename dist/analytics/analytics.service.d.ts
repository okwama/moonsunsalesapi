import { Repository } from 'typeorm';
import { LoginHistory } from '../entities/login-history.entity';
import { JourneyPlan } from '../journey-plans/entities/journey-plan.entity';
import { UpliftSale } from '../entities/uplift-sale.entity';
import { ProductReport } from '../entities/product-report.entity';
import { FeedbackReport } from '../entities/feedback-report.entity';
import { VisibilityReport } from '../entities/visibility-report.entity';
export declare class AnalyticsService {
    private loginHistoryRepository;
    private journeyPlanRepository;
    private upliftSaleRepository;
    private productReportRepository;
    private feedbackReportRepository;
    private visibilityReportRepository;
    constructor(loginHistoryRepository: Repository<LoginHistory>, journeyPlanRepository: Repository<JourneyPlan>, upliftSaleRepository: Repository<UpliftSale>, productReportRepository: Repository<ProductReport>, feedbackReportRepository: Repository<FeedbackReport>, visibilityReportRepository: Repository<VisibilityReport>);
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
    findOne(id: number): Promise<{
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
    update(id: number, updateAnalyticsDto: any): Promise<{
        message: string;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
    getDailyLoginHours(userId: number, query: any): Promise<{}>;
    getDailyJourneyVisits(userId: number, query: any): Promise<{}>;
    private _getLoginStats;
    private _getJourneyStats;
    private _getSalesStats;
    private _getReportStats;
}
