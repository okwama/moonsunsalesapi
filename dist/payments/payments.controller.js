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
var PaymentsController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const payments_service_1 = require("./payments.service");
let PaymentsController = PaymentsController_1 = class PaymentsController {
    constructor(paymentsService) {
        this.paymentsService = paymentsService;
        this.logger = new common_1.Logger(PaymentsController_1.name);
    }
    async getClientPayments(clientId, req) {
        this.logger.log(`🔍 GET /outlets/${clientId}/payments - Fetching payments for client ${clientId}`);
        this.logger.log(`👤 User ID: ${req.user.id}`);
        try {
            const payments = await this.paymentsService.findByClientId(clientId);
            this.logger.log(`✅ Found ${payments.length} payments for client ${clientId}`);
            const transformedPayments = payments.map(payment => ({
                id: payment.id,
                clientId: payment.clientId,
                userId: payment.salesrepId,
                amount: payment.amount,
                imageUrl: payment.invoicefileUrl,
                method: payment.payment_method,
                status: payment.status,
                date: payment.date,
            }));
            this.logger.log(`📊 Returning ${transformedPayments.length} transformed payments`);
            return transformedPayments;
        }
        catch (error) {
            this.logger.error(`❌ Error fetching payments for client ${clientId}:`, error);
            throw error;
        }
    }
    async uploadClientPayment(clientId, createPaymentDto, file, req) {
        this.logger.log(`📤 POST /outlets/${clientId}/payments - Uploading payment for client ${clientId}`);
        this.logger.log(`👤 User ID: ${req.user.id}`);
        this.logger.log(`📊 Request body: ${JSON.stringify(createPaymentDto)}`);
        this.logger.log(`📁 File uploaded: ${file ? 'Yes' : 'No'}`);
        if (file) {
            this.logger.log(`📁 File details: ${file.originalname}, ${file.size} bytes`);
        }
        try {
            const userId = req.user.id;
            const paymentData = {
                clientId,
                amount: parseFloat(createPaymentDto.amount),
                payment_method: createPaymentDto.method,
                salesrepId: userId,
                status: 'PENDING',
            };
            this.logger.log(`💾 Creating payment with data: ${JSON.stringify(paymentData)}`);
            const payment = await this.paymentsService.create(paymentData, file);
            this.logger.log(`✅ Payment created successfully with ID: ${payment.id}`);
            const transformedPayment = {
                id: payment.id,
                clientId: payment.clientId,
                userId: payment.salesrepId,
                amount: payment.amount,
                imageUrl: payment.invoicefileUrl,
                method: payment.payment_method,
                status: payment.status,
                date: payment.date,
            };
            this.logger.log(`📊 Returning transformed payment: ${JSON.stringify(transformedPayment)}`);
            return transformedPayment;
        }
        catch (error) {
            this.logger.error(`❌ Error uploading payment for client ${clientId}:`, error);
            throw error;
        }
    }
    async getSalesRepPayments(salesrepId) {
        this.logger.log(`🔍 GET /outlets/payments/salesrep/${salesrepId} - Fetching payments for sales rep ${salesrepId}`);
        try {
            const payments = await this.paymentsService.findBySalesRepId(salesrepId);
            this.logger.log(`✅ Found ${payments.length} payments for sales rep ${salesrepId}`);
            const transformedPayments = payments.map(payment => ({
                id: payment.id,
                clientId: payment.clientId,
                userId: payment.salesrepId,
                amount: payment.amount,
                imageUrl: payment.invoicefileUrl,
                method: payment.payment_method,
                status: payment.status,
                date: payment.date,
            }));
            this.logger.log(`📊 Returning ${transformedPayments.length} transformed payments`);
            return transformedPayments;
        }
        catch (error) {
            this.logger.error(`❌ Error fetching payments for sales rep ${salesrepId}:`, error);
            throw error;
        }
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
exports.PaymentsController = PaymentsController = PaymentsController_1 = __decorate([
    (0, common_1.Controller)('outlets'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [payments_service_1.PaymentsService])
], PaymentsController);
//# sourceMappingURL=payments.controller.js.map