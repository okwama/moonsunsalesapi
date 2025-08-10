import { SalesRep } from './sales-rep.entity';
import { Clients } from './clients.entity';
export declare class VisibilityReport {
    id: number;
    reportId: number;
    comment: string;
    imageUrl: string;
    createdAt: Date;
    clientId: number;
    userId: number;
    user: SalesRep;
    client: Clients;
}
