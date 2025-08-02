import { IsNumber, IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateJourneyPlanDto {
  @IsNumber()
  clientId: number;

  @IsDateString()
  date: string;

  @IsString()
  time: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsNumber()
  routeId?: number;
} 