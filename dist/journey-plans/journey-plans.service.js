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
exports.JourneyPlansService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const journey_plan_entity_1 = require("../entities/journey-plan.entity");
let JourneyPlansService = class JourneyPlansService {
    constructor(journeyPlanRepository) {
        this.journeyPlanRepository = journeyPlanRepository;
    }
    async create(createJourneyPlanDto, userId) {
        const journeyPlan = this.journeyPlanRepository.create({
            ...createJourneyPlanDto,
            userId: userId,
            status: 0,
            date: new Date(createJourneyPlanDto.date),
        });
        const saved = await this.journeyPlanRepository.save(journeyPlan);
        return this.findOne(saved.id);
    }
    async findAll(options) {
        const { page, limit, status, date, userId } = options;
        const offset = (page - 1) * limit;
        let query = this.journeyPlanRepository
            .createQueryBuilder('journeyPlan')
            .leftJoinAndSelect('journeyPlan.client', 'client')
            .leftJoinAndSelect('journeyPlan.user', 'user');
        if (userId) {
            query = query.where('journeyPlan.userId = :userId', { userId });
        }
        if (status) {
            const statusMap = {
                'pending': 0,
                'checked_in': 1,
                'in_progress': 2,
                'completed': 3,
                'cancelled': 4,
            };
            const statusValue = statusMap[status] ?? 0;
            query = query.andWhere('journeyPlan.status = :status', { status: statusValue });
        }
        const targetDate = date || new Date().toISOString().split('T')[0];
        const startOfDay = new Date(targetDate);
        const endOfDay = new Date(targetDate);
        endOfDay.setDate(endOfDay.getDate() + 1);
        query = query.andWhere('journeyPlan.date >= :startDate AND journeyPlan.date < :endDate', {
            startDate: startOfDay,
            endDate: endOfDay,
        });
        const total = await query.getCount();
        const data = await query
            .orderBy('journeyPlan.date', 'DESC')
            .addOrderBy('journeyPlan.time', 'DESC')
            .skip(offset)
            .take(limit)
            .getMany();
        const totalPages = Math.ceil(total / limit);
        return {
            data,
            pagination: {
                total,
                page,
                limit,
                totalPages,
            },
            success: true,
        };
    }
    async findByDateRange(options) {
        const { page, limit, status, startDate, endDate, userId } = options;
        const offset = (page - 1) * limit;
        let query = this.journeyPlanRepository
            .createQueryBuilder('journeyPlan')
            .leftJoinAndSelect('journeyPlan.client', 'client')
            .leftJoinAndSelect('journeyPlan.user', 'user');
        if (userId) {
            query = query.where('journeyPlan.userId = :userId', { userId });
        }
        if (status) {
            const statusMap = {
                'pending': 0,
                'checked_in': 1,
                'in_progress': 2,
                'completed': 3,
                'cancelled': 4,
            };
            const statusValue = statusMap[status] ?? 0;
            query = query.andWhere('journeyPlan.status = :status', { status: statusValue });
        }
        const startOfRange = new Date(startDate);
        const endOfRange = new Date(endDate);
        endOfRange.setDate(endOfRange.getDate() + 1);
        query = query.andWhere('journeyPlan.date >= :startDate AND journeyPlan.date < :endDate', {
            startDate: startOfRange,
            endDate: endOfRange,
        });
        const total = await query.getCount();
        const data = await query
            .orderBy('journeyPlan.date', 'DESC')
            .addOrderBy('journeyPlan.time', 'DESC')
            .skip(offset)
            .take(limit)
            .getMany();
        const totalPages = Math.ceil(total / limit);
        return {
            data,
            pagination: {
                total,
                page,
                limit,
                totalPages,
            },
            success: true,
        };
    }
    async findOne(id) {
        return this.journeyPlanRepository.findOne({
            where: { id },
            relations: ['client', 'user'],
        });
    }
    async update(id, updateJourneyPlanDto) {
        const journeyPlan = await this.findOne(id);
        if (!journeyPlan) {
            throw new common_1.NotFoundException(`Journey plan with ID ${id} not found`);
        }
        let statusValue;
        if (updateJourneyPlanDto.status) {
            const statusMap = {
                'pending': 0,
                'checked_in': 1,
                'in_progress': 2,
                'completed': 3,
                'cancelled': 4,
            };
            statusValue = statusMap[updateJourneyPlanDto.status] ?? 0;
        }
        const updateData = { ...updateJourneyPlanDto };
        if (statusValue !== undefined) {
            updateData.status = statusValue;
        }
        if (updateData.checkInTime) {
            updateData.checkInTime = new Date(updateData.checkInTime);
        }
        if (updateData.checkoutTime) {
            updateData.checkoutTime = new Date(updateData.checkoutTime);
        }
        await this.journeyPlanRepository.update(id, updateData);
        return this.findOne(id);
    }
    async remove(id) {
        const journeyPlan = await this.findOne(id);
        if (!journeyPlan) {
            throw new common_1.NotFoundException(`Journey plan with ID ${id} not found`);
        }
        await this.journeyPlanRepository.delete(id);
    }
    async checkout(id, checkoutDto) {
        const journeyPlan = await this.findOne(id);
        if (!journeyPlan) {
            throw new common_1.NotFoundException(`Journey plan with ID ${id} not found`);
        }
        const updateData = {
            status: 3,
            checkoutTime: checkoutDto.checkoutTime ? new Date(checkoutDto.checkoutTime) : new Date(),
        };
        if (checkoutDto.checkoutLatitude !== undefined) {
            updateData.checkoutLatitude = checkoutDto.checkoutLatitude;
        }
        if (checkoutDto.checkoutLongitude !== undefined) {
            updateData.checkoutLongitude = checkoutDto.checkoutLongitude;
        }
        await this.journeyPlanRepository.update(id, updateData);
        return this.findOne(id);
    }
};
exports.JourneyPlansService = JourneyPlansService;
exports.JourneyPlansService = JourneyPlansService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(journey_plan_entity_1.JourneyPlan)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], JourneyPlansService);
//# sourceMappingURL=journey-plans.service.js.map