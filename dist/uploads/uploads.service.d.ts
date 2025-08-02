import { CloudinaryService } from '../cloudinary/cloudinary.service';
export declare class UploadsService {
    private cloudinaryService;
    constructor(cloudinaryService: CloudinaryService);
    findAll(query: any): Promise<any[]>;
    findOne(id: number): Promise<any>;
    uploadFile(file: Express.Multer.File, uploadDto: any): Promise<{
        success: boolean;
        url: string;
        fileId: string;
        name: string;
        format: string;
        size: number;
        userId: any;
        uploadedAt: Date;
    }>;
    create(createUploadDto: any): Promise<{
        message: string;
    }>;
    update(id: number, updateUploadDto: any): Promise<{
        message: string;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
