import { ExcelImportService } from './excel-import.service';
export declare class ExcelImportController {
    private readonly excelImportService;
    constructor(excelImportService: ExcelImportService);
    findAll(query: any): Promise<any>;
    findOne(id: string): Promise<any>;
    uploadExcel(file: Express.Multer.File, importDto: any): Promise<any>;
    create(createExcelImportDto: any): Promise<any>;
    update(id: string, updateExcelImportDto: any): Promise<any>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
