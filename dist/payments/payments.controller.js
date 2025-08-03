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
exports.PaymentsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const payments_service_1 = require("./payments.service");
let PaymentsController = class PaymentsController {
    constructor(paymentsService) {
        this.paymentsService = paymentsService;
    }
    async getClientPayments(clientId, req) {
        const payments = await this.paymentsService.findByClientId(clientId);
        return payments.map(payment => ({
            id: payment.id,
            clientId: payment.clientId,
            userId: payment.salesrepId,
            amount: payment.amount,
            imageUrl: payment.invoicefileUrl,
            method: payment.payment_method,
            status: payment.status,
            date: payment.date,
        }));
    }
    async uploadClientPayment(clientId, createPaymentDto, file, req) {
        const userId = req.user.id;
        const paymentData = {
            clientId,
            amount: parseFloat(createPaymentDto.amount),
            payment_method: createPaymentDto.method,
            salesrepId: userId,
            status: 'PENDING',
        };
        const payment = await this.paymentsService.create(paymentData, file);
        return {
            id: payment.id,
            clientId: payment.clientId,
            userId: payment.salesrepId,
            amount: payment.amount,
            imageUrl: payment.invoicefileUrl,
            method: payment.payment_method,
            status: payment.status,
            date: payment.date,
        };
    }
    async getSalesRepPayments(salesrepId) {
        const payments = await this.paymentsService.findBySalesRepId(salesrepId);
        return payments.map(payment => ({
            id: payment.id,
            clientId: payment.clientId,
            userId: payment.salesrepId,
            amount: payment.amount,
            imageUrl: payment.invoicefileUrl,
            method: payment.payment_method,
            status: payment.status,
            date: payment.date,
        }));
    }
};
exports.PaymentsController = PaymentsController;
__decorate([
    (0, common_1.Get)(':clientId/payments'),
    __param(0, (0, common_1.Param)('clientId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "getClientPayments", null);
__decorate([
    (0, common_1.Post)(':clientId/payments'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Param)('clientId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "uploadClientPayment", null);
__decorate([
    (0, common_1.Get)('payments/salesrep/:salesrepId'),
    __param(0, (0, common_1.Param)('salesrepId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "getSalesRepPayments", null);
exports.PaymentsController = PaymentsController = __decorate([
    (0, common_1.Controller)('outlets'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [payments_service_1.PaymentsService])
], PaymentsController);
//# sourceMappingURL=payments.controller.js.map