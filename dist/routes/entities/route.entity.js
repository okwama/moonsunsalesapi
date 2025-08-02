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
exports.Route = void 0;
const typeorm_1 = require("typeorm");
let Route = class Route {
};
exports.Route = Route;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Route.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'name', type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Route.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'region', type: 'int' }),
    __metadata("design:type", Number)
], Route.prototype, "region", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'region_name', type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Route.prototype, "regionName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'country_id', type: 'int' }),
    __metadata("design:type", Number)
], Route.prototype, "countryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'country_name', type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Route.prototype, "countryName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'leader_id', type: 'int' }),
    __metadata("design:type", Number)
], Route.prototype, "leaderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'leader_name', type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Route.prototype, "leaderName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'status', type: 'int' }),
    __metadata("design:type", Number)
], Route.prototype, "status", void 0);
exports.Route = Route = __decorate([
    (0, typeorm_1.Entity)('routes')
], Route);
//# sourceMappingURL=route.entity.js.map