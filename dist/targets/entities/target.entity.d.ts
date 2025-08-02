import { SalesRep } from '../../entities/sales-rep.entity';
export declare class Target {
    id: number;
    salesRepId: number;
    salesRep: SalesRep;
    isCurrent: boolean;
    targetValue: number;
    achievedValue: number;
    achieved: boolean;
    createdAt: Date;
    updatedAt: Date;
}
