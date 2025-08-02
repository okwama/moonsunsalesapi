"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcelImportService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let ExcelImportService = class ExcelImportService {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async findAll(query) {
        try {
            const result = await this.dataSource.query('CALL GetExcelImports(?, ?, ?)', [query.userId, query.type, query.limit]);
            return result[0];
        }
        catch (error) {
            console.error('Error fetching excel imports:', error);
            throw new Error('Failed to fetch excel imports');
        }
    }
    async findOne(id) {
        try {
            const result = await this.dataSource.query('CALL GetExcelImportById(?)', [id]);
            return result[0][0];
        }
        catch (error) {
            console.error('Error fetching excel import by ID:', error);
            throw new Error('Failed to fetch excel import');
        }
    }
    async uploadExcel(file, importDto) {
        try {
            const result = await this.dataSource.query('CALL ProcessExcelImport(?, ?, ?, ?)', [
                importDto.userId,
                file.filename,
                importDto.importType,
                importDto.options
            ]);
            return result[0][0];
        }
        catch (error) {
            console.error('Error processing excel import:', error);
            throw new Error('Failed to process excel import');
        }
    }
    async create(createExcelImportDto) {
        try {
            const result = await this.dataSource.query('CALL CreateExcelImport(?, ?, ?, ?)', [
                createExcelImportDto.userId,
                createExcelImportDto.filename,
                createExcelImportDto.importType,
                createExcelImportDto.status
            ]);
            return result[0][0];
        }
        catch (error) {
            console.error('Error creating excel import:', error);
            throw new Error('Failed to create excel import');
        }
    }
    async update(id, updateExcelImportDto) {
        try {
            const result = await this.dataSource.query('CALL UpdateExcelImport(?, ?, ?, ?, ?)', [
                id,
                updateExcelImportDto.userId,
                updateExcelImportDto.filename,
                updateExcelImportDto.importType,
                updateExcelImportDto.status
            ]);
            return result[0][0];
        }
        catch (error) {
            console.error('Error updating excel import:', error);
            throw new Error('Failed to update excel import');
        }
    }
    async remove(id) {
        try {
            await this.dataSource.query('CALL DeleteExcelImport(?)', [id]);
            return { message: 'Excel import deleted successfully' };
        }
        catch (error) {
            console.error('Error deleting excel import:', error);
            throw new Error('Failed to delete excel import');
        }
    }
};
exports.ExcelImportService = ExcelImportService;
exports.ExcelImportService = ExcelImportService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], ExcelImportService);
//# sourceMappingURL=excel-import.service.js.map