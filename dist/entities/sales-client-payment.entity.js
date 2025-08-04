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
exports.SalesClientPayment = void 0;
const typeorm_1 = require("typeorm");
let SalesClientPayment = class SalesClientPayment {
};
exports.SalesClientPayment = SalesClientPayment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SalesClientPayment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'clientId' }),
    __metadata("design:type", Number)
], SalesClientPayment.prototype, "clientId", void 0);
__decorate([
    (0, typeorm_1.Column)('double'),
    __metadata("design:type", Number)
], SalesClientPayment.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'invoicefileUrl', nullable: true }),
    __metadata("design:type", String)
], SalesClientPayment.prototype, "invoicefileUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'date', type: 'datetime', default: () => 'CURRENT_TIMESTAMP(3)' }),
    __metadata("design:type", Date)
], SalesClientPayment.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], SalesClientPayment.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'payment_method', nullable: true }),
    __metadata("design:type", String)
], SalesClientPayment.prototype, "payment_method", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'salesrepId' }),
    __metadata("design:type", Number)
], SalesClientPayment.prototype, "salesrepId", void 0);
exports.SalesClientPayment = SalesClientPayment = __decorate([
    (0, typeorm_1.Entity)('salesclient_payment')
], SalesClientPayment);
//# sourceMappingURL=sales-client-payment.entity.js.map