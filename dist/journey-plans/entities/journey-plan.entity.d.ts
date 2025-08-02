import { SalesRep } from '../../entities/sales-rep.entity';
import { Clients } from '../../entities/clients.entity';
export declare class JourneyPlan {
    id: number;
    date: Date;
    time: string;
    userId: number;
    user: SalesRep;
    clientId: number;
    client: Clients;
    status: number;
    checkInTime: Date;
    latitude: number;
    longitude: number;
    imageUrl: string;
    notes: string;
    checkoutLatitude: number;
    checkoutLongitude: number;
    checkoutTime: Date;
    showUpdateLocation: boolean;
    routeId: number;
}
