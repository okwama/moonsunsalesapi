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
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const sales_client_payment_entity_1 = require("../entities/sales-client-payment.entity");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
let PaymentsService = class PaymentsService {
    constructor(paymentsRepository, cloudinaryService) {
        this.paymentsRepository = paymentsRepository;
        this.cloudinaryService = cloudinaryService;
    }
    async create(createPaymentDto, file) {
        const payment = this.paymentsRepository.create({
            ...createPaymentDto,
            date: new Date(),
            status: createPaymentDto.status || 'PENDING',
        });
        if (file) {
            const uploadResult = await this.cloudinaryService.uploadFile(file);
            payment.invoicefileUrl = uploadResult.secure_url;
        }
        return this.paymentsRepository.save(payment);
    }
    async findByClientId(clientId) {
        return this.paymentsRepository.find({
            where: { clientId },
            order: { date: 'DESC' },
        });
    }
    async findOne(id) {
        const payment = await this.paymentsRepository.findOne({ where: { id } });
        if (!payment) {
            throw new common_1.NotFoundException(`Payment with ID ${id} not found`);
        }
        return payment;
    }
    async update(id, updatePaymentDto) {
        const payment = await this.findOne(id);
        Object.assign(payment, updatePaymentDto);
        return this.paymentsRepository.save(payment);
    }
    async remove(id) {
        const payment = await this.findOne(id);
        await this.paymentsRepository.remove(payment);
    }
    async findBySalesRepId(salesrepId) {
        return this.paymentsRepository.find({
            where: { salesrepId },
            order: { date: 'DESC' },
        });
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sales_client_payment_entity_1.SalesClientPayment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        cloudinary_service_1.CloudinaryService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map