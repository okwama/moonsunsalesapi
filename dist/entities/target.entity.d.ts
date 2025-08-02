import { SalesRep } from './sales-rep.entity';
export declare class Target {
    id: number;
    salesRepId: number;
    targetType: string;
    targetValue: number;
    currentValue: number;
    targetMonth: string;
    startDate: Date;
    endDate: Date;
    status: string;
    progress: number;
    createdAt: Date;
    updatedAt: Date;
    salesRep: SalesRep;
}
