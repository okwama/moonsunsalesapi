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
exports.Version = void 0;
const typeorm_1 = require("typeorm");
let Version = class Version {
};
exports.Version = Version;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Version.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], Version.prototype, "version", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'build_number' }),
    __metadata("design:type", Number)
], Version.prototype, "buildNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: true, name: 'min_required_version' }),
    __metadata("design:type", String)
], Version.prototype, "minRequiredVersion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false, name: 'force_update' }),
    __metadata("design:type", Boolean)
], Version.prototype, "forceUpdate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'update_message' }),
    __metadata("design:type", String)
], Version.prototype, "updateMessage", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true, name: 'is_active' }),
    __metadata("design:type", Boolean)
], Version.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' }),
    __metadata("design:type", Date)
], Version.prototype, "createdAt", void 0);
exports.Version = Version = __decorate([
    (0, typeorm_1.Entity)('versions')
], Version);
//# sourceMappingURL=version.entity.js.map