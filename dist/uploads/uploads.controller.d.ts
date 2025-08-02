import { UploadsService } from './uploads.service';
export declare class UploadsController {
    private readonly uploadsService;
    constructor(uploadsService: UploadsService);
    findAll(query: any): Promise<any[]>;
    findOne(id: string): Promise<any>;
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
    update(id: string, updateUploadDto: any): Promise<{
        message: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
