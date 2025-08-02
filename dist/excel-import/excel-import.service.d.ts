import { DataSource } from 'typeorm';
export declare class ExcelImportService {
    private dataSource;
    constructor(dataSource: DataSource);
    findAll(query: any): Promise<any>;
    findOne(id: number): Promise<any>;
    uploadExcel(file: Express.Multer.File, importDto: any): Promise<any>;
    create(createExcelImportDto: any): Promise<any>;
    update(id: number, updateExcelImportDto: any): Promise<any>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
