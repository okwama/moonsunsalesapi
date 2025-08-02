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
exports.TargetsController = void 0;
const common_1 = require("@nestjs/common");
const targets_service_1 = require("./targets.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let TargetsController = class TargetsController {
    constructor(targetsService) {
        this.targetsService = targetsService;
    }
    async getMonthlyVisits(userId) {
        return this.targetsService.getMonthlyVisits(+userId);
    }
    async getDashboard(userId, period = 'current_month') {
        return this.targetsService.getDashboard(+userId, period);
    }
    async getVisitStatistics(userId, period = 'current_month') {
        return this.targetsService.getVisitStatistics(+userId, period);
    }
    async checkJourneyData(userId) {
        return this.targetsService.checkJourneyData(+userId);
    }
};
exports.TargetsController = TargetsController;
__decorate([
    (0, common_1.Get)('monthly-visits/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TargetsController.prototype, "getMonthlyVisits", null);
__decorate([
    (0, common_1.Get)('dashboard/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Query)('period')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TargetsController.prototype, "getDashboard", null);
__decorate([
    (0, common_1.Get)('visit-statistics/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Query)('period')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TargetsController.prototype, "getVisitStatistics", null);
__decorate([
    (0, common_1.Get)('check-journey-data/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TargetsController.prototype, "checkJourneyData", null);
exports.TargetsController = TargetsController = __decorate([
    (0, common_1.Controller)('targets'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [targets_service_1.TargetsService])
], TargetsController);
//# sourceMappingURL=targets.controller.js.map