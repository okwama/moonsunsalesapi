export declare class CreateOrderItemDto {
    productId: number;
    quantity: number;
    unitPrice?: number;
    taxAmount?: number;
    totalPrice?: number;
    taxType?: string;
    netPrice?: number;
    shippedQuantity?: number;
}
export declare class CreateOrderDto {
    soNumber?: string;
    clientId: number;
    orderDate?: string;
    expectedDeliveryDate?: string;
    subtotal?: number;
    taxAmount?: number;
    totalAmount?: number;
    netPrice?: number;
    notes?: string;
    createdBy?: number;
    salesrep?: number;
    riderId?: number;
    status?: string;
    myStatus?: number;
    orderItems: CreateOrderItemDto[];
    regionId?: number;
    countryId?: number;
    storeId?: number;
    comment?: string;
}
