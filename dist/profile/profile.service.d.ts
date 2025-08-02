import { Repository } from 'typeorm';
import { SalesRep } from '../entities/sales-rep.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
export declare class ProfileService {
    private userRepository;
    private cloudinaryService;
    private readonly logger;
    constructor(userRepository: Repository<SalesRep>, cloudinaryService: CloudinaryService);
    findById(id: number): Promise<SalesRep | null>;
    updatePassword(userId: number, currentPassword: string, newPassword: string, confirmPassword: string): Promise<{
        success: boolean;
        message: string;
    }>;
    updateEmail(userId: number, email: string): Promise<{
        success: boolean;
        message: string;
    }>;
    updateProfilePhoto(userId: number, file: Express.Multer.File): Promise<string>;
}
