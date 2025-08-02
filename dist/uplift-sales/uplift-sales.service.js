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
exports.UpliftSalesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const uplift_sale_entity_1 = require("../entities/uplift-sale.entity");
let UpliftSalesService = class UpliftSalesService {
    constructor(upliftSaleRepository) {
        this.upliftSaleRepository = upliftSaleRepository;
    }
    async findAll(query) {
        try {
            const queryBuilder = this.upliftSaleRepository.createQueryBuilder('upliftSale')
                .leftJoinAndSelect('upliftSale.client', 'client')
                .leftJoinAndSelect('upliftSale.user', 'user')
                .leftJoinAndSelect('upliftSale.upliftSaleItems', 'items');
            if (query.userId) {
                queryBuilder.where('upliftSale.userId = :userId', { userId: query.userId });
            }
            if (query.status) {
                queryBuilder.andWhere('upliftSale.status = :status', { status: query.status });
            }
            if (query.startDate) {
                queryBuilder.andWhere('upliftSale.createdAt >= :startDate', { startDate: query.startDate });
            }
            if (query.endDate) {
                queryBuilder.andWhere('upliftSale.createdAt <= :endDate', { endDate: query.endDate });
            }
            return queryBuilder.orderBy('upliftSale.createdAt', 'DESC').getMany();
        }
        catch (error) {
            console.error('Error fetching uplift sales:', error);
            throw new Error('Failed to fetch uplift sales');
        }
    }
    async findOne(id) {
        try {
            return this.upliftSaleRepository.findOne({
                where: { id },
                relations: ['client', 'user', 'upliftSaleItems']
            });
        }
        catch (error) {
            console.error('Error fetching uplift sale by ID:', error);
            throw new Error('Failed to fetch uplift sale');
        }
    }
    async create(createUpliftSaleDto) {
        try {
            const upliftSale = this.upliftSaleRepository.create(createUpliftSaleDto);
            const result = await this.upliftSaleRepository.save(upliftSale);
            return Array.isArray(result) ? result[0] : result;
        }
        catch (error) {
            console.error('Error creating uplift sale:', error);
            throw new Error('Failed to create uplift sale');
        }
    }
    async update(id, updateUpliftSaleDto) {
        try {
            await this.upliftSaleRepository.update(id, updateUpliftSaleDto);
            return this.findOne(id);
        }
        catch (error) {
            console.error('Error updating uplift sale:', error);
            throw new Error('Failed to update uplift sale');
        }
    }
    async remove(id) {
        try {
            await this.upliftSaleRepository.delete(id);
            return { message: 'Uplift sale deleted successfully' };
        }
        catch (error) {
            console.error('Error deleting uplift sale:', error);
            throw new Error('Failed to delete uplift sale');
        }
    }
};
exports.UpliftSalesService = UpliftSalesService;
exports.UpliftSalesService = UpliftSalesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(uplift_sale_entity_1.UpliftSale)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UpliftSalesService);
//# sourceMappingURL=uplift-sales.service.js.map