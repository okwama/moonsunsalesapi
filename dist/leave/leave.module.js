"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const leave_controller_1 = require("./leave.controller");
const leave_service_1 = require("./leave.service");
const leave_requests_controller_1 = require("./leave-requests.controller");
const leave_requests_service_1 = require("./leave-requests.service");
const leave_entity_1 = require("../entities/leave.entity");
const leave_type_entity_1 = require("../entities/leave-type.entity");
const leave_request_entity_1 = require("../entities/leave-request.entity");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
let LeaveModule = class LeaveModule {
};
exports.LeaveModule = LeaveModule;
exports.LeaveModule = LeaveModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([leave_entity_1.Leave, leave_type_entity_1.LeaveType, leave_request_entity_1.LeaveRequest])],
        controllers: [leave_controller_1.LeaveController, leave_requests_controller_1.LeaveRequestsController],
        providers: [leave_service_1.LeaveService, leave_requests_service_1.LeaveRequestsService, cloudinary_service_1.CloudinaryService],
        exports: [leave_service_1.LeaveService, leave_requests_service_1.LeaveRequestsService],
    })
], LeaveModule);
//# sourceMappingURL=leave.module.js.map