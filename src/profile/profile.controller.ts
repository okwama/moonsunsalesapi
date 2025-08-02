import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  UseGuards, 
  Request, 
  UseInterceptors, 
  UploadedFile,
  BadRequestException,
  Logger,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ProfileService } from './profile.service';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateEmailDto } from './dto/update-email.dto';

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  private readonly logger = new Logger(ProfileController.name);

  constructor(private readonly profileService: ProfileService) {}

  @Get()
  async getProfile(@Request() req) {
    this.logger.log(`👤 Profile request for user: ${req.user?.name || 'Unknown'}`);
    
    try {
      const user = await this.profileService.findById(req.user.id);
      if (!user) {
        throw new BadRequestException('User not found');
      }

      // Return in the format expected by Flutter app
      return {
        salesRep: {
          id: user.id,
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
          photoUrl: user.photoUrl,
          role: user.role,
          region: user.region,
          region_id: user.region_id,
          country: user.country,
          countryId: user.countryId,
          status: user.status
        }
      };
    } catch (error) {
      this.logger.error(`❌ Error fetching profile for user ${req.user.id}:`, error.stack);
      throw error;
    }
  }

  @Post('password')
  @HttpCode(HttpStatus.OK) // Return 200 status code
  async updatePassword(@Request() req, @Body() updatePasswordDto: UpdatePasswordDto) {
    this.logger.log(`🔐 Password update request for user: ${req.user?.name || 'Unknown'}`);
    
    try {
      const result = await this.profileService.updatePassword(
        req.user.id,
        updatePasswordDto.currentPassword,
        updatePasswordDto.newPassword,
        updatePasswordDto.confirmPassword
      );
      
      this.logger.log(`✅ Password updated successfully for user: ${req.user?.name}`);
      return result;
    } catch (error) {
      this.logger.error(`❌ Password update failed for user ${req.user.id}:`, error.stack);
      throw error;
    }
  }

  @Post('email')
  @HttpCode(HttpStatus.OK) // Return 200 status code
  async updateEmail(@Request() req, @Body() updateEmailDto: UpdateEmailDto) {
    this.logger.log(`📧 Email update request for user: ${req.user?.name || 'Unknown'}`);
    
    try {
      const result = await this.profileService.updateEmail(
        req.user.id,
        updateEmailDto.email
      );
      
      this.logger.log(`✅ Email updated successfully for user: ${req.user?.name}`);
      return result;
    } catch (error) {
      this.logger.error(`❌ Email update failed for user ${req.user.id}:`, error.stack);
      throw error;
    }
  }

  @Post('photo')
  @HttpCode(HttpStatus.OK) // Return 200 status code
  @UseInterceptors(FileInterceptor('photo'))
  async updateProfilePhoto(@Request() req, @UploadedFile() file: Express.Multer.File) {
    this.logger.log(`📸 Photo upload request for user: ${req.user?.name || 'Unknown'}`);
    
    if (!file) {
      throw new BadRequestException('No photo file provided');
    }

    try {
      const photoUrl = await this.profileService.updateProfilePhoto(req.user.id, file);
      
      this.logger.log(`✅ Photo updated successfully for user: ${req.user?.name}`);
      return { photoUrl };
    } catch (error) {
      this.logger.error(`❌ Photo update failed for user ${req.user.id}:`, error.stack);
      throw error;
    }
  }
} 