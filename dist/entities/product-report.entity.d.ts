import { SalesRep } from './sales-rep.entity';
import { Clients } from './clients.entity';
export declare class ProductReport {
    id: number;
    journeyPlanId: number;
    salesrepId: number;
    clientId: number;
    productId: number;
    productName: string;
    availabilityStatus: string;
    quantityAvailable: number;
    reportType: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    salesrep: SalesRep;
    client: Clients;
}
