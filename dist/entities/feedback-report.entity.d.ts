import { SalesRep } from './sales-rep.entity';
import { Clients } from './clients.entity';
export declare class FeedbackReport {
    id: number;
    journeyPlanId: number;
    salesrepId: number;
    clientId: number;
    comment: string;
    reportType: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    salesrep: SalesRep;
    client: Clients;
}
