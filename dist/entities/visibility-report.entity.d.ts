import { SalesRep } from './sales-rep.entity';
import { Clients } from './clients.entity';
export declare class VisibilityReport {
    id: number;
    journeyPlanId: number;
    salesrepId: number;
    clientId: number;
    visibilityActivity: string;
    activityDetails: string;
    reportType: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    salesrep: SalesRep;
    client: Clients;
}
