import { RoutesService } from './routes.service';
import { Route } from '../entities/route.entity';
export declare class RoutesController {
    private readonly routesService;
    constructor(routesService: RoutesService);
    findAll(req: any): Promise<Route[]>;
    findActive(req: any): Promise<Route[]>;
    findOne(id: string, req: any): Promise<Route>;
    findByRegion(regionId: string, req: any): Promise<Route[]>;
    findByCountry(countryId: string, req: any): Promise<Route[]>;
    findByLeader(leaderId: string, req: any): Promise<Route[]>;
}
