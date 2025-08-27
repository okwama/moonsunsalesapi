import { SalesRep } from './sales-rep.entity';
import { Clients } from './clients.entity';
import { JourneyPlan } from '../journey-plans/entities/journey-plan.entity';
export declare class ProductExpiryReport {
    id: number;
    journeyPlanId: number;
    clientId: number;
    userId: number;
    productName: string;
    productId: number;
    quantity: number;
    expiryDate: Date;
    batchNumber: string;
    comments: string;
    createdAt: Date;
    updatedAt: Date;
    journeyPlan: JourneyPlan;
    user: SalesRep;
    client: Clients;
}
