import { Category } from './category.entity';
export declare class CategoryPriceOption {
    id: number;
    categoryId: number;
    label: string;
    value: number;
    valueTzs: number;
    valueNgn: number;
    createdAt: Date;
    updatedAt: Date;
    category: Category;
}
