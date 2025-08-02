import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { CategoryPriceOption } from './category-price-option.entity';

@Entity('Category')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', length: 100 })
  name: string;

  @OneToMany(() => CategoryPriceOption, categoryPriceOption => categoryPriceOption.category)
  categoryPriceOptions: CategoryPriceOption[];
} 