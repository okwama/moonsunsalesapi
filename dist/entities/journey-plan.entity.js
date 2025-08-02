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
exports.JourneyPlan = void 0;
const typeorm_1 = require("typeorm");
const sales_rep_entity_1 = require("./sales-rep.entity");
const clients_entity_1 = require("./clients.entity");
let JourneyPlan = class JourneyPlan {
};
exports.JourneyPlan = JourneyPlan;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], JourneyPlan.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], JourneyPlan.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], JourneyPlan.prototype, "time", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], JourneyPlan.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], JourneyPlan.prototype, "clientId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], JourneyPlan.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], JourneyPlan.prototype, "checkInTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], JourneyPlan.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], JourneyPlan.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], JourneyPlan.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], JourneyPlan.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], JourneyPlan.prototype, "checkoutLatitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], JourneyPlan.prototype, "checkoutLongitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], JourneyPlan.prototype, "checkoutTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], JourneyPlan.prototype, "showUpdateLocation", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], JourneyPlan.prototype, "routeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => clients_entity_1.Clients, clients => clients.journeyPlans, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'clientId' }),
    __metadata("design:type", clients_entity_1.Clients)
], JourneyPlan.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sales_rep_entity_1.SalesRep, salesRep => salesRep.journeyPlans, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", sales_rep_entity_1.SalesRep)
], JourneyPlan.prototype, "user", void 0);
exports.JourneyPlan = JourneyPlan = __decorate([
    (0, typeorm_1.Entity)('JourneyPlanss'),
    (0, typeorm_1.Index)('idx_clientId', ['clientId']),
    (0, typeorm_1.Index)('JourneyPlan_routeId_fkey', ['routeId']),
    (0, typeorm_1.Index)('idx_userId', ['userId'])
], JourneyPlan);
//# sourceMappingURL=journey-plan.entity.js.map