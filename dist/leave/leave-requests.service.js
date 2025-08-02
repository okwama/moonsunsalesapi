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
exports.LeaveRequestsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const leave_request_entity_1 = require("../entities/leave-request.entity");
const typeorm_2 = require("typeorm");
let LeaveRequestsService = class LeaveRequestsService {
    constructor(leaveRequestRepository) {
        this.leaveRequestRepository = leaveRequestRepository;
    }
    async findAll(query) {
        const queryBuilder = this.leaveRequestRepository.createQueryBuilder('leave_request');
        if (query.employee_id) {
            queryBuilder.where('leave_request.employee_id = :employee_id', { employee_id: query.employee_id });
        }
        if (query.salesrep) {
            queryBuilder.where('leave_request.salesrep = :salesrep', { salesrep: query.salesrep });
        }
        if (query.status) {
            queryBuilder.andWhere('leave_request.status = :status', { status: query.status });
        }
        return queryBuilder.orderBy('leave_request.created_at', 'DESC').getMany();
    }
    async findOne(id) {
        return this.leaveRequestRepository.findOne({ where: { id } });
    }
    async create(createLeaveRequestDto) {
        try {
            if (createLeaveRequestDto.start_date && typeof createLeaveRequestDto.start_date === 'string') {
                createLeaveRequestDto.start_date = new Date(createLeaveRequestDto.start_date);
            }
            if (createLeaveRequestDto.end_date && typeof createLeaveRequestDto.end_date === 'string') {
                createLeaveRequestDto.end_date = new Date(createLeaveRequestDto.end_date);
            }
            if (!createLeaveRequestDto.employee_id && !createLeaveRequestDto.salesrep) {
                throw new Error('Missing required field: either employee_id or salesrep must be provided');
            }
            if (!createLeaveRequestDto.leave_type_id ||
                !createLeaveRequestDto.start_date || !createLeaveRequestDto.end_date || !createLeaveRequestDto.reason) {
                throw new Error('Missing required fields: leave_type_id, start_date, end_date, reason');
            }
            const leaveRequest = this.leaveRequestRepository.create(createLeaveRequestDto);
            const result = await this.leaveRequestRepository.save(leaveRequest);
            return Array.isArray(result) ? result[0] : result;
        }
        catch (error) {
            console.error('Error creating leave request:', error);
            throw error;
        }
    }
    async update(id, updateLeaveRequestDto) {
        await this.leaveRequestRepository.update(id, updateLeaveRequestDto);
        return this.findOne(id);
    }
    async remove(id) {
        await this.leaveRequestRepository.delete(id);
    }
};
exports.LeaveRequestsService = LeaveRequestsService;
exports.LeaveRequestsService = LeaveRequestsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(leave_request_entity_1.LeaveRequest)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LeaveRequestsService);
//# sourceMappingURL=leave-requests.service.js.map