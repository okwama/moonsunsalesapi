"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcelImportModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const excel_import_controller_1 = require("./excel-import.controller");
const excel_import_service_1 = require("./excel-import.service");
let ExcelImportModule = class ExcelImportModule {
};
exports.ExcelImportModule = ExcelImportModule;
exports.ExcelImportModule = ExcelImportModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([])],
        controllers: [excel_import_controller_1.ExcelImportController],
        providers: [excel_import_service_1.ExcelImportService],
        exports: [excel_import_service_1.ExcelImportService],
    })
], ExcelImportModule);
//# sourceMappingURL=excel-import.module.js.map