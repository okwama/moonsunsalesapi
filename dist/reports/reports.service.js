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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const feedback_report_entity_1 = require("../entities/feedback-report.entity");
const product_report_entity_1 = require("../entities/product-report.entity");
const visibility_report_entity_1 = require("../entities/visibility-report.entity");
let ReportsService = class ReportsService {
    constructor(feedbackReportRepository, productReportRepository, visibilityReportRepository) {
        this.feedbackReportRepository = feedbackReportRepository;
        this.productReportRepository = productReportRepository;
        this.visibilityReportRepository = visibilityReportRepository;
    }
    async submitReport(reportData) {
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
        }
        catch (error) {
            throw new Error(`Failed to submit report: ${error.message}`);
        }
    }
    async getReportsByJourneyPlan(journeyPlanId) {
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
        }
        catch (error) {
            throw new Error(`Failed to get reports: ${error.message}`);
        }
    }
    async findAll() {
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
        }
        catch (error) {
            throw new Error(`Failed to get all reports: ${error.message}`);
        }
    }
};
exports.ReportsService = ReportsService;
exports.ReportsService = ReportsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(feedback_report_entity_1.FeedbackReport)),
    __param(1, (0, typeorm_1.InjectRepository)(product_report_entity_1.ProductReport)),
    __param(2, (0, typeorm_1.InjectRepository)(visibility_report_entity_1.VisibilityReport)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ReportsService);
//# sourceMappingURL=reports.service.js.map