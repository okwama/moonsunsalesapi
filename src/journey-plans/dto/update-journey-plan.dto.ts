import { IsOptional, IsNumber, IsString, IsDateString, IsBoolean } from 'class-validator';

export class UpdateJourneyPlanDto {
  @IsOptional()
  @IsNumber()
  clientId?: number;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsDateString()
  checkInTime?: string;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsDateString()
  checkoutTime?: string;

  @IsOptional()
  @IsNumber()
  checkoutLatitude?: number;

  @IsOptional()
  @IsNumber()
  checkoutLongitude?: number;

  @IsOptional()
  @IsBoolean()
  showUpdateLocation?: boolean;

  @IsOptional()
  @IsNumber()
  routeId?: number;
} 