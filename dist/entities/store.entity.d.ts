import { StoreInventory } from './store-inventory.entity';
export declare class Store {
    id: number;
    storeCode: string;
    storeName: string;
    address: string;
    countryId: number;
    isActive: boolean;
    createdAt: Date;
    storeInventory: StoreInventory[];
}
