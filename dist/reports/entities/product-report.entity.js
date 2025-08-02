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
exports.ProductReport = void 0;
const typeorm_1 = require("typeorm");
let ProductReport = class ProductReport {
};
exports.ProductReport = ProductReport;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ProductReport.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'reportId', type: 'int' }),
    __metadata("design:type", Number)
], ProductReport.prototype, "reportId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'productName', type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], ProductReport.prototype, "productName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'quantity', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], ProductReport.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'comment', type: 'text', nullable: true }),
    __metadata("design:type", String)
], ProductReport.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'createdAt', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], ProductReport.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'clientId', type: 'int' }),
    __metadata("design:type", Number)
], ProductReport.prototype, "clientId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'userId', type: 'int' }),
    __metadata("design:type", Number)
], ProductReport.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'productId', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], ProductReport.prototype, "productId", void 0);
exports.ProductReport = ProductReport = __decorate([
    (0, typeorm_1.Entity)('ProductReport'),
    (0, typeorm_1.Index)('idx_userId', ['userId']),
    (0, typeorm_1.Index)('idx_clientId', ['clientId']),
    (0, typeorm_1.Index)('idx_reportId', ['reportId'])
], ProductReport);
//# sourceMappingURL=product-report.entity.js.map