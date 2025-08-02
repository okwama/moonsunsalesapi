import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FeedbackReport } from '../entities/feedback-report.entity';
import { ProductReport } from '../entities/product-report.entity';
import { VisibilityReport } from '../entities/visibility-report.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(FeedbackReport)
    private feedbackReportRepository: Repository<FeedbackReport>,
    @InjectRepository(ProductReport)
    private productReportRepository: Repository<ProductReport>,
    @InjectRepository(VisibilityReport)
    private visibilityReportRepository: Repository<VisibilityReport>,
  ) {}

  async submitReport(reportData: any): Promise<any> {
    try {
      const { reportType, ...data } = reportData;

      switch (reportType) {
        case 'FEEDBACK':
          const feedbackReport = this.feedbackReportRepository.create(data);
          return await this.feedbackReportRepository.save(feedbackReport);

        case 'PRODUCT_AVAILABILITY':
          const productReport = this.productReportRepository.create(data);
          return await this.productReportRepository.save(productReport);

        case 'VISIBILITY_ACTIVITY':
          const visibilityReport = this.visibilityReportRepository.create(data);
          return await this.visibilityReportRepository.save(visibilityReport);

        default:
          throw new Error(`Unknown report type: ${reportType}`);
      }
    } catch (error) {
      throw new Error(`Failed to submit report: ${error.message}`);
    }
  }

  async getReportsByJourneyPlan(journeyPlanId: number): Promise<any> {
    try {
      const [feedbackReports, productReports, visibilityReports] = await Promise.all([
        this.feedbackReportRepository.find({
          where: { journeyPlanId },
          relations: ['salesrep', 'client'],
          order: { createdAt: 'DESC' },
        }),
        this.productReportRepository.find({
          where: { journeyPlanId },
          relations: ['salesrep', 'client'],
          order: { createdAt: 'DESC' },
        }),
        this.visibilityReportRepository.find({
          where: { journeyPlanId },
          relations: ['salesrep', 'client'],
          order: { createdAt: 'DESC' },
        }),
      ]);

      return {
        feedbackReports,
        productReports,
        visibilityReports,
      };
    } catch (error) {
      throw new Error(`Failed to get reports: ${error.message}`);
    }
  }

  async findAll(): Promise<any> {
    try {
      const [feedbackReports, productReports, visibilityReports] = await Promise.all([
        this.feedbackReportRepository.find({
          relations: ['salesrep', 'client'],
          order: { createdAt: 'DESC' },
        }),
        this.productReportRepository.find({
          relations: ['salesrep', 'client'],
          order: { createdAt: 'DESC' },
        }),
        this.visibilityReportRepository.find({
          relations: ['salesrep', 'client'],
          order: { createdAt: 'DESC' },
        }),
      ]);

      return {
        feedbackReports,
        productReports,
        visibilityReports,
      };
    } catch (error) {
      throw new Error(`Failed to get all reports: ${error.message}`);
    }
  }
}
