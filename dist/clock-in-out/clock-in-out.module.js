"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClockInOutModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const clock_in_out_controller_1 = require("./clock-in-out.controller");
const clock_in_out_service_1 = require("./clock-in-out.service");
const sales_rep_entity_1 = require("../entities/sales-rep.entity");
const login_history_entity_1 = require("../entities/login-history.entity");
let ClockInOutModule = class ClockInOutModule {
};
exports.ClockInOutModule = ClockInOutModule;
exports.ClockInOutModule = ClockInOutModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([sales_rep_entity_1.SalesRep, login_history_entity_1.LoginHistory])],
        controllers: [clock_in_out_controller_1.ClockInOutController],
        providers: [clock_in_out_service_1.ClockInOutService],
        exports: [clock_in_out_service_1.ClockInOutService],
    })
], ClockInOutModule);
//# sourceMappingURL=clock-in-out.module.js.map