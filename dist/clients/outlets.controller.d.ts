import { ClientsService } from './clients.service';
export declare class OutletsController {
    private readonly clientsService;
    constructor(clientsService: ClientsService);
    getOutlet(id: string, req: any): Promise<{
        id: number;
        name: string;
        address: string;
        contact: string;
        email: string;
        latitude: number;
        longitude: number;
        regionId: number;
        region: string;
        countryId: number;
        status: number;
        taxPin: string;
        location: string;
        clientType: number;
        outletAccount: number;
        balance: number;
        createdAt: Date;
    }>;
    createOutlet(body: any, req: any): Promise<{
        id: number;
        name: string;
        address: string;
        contact: string;
        email: string;
        latitude: number;
        longitude: number;
        regionId: number;
        region: string;
        countryId: number;
        status: number;
        taxPin: string;
        location: string;
        clientType: number;
        outletAccount: number;
        balance: number;
        createdAt: Date;
    }>;
    private getFallbackCoordinates;
}
