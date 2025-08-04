import { Repository } from 'typeorm';
import { SalesClientPayment } from '../entities/sales-client-payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
export declare class PaymentsService {
    private paymentsRepository;
    private cloudinaryService;
    private readonly logger;
    constructor(paymentsRepository: Repository<SalesClientPayment>, cloudinaryService: CloudinaryService);
    create(createPaymentDto: CreatePaymentDto, file?: Express.Multer.File): Promise<SalesClientPayment>;
    findByClientId(clientId: number): Promise<SalesClientPayment[]>;
    findOne(id: number): Promise<SalesClientPayment>;
    update(id: number, updatePaymentDto: Partial<CreatePaymentDto>): Promise<SalesClientPayment>;
    remove(id: number): Promise<void>;
    findBySalesRepId(salesrepId: number): Promise<SalesClientPayment[]>;
}
