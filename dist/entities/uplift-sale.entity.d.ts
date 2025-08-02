import { SalesRep } from './sales-rep.entity';
import { Clients } from './clients.entity';
import { UpliftSaleItem } from './uplift-sale-item.entity';
export declare class UpliftSale {
    id: number;
    clientId: number;
    userId: number;
    status: string;
    totalAmount: number;
    createdAt: Date;
    updatedAt: Date;
    client: Clients;
    user: SalesRep;
    upliftSaleItems: UpliftSaleItem[];
}
