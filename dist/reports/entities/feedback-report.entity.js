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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackReport = void 0;
const typeorm_1 = require("typeorm");
let FeedbackReport = class FeedbackReport {
};
exports.FeedbackReport = FeedbackReport;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], FeedbackReport.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'reportId', type: 'int', unique: true }),
    __metadata("design:type", Number)
], FeedbackReport.prototype, "reportId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'comment', type: 'text', nullable: true }),
    __metadata("design:type", String)
], FeedbackReport.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'createdAt', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], FeedbackReport.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'clientId', type: 'int' }),
    __metadata("design:type", Number)
], FeedbackReport.prototype, "clientId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'userId', type: 'int' }),
    __metadata("design:type", Number)
], FeedbackReport.prototype, "userId", void 0);
exports.FeedbackReport = FeedbackReport = __decorate([
    (0, typeorm_1.Entity)('FeedbackReport'),
    (0, typeorm_1.Index)('idx_userId', ['userId']),
    (0, typeorm_1.Index)('idx_clientId', ['clientId']),
    (0, typeorm_1.Index)('idx_reportId', ['reportId'])
], FeedbackReport);
//# sourceMappingURL=feedback-report.entity.js.map