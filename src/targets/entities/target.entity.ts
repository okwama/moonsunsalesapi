import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SalesRep } from '../../entities/sales-rep.entity';

@Entity('Target')
export class Target {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'salesRepId', type: 'int' })
  salesRepId: number;

  @ManyToOne(() => SalesRep)
  @JoinColumn({ name: 'salesRepId' })
  salesRep: SalesRep;

  @Column({ name: 'isCurrent', type: 'tinyint', default: 0 })
  isCurrent: boolean;

  @Column({ name: 'targetValue', type: 'int' })
  targetValue: number;

  @Column({ name: 'achievedValue', type: 'int', default: 0 })
  achievedValue: number;

  @Column({ type: 'tinyint', default: 0 })
  achieved: boolean;

  @CreateDateColumn({ name: 'createdAt', type: 'datetime', precision: 3 })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt', type: 'datetime', precision: 3 })
  updatedAt: Date;
} 