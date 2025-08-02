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
exports.CategoryPriceOption = void 0;
const typeorm_1 = require("typeorm");
const category_entity_1 = require("./category.entity");
let CategoryPriceOption = class CategoryPriceOption {
};
exports.CategoryPriceOption = CategoryPriceOption;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CategoryPriceOption.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'category_id', type: 'int' }),
    __metadata("design:type", Number)
], CategoryPriceOption.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'label', length: 100 }),
    __metadata("design:type", String)
], CategoryPriceOption.prototype, "label", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'value',
        type: 'decimal',
        precision: 15,
        scale: 2,
        transformer: {
            to: (value) => value,
            from: (value) => parseFloat(value) || 0
        }
    }),
    __metadata("design:type", Number)
], CategoryPriceOption.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'value_tzs',
        type: 'decimal',
        precision: 15,
        scale: 2,
        transformer: {
            to: (value) => value,
            from: (value) => parseFloat(value) || 0
        }
    }),
    __metadata("design:type", Number)
], CategoryPriceOption.prototype, "valueTzs", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'value_ngn',
        type: 'decimal',
        precision: 15,
        scale: 2,
        transformer: {
            to: (value) => value,
            from: (value) => parseFloat(value) || 0
        }
    }),
    __metadata("design:type", Number)
], CategoryPriceOption.prototype, "valueNgn", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', precision: 0 }),
    __metadata("design:type", Date)
], CategoryPriceOption.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', precision: 0 }),
    __metadata("design:type", Date)
], CategoryPriceOption.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.Category, category => category.categoryPriceOptions),
    (0, typeorm_1.JoinColumn)({ name: 'category_id' }),
    __metadata("design:type", category_entity_1.Category)
], CategoryPriceOption.prototype, "category", void 0);
exports.CategoryPriceOption = CategoryPriceOption = __decorate([
    (0, typeorm_1.Entity)('CategoryPriceOption')
], CategoryPriceOption);
//# sourceMappingURL=category-price-option.entity.js.map