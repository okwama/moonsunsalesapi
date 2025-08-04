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
exports.RoutesController = void 0;
const common_1 = require("@nestjs/common");
const routes_service_1 = require("./routes.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let RoutesController = class RoutesController {
    constructor(routesService) {
        this.routesService = routesService;
    }
    async findAll(req) {
        const userCountryId = req.user.countryId;
        return this.routesService.findAll(userCountryId);
    }
    async findActive(req) {
        const userCountryId = req.user.countryId;
        return this.routesService.findActive(userCountryId);
    }
    async findOne(id, req) {
        const userCountryId = req.user.countryId;
        const route = await this.routesService.findOne(parseInt(id), userCountryId);
        if (!route) {
            throw new Error('Route not found');
        }
        return route;
    }
    async findByRegion(regionId, req) {
        const userCountryId = req.user.countryId;
        return this.routesService.findByRegion(parseInt(regionId), userCountryId);
    }
    async findByCountry(countryId, req) {
        const userCountryId = req.user.countryId;
        return this.routesService.findByCountry(parseInt(countryId), userCountryId);
    }
    async findByLeader(leaderId, req) {
        const userCountryId = req.user.countryId;
        return this.routesService.findByLeader(parseInt(leaderId), userCountryId);
    }
};
exports.RoutesController = RoutesController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoutesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('active'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoutesController.prototype, "findActive", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RoutesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('region/:regionId'),
    __param(0, (0, common_1.Param)('regionId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RoutesController.prototype, "findByRegion", null);
__decorate([
    (0, common_1.Get)('country/:countryId'),
    __param(0, (0, common_1.Param)('countryId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RoutesController.prototype, "findByCountry", null);
__decorate([
    (0, common_1.Get)('leader/:leaderId'),
    __param(0, (0, common_1.Param)('leaderId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RoutesController.prototype, "findByLeader", null);
exports.RoutesController = RoutesController = __decorate([
    (0, common_1.Controller)('routes'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [routes_service_1.RoutesService])
], RoutesController);
//# sourceMappingURL=routes.controller.js.map