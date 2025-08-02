import { SalesRep } from './sales-rep.entity';
import { Clients } from './clients.entity';
export declare class JourneyPlan {
    id: number;
    date: Date;
    time: string;
    userId: number;
    clientId: number;
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
    client: Clients;
    user: SalesRep;
}
