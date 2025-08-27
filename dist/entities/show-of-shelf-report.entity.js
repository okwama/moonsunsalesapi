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
exports.ShowOfShelfReport = void 0;
const typeorm_1 = require("typeorm");
const sales_rep_entity_1 = require("./sales-rep.entity");
const clients_entity_1 = require("./clients.entity");
const journey_plan_entity_1 = require("../journey-plans/entities/journey-plan.entity");
let ShowOfShelfReport = class ShowOfShelfReport {
};
exports.ShowOfShelfReport = ShowOfShelfReport;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ShowOfShelfReport.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'journeyPlanId' }),
    __metadata("design:type", Number)
], ShowOfShelfReport.prototype, "journeyPlanId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'clientId' }),
    __metadata("design:type", Number)
], ShowOfShelfReport.prototype, "clientId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'userId' }),
    __metadata("design:type", Number)
], ShowOfShelfReport.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'productName' }),
    __metadata("design:type", String)
], ShowOfShelfReport.prototype, "productName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'productId', nullable: true }),
    __metadata("design:type", Number)
], ShowOfShelfReport.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'totalItemsOnShelf' }),
    __metadata("design:type", Number)
], ShowOfShelfReport.prototype, "totalItemsOnShelf", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'companyItemsOnShelf' }),
    __metadata("design:type", Number)
], ShowOfShelfReport.prototype, "companyItemsOnShelf", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'comments', type: 'text', nullable: true }),
    __metadata("design:type", String)
], ShowOfShelfReport.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'createdAt' }),
    __metadata("design:type", Date)
], ShowOfShelfReport.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updatedAt' }),
    __metadata("design:type", Date)
], ShowOfShelfReport.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => journey_plan_entity_1.JourneyPlan),
    (0, typeorm_1.JoinColumn)({ name: 'journeyPlanId' }),
    __metadata("design:type", journey_plan_entity_1.JourneyPlan)
], ShowOfShelfReport.prototype, "journeyPlan", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sales_rep_entity_1.SalesRep),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", sales_rep_entity_1.SalesRep)
], ShowOfShelfReport.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => clients_entity_1.Clients),
    (0, typeorm_1.JoinColumn)({ name: 'clientId' }),
    __metadata("design:type", clients_entity_1.Clients)
], ShowOfShelfReport.prototype, "client", void 0);
exports.ShowOfShelfReport = ShowOfShelfReport = __decorate([
    (0, typeorm_1.Entity)('ShowOfShelfReport')
], ShowOfShelfReport);
//# sourceMappingURL=show-of-shelf-report.entity.js.map