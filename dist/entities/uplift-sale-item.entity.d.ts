import { UpliftSale } from './uplift-sale.entity';
import { Product } from '../products/entities/product.entity';
export declare class UpliftSaleItem {
    id: number;
    upliftSaleId: number;
    productId: number;
    quantity: number;
    unitPrice: number;
    total: number;
    createdAt: Date;
    product: Product;
    upliftSale: UpliftSale;
}
