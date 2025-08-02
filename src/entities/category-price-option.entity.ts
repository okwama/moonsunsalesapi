import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from './category.entity';

@Entity('CategoryPriceOption')
export class CategoryPriceOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'category_id', type: 'int' })
  categoryId: number;

  @Column({ name: 'label', length: 100 })
  label: string;

  @Column({
    name: 'value',
    type: 'decimal',
    precision: 15,
    scale: 2,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value) || 0
    }
  })
  value: number;

  @Column({
    name: 'value_tzs',
    type: 'decimal',
    precision: 15,
    scale: 2,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value) || 0
    }
  })
  valueTzs: number;

  @Column({
    name: 'value_ngn',
    type: 'decimal',
    precision: 15,
    scale: 2,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value) || 0
    }
  })
  valueNgn: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', precision: 0 })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', precision: 0 })
  updatedAt: Date;

  @ManyToOne(() => Category, category => category.categoryPriceOptions)
  @JoinColumn({ name: 'category_id' })
  category: Category;
} 