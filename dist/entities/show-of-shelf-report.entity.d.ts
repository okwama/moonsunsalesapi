import { SalesRep } from './sales-rep.entity';
import { Clients } from './clients.entity';
import { JourneyPlan } from '../journey-plans/entities/journey-plan.entity';
export declare class ShowOfShelfReport {
    id: number;
    journeyPlanId: number;
    clientId: number;
    userId: number;
    productName: string;
    productId: number;
    totalItemsOnShelf: number;
    companyItemsOnShelf: number;
    comments: string;
    createdAt: Date;
    updatedAt: Date;
    journeyPlan: JourneyPlan;
    user: SalesRep;
    client: Clients;
}
