import { IsNumber, IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreatePaymentDto {
  @IsNumber()
  @IsNotEmpty()
  clientId: number;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsOptional()
  payment_method?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsNumber()
  @IsNotEmpty()
  salesrepId: number;
} 