import { RoutesService } from './routes.service';
import { Route } from '../entities/route.entity';
export declare class RoutesController {
    private readonly routesService;
    constructor(routesService: RoutesService);
    findAll(): Promise<Route[]>;
    findActive(): Promise<Route[]>;
    findOne(id: string): Promise<Route>;
    findByRegion(regionId: string): Promise<Route[]>;
    findByCountry(countryId: string): Promise<Route[]>;
    findByLeader(leaderId: string): Promise<Route[]>;
}
