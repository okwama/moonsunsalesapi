import { Repository } from 'typeorm';
import { FeedbackReport } from '../entities/feedback-report.entity';
import { ProductReport } from '../entities/product-report.entity';
import { VisibilityReport } from '../entities/visibility-report.entity';
export declare class ReportsService {
    private feedbackReportRepository;
    private productReportRepository;
    private visibilityReportRepository;
    constructor(feedbackReportRepository: Repository<FeedbackReport>, productReportRepository: Repository<ProductReport>, visibilityReportRepository: Repository<VisibilityReport>);
    submitReport(reportData: any): Promise<any>;
    getReportsByJourneyPlan(journeyPlanId: number): Promise<any>;
    findAll(): Promise<any>;
}
