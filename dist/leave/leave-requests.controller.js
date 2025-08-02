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
exports.LeaveRequestsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const leave_requests_service_1 = require("./leave-requests.service");
let LeaveRequestsController = class LeaveRequestsController {
    constructor(leaveRequestsService) {
        this.leaveRequestsService = leaveRequestsService;
    }
    async findAll(query, req) {
        if (!query.employee_id && !query.salesrep) {
            query.salesrep = req.user?.sub || req.user?.id;
        }
        if (query.employee_id && typeof query.employee_id === 'string') {
            query.employee_id = parseInt(query.employee_id, 10);
        }
        if (query.salesrep && typeof query.salesrep === 'string') {
            query.salesrep = parseInt(query.salesrep, 10);
        }
        return this.leaveRequestsService.findAll(query);
    }
    async findOne(id) {
        return this.leaveRequestsService.findOne(+id);
    }
    async create(createLeaveRequestDto, req) {
        try {
            if (!createLeaveRequestDto.employee_id && !createLeaveRequestDto.salesrep) {
                createLeaveRequestDto.salesrep = req.user?.sub || req.user?.id;
            }
            if (!createLeaveRequestDto.employee_id && !createLeaveRequestDto.salesrep) {
                throw new Error('Either Employee ID or SalesRep ID is required');
            }
            return this.leaveRequestsService.create(createLeaveRequestDto);
        }
        catch (error) {
            console.error('Error in leave request creation controller:', error);
            throw error;
        }
    }
    async update(id, updateLeaveRequestDto) {
        return this.leaveRequestsService.update(+id, updateLeaveRequestDto);
    }
    async remove(id) {
        return this.leaveRequestsService.remove(+id);
    }
};
exports.LeaveRequestsController = LeaveRequestsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LeaveRequestsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LeaveRequestsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LeaveRequestsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LeaveRequestsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LeaveRequestsController.prototype, "remove", null);
exports.LeaveRequestsController = LeaveRequestsController = __decorate([
    (0, common_1.Controller)('leave-requests'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [leave_requests_service_1.LeaveRequestsService])
], LeaveRequestsController);
//# sourceMappingURL=leave-requests.controller.js.map