import { Repository } from 'typeorm';
import { JourneyPlan } from '../journey-plans/entities/journey-plan.entity';
import { SalesRep } from '../entities/sales-rep.entity';
import { Clients } from '../entities/clients.entity';
import { UpliftSale } from '../entities/uplift-sale.entity';
export declare class TargetsService {
    private journeyPlanRepository;
    private salesRepRepository;
    private clientsRepository;
    private upliftSaleRepository;
    constructor(journeyPlanRepository: Repository<JourneyPlan>, salesRepRepository: Repository<SalesRep>, clientsRepository: Repository<Clients>, upliftSaleRepository: Repository<UpliftSale>);
    getMonthlyVisits(userId: number): Promise<any[]>;
    getDashboard(userId: number, period?: string): Promise<any>;
    private getVisitTargets;
    private getDailyVisitsBreakdown;
    getVisitStatistics(userId: number, period?: string): Promise<any>;
    checkJourneyData(userId: number): Promise<any>;
    private getNewClientsProgress;
    private getProductSalesProgress;
}
