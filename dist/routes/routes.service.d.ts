import { Repository } from 'typeorm';
import { Route } from '../entities/route.entity';
export declare class RoutesService {
    private routeRepository;
    constructor(routeRepository: Repository<Route>);
    findAll(userCountryId: number): Promise<Route[]>;
    findOne(id: number, userCountryId: number): Promise<Route | null>;
    findByRegion(regionId: number, userCountryId: number): Promise<Route[]>;
    findByCountry(countryId: number, userCountryId: number): Promise<Route[]>;
    findActive(userCountryId: number): Promise<Route[]>;
    findByLeader(leaderId: number, userCountryId: number): Promise<Route[]>;
}
