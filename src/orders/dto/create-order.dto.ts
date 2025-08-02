import { IsString, IsNumber, IsOptional, IsDecimal, IsDateString, IsArray } from 'class-validator';

export class CreateOrderItemDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsDecimal()
  unitPrice?: number;

  @IsOptional()
  @IsDecimal()
  taxAmount?: number;

  @IsOptional()
  @IsDecimal()
  totalPrice?: number;

  @IsOptional()
  @IsString()
  taxType?: string;

  @IsOptional()
  @IsDecimal()
  netPrice?: number;

  @IsOptional()
  @IsNumber()
  shippedQuantity?: number;
}

export class CreateOrderDto {
  @IsOptional()
  @IsString()
  soNumber?: string;

  @IsNumber()
  clientId: number;

  @IsOptional()
  @IsDateString()
  orderDate?: string;

  @IsOptional()
  @IsDateString()
  expectedDeliveryDate?: string;

  @IsOptional()
  @IsDecimal()
  subtotal?: number;

  @IsOptional()
  @IsDecimal()
  taxAmount?: number;

  @IsOptional()
  @IsDecimal()
  totalAmount?: number;

  @IsOptional()
  @IsDecimal()
  netPrice?: number;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsNumber()
  createdBy?: number;

  @IsOptional()
  @IsNumber()
  salesrep?: number;

  @IsOptional()
  @IsNumber()
  riderId?: number;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsNumber()
  myStatus?: number;

  @IsArray()
  orderItems: CreateOrderItemDto[];

  // Additional fields from Flutter app
  @IsOptional()
  @IsNumber()
  regionId?: number;

  @IsOptional()
  @IsNumber()
  countryId?: number;

  @IsOptional()
  @IsNumber()
  storeId?: number;

  @IsOptional()
  @IsString()
  comment?: string;
} 