import { Order } from './order.entity';
import { Product } from '../../products/entities/product.entity';
export declare class OrderItem {
    id: number;
    salesOrderId: number;
    order: Order;
    productId: number;
    product: Product;
    quantity: number;
    unitPrice: number;
    taxAmount: number;
    totalPrice: number;
    taxType: string;
    netPrice: number;
    shippedQuantity: number;
}
