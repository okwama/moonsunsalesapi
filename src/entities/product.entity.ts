import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity('Product')
@Index('Product_clientId_fkey', ['clientId'])
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  category_id: number;

  @Column()
  category: string;

  @Column({ type: 'decimal', precision: 11, scale: 2 })
  unit_cost: number;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  currentStock: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ nullable: true })
  clientId: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  image: string;

  @Column({ type: 'decimal', precision: 11, scale: 2, nullable: true })
  unit_cost_ngn: number;

  @Column({ type: 'decimal', precision: 11, scale: 2, nullable: true })
  unit_cost_tzs: number;
} 