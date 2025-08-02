import { Repository } from 'typeorm';
import { Route } from '../entities/route.entity';
export declare class RoutesService {
    private routeRepository;
    constructor(routeRepository: Repository<Route>);
    findAll(): Promise<Route[]>;
    findOne(id: number): Promise<Route | null>;
    findByRegion(regionId: number): Promise<Route[]>;
    findByCountry(countryId: number): Promise<Route[]>;
    findActive(): Promise<Route[]>;
    findByLeader(leaderId: number): Promise<Route[]>;
}
