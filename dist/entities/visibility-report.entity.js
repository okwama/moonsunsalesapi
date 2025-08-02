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
exports.VisibilityReport = void 0;
const typeorm_1 = require("typeorm");
const sales_rep_entity_1 = require("./sales-rep.entity");
const clients_entity_1 = require("./clients.entity");
let VisibilityReport = class VisibilityReport {
};
exports.VisibilityReport = VisibilityReport;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], VisibilityReport.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'journey_plan_id' }),
    __metadata("design:type", Number)
], VisibilityReport.prototype, "journeyPlanId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'salesrep_id' }),
    __metadata("design:type", Number)
], VisibilityReport.prototype, "salesrepId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'client_id' }),
    __metadata("design:type", Number)
], VisibilityReport.prototype, "clientId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'visibility_activity' }),
    __metadata("design:type", String)
], VisibilityReport.prototype, "visibilityActivity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'activity_details', type: 'text', nullable: true }),
    __metadata("design:type", String)
], VisibilityReport.prototype, "activityDetails", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'report_type', default: 'VISIBILITY_ACTIVITY' }),
    __metadata("design:type", String)
], VisibilityReport.prototype, "reportType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'status', default: 'PENDING' }),
    __metadata("design:type", String)
], VisibilityReport.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], VisibilityReport.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], VisibilityReport.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sales_rep_entity_1.SalesRep),
    (0, typeorm_1.JoinColumn)({ name: 'salesrep_id' }),
    __metadata("design:type", sales_rep_entity_1.SalesRep)
], VisibilityReport.prototype, "salesrep", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => clients_entity_1.Clients),
    (0, typeorm_1.JoinColumn)({ name: 'client_id' }),
    __metadata("design:type", clients_entity_1.Clients)
], VisibilityReport.prototype, "client", void 0);
exports.VisibilityReport = VisibilityReport = __decorate([
    (0, typeorm_1.Entity)('visibility_reports')
], VisibilityReport);
//# sourceMappingURL=visibility-report.entity.js.map