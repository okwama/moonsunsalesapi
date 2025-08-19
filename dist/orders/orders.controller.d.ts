import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(createOrderDto: CreateOrderDto, req: any): Promise<{
        success: boolean;
        data: import("./entities/order.entity").Order;
    }>;
    findAll(req: any, page?: string, limit?: string, status?: string, clientId?: string, startDate?: string, endDate?: string): Promise<{
        success: boolean;
        message: string;
        data: any[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    } | {
        success: boolean;
        data: import("./entities/order.entity").Order[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        message?: undefined;
    }>;
    findOne(id: string, req: any): Promise<{
        success: boolean;
        message: string;
        data: any;
    } | {
        success: boolean;
        data: import("./entities/order.entity").Order;
        message?: undefined;
    }>;
    update(id: string, updateOrderDto: Partial<CreateOrderDto>): Promise<{
        success: boolean;
        data: import("./entities/order.entity").Order;
    }>;
    remove(id: string): Promise<void>;
}
