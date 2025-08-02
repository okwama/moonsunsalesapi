import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { SalesRep } from './sales-rep.entity';

@Entity('targets')
export class Target {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  salesRepId: number;

  @Column({ type: 'varchar', length: 50 })
  targetType: string; // 'visits', 'new_clients', 'vapes', 'pouches'

  @Column({ type: 'int' })
  targetValue: number;

  @Column({ type: 'int', nullable: true, default: 0 })
  currentValue: number;

  @Column({ type: 'varchar', length: 7 }) // Format: YYYY-MM
  targetMonth: string;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @Column({ type: 'varchar', length: 20, nullable: true, default: 'pending' })
  status: string; // 'pending', 'in_progress', 'completed', 'overdue'

  @Column({ type: 'int', nullable: true, default: 0 })
  progress: number; // Percentage (0-100)

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(() => SalesRep, { onDelete: 'CASCADE', onUpdate: 'RESTRICT' })
  @JoinColumn({ name: 'salesRepId' })
  salesRep: SalesRep;
} 