import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class ClockOutDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  clientTime: string; // Format: YYYY-MM-DD HH:mm:ss
} 