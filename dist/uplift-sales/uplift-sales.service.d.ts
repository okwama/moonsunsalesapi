import { Repository } from 'typeorm';
import { UpliftSale } from '../entities/uplift-sale.entity';
export declare class UpliftSalesService {
    private upliftSaleRepository;
    constructor(upliftSaleRepository: Repository<UpliftSale>);
    findAll(query: any): Promise<UpliftSale[]>;
    findOne(id: number): Promise<UpliftSale>;
    create(createUpliftSaleDto: any): Promise<UpliftSale>;
    update(id: number, updateUpliftSaleDto: any): Promise<UpliftSale>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
