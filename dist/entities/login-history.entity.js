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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginHistory = void 0;
const typeorm_1 = require("typeorm");
const sales_rep_entity_1 = require("./sales-rep.entity");
let LoginHistory = class LoginHistory {
};
exports.LoginHistory = LoginHistory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], LoginHistory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], LoginHistory.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: 'UTC' }),
    __metadata("design:type", String)
], LoginHistory.prototype, "timezone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], LoginHistory.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: 0 }),
    __metadata("design:type", Number)
], LoginHistory.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], LoginHistory.prototype, "sessionEnd", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], LoginHistory.prototype, "sessionStart", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sales_rep_entity_1.SalesRep, salesRep => salesRep.LoginHistory),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", sales_rep_entity_1.SalesRep)
], LoginHistory.prototype, "SalesRep", void 0);
exports.LoginHistory = LoginHistory = __decorate([
    (0, typeorm_1.Entity)('LoginHistory'),
    (0, typeorm_1.Index)('idx_userId', ['userId']),
    (0, typeorm_1.Index)('idx_userId_status', ['userId', 'status']),
    (0, typeorm_1.Index)('idx_sessionStart', ['sessionStart']),
    (0, typeorm_1.Index)('idx_sessionEnd', ['sessionEnd']),
    (0, typeorm_1.Index)('idx_userId_sessionStart', ['userId', 'sessionStart']),
    (0, typeorm_1.Index)('idx_status_sessionStart', ['status', 'sessionStart'])
], LoginHistory);
//# sourceMappingURL=login-history.entity.js.map