import { PaymentsService } from './payments.service';
export declare class PaymentsController {
    private readonly paymentsService;
    private readonly logger;
    constructor(paymentsService: PaymentsService);
    getClientPayments(clientId: number, req: any): Promise<{
        id: number;
        clientId: number;
        userId: number;
        amount: number;
        imageUrl: string;
        method: string;
        status: string;
        date: Date;
    }[]>;
    uploadClientPayment(clientId: number, createPaymentDto: any, file: Express.Multer.File, req: any): Promise<{
        id: number;
        clientId: number;
        userId: number;
        amount: number;
        imageUrl: string;
        method: string;
        status: string;
        date: Date;
    }>;
    getSalesRepPayments(salesrepId: number): Promise<{
        id: number;
        clientId: number;
        userId: number;
        amount: number;
        imageUrl: string;
        method: string;
        status: string;
        date: Date;
    }[]>;
}
