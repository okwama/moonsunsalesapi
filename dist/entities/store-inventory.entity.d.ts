import { Product } from '../products/entities/product.entity';
import { Store } from './store.entity';
export declare class StoreInventory {
    id: number;
    storeId: number;
    productId: number;
    quantity: number;
    updatedAt: Date;
    store: Store;
    product: Product;
}
