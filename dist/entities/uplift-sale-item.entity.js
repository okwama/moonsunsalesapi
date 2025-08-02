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
exports.UpliftSaleItem = void 0;
const typeorm_1 = require("typeorm");
const uplift_sale_entity_1 = require("./uplift-sale.entity");
const product_entity_1 = require("../products/entities/product.entity");
let UpliftSaleItem = class UpliftSaleItem {
};
exports.UpliftSaleItem = UpliftSaleItem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UpliftSaleItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], UpliftSaleItem.prototype, "upliftSaleId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], UpliftSaleItem.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], UpliftSaleItem.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], UpliftSaleItem.prototype, "unitPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], UpliftSaleItem.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], UpliftSaleItem.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, product => product.upliftSaleItems, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'productId' }),
    __metadata("design:type", product_entity_1.Product)
], UpliftSaleItem.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => uplift_sale_entity_1.UpliftSale, upliftSale => upliftSale.upliftSaleItems, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'upliftSaleId' }),
    __metadata("design:type", uplift_sale_entity_1.UpliftSale)
], UpliftSaleItem.prototype, "upliftSale", void 0);
exports.UpliftSaleItem = UpliftSaleItem = __decorate([
    (0, typeorm_1.Entity)('UpliftSaleItem'),
    (0, typeorm_1.Index)('UpliftSaleItem_productId_fkey', ['productId']),
    (0, typeorm_1.Index)('UpliftSaleItem_upliftSaleId_fkey', ['upliftSaleId'])
], UpliftSaleItem);
//# sourceMappingURL=uplift-sale-item.entity.js.map