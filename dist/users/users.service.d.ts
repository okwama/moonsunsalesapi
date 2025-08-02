import { Repository } from 'typeorm';
import { SalesRep } from '../entities/sales-rep.entity';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<SalesRep>);
    findByEmail(email: string): Promise<SalesRep | null>;
    findByPhoneNumber(phoneNumber: string): Promise<SalesRep | null>;
    findById(id: number): Promise<SalesRep | null>;
    findAll(): Promise<SalesRep[]>;
    create(userData: Partial<SalesRep>): Promise<SalesRep>;
    update(id: number, userData: Partial<SalesRep>): Promise<SalesRep | null>;
    delete(id: number): Promise<void>;
    findByCountryAndRegion(countryId: number, regionId: number): Promise<SalesRep[]>;
    findByRoute(routeId: number): Promise<SalesRep[]>;
}
