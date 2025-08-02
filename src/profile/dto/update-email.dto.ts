import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class UpdateEmailDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
} 