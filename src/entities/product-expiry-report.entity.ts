import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { SalesRep } from './sales-rep.entity';
import { Clients } from './clients.entity';
import { JourneyPlan } from '../journey-plans/entities/journey-plan.entity';

@Entity('ProductExpiryReport')
export class ProductExpiryReport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'journeyPlanId' })
  journeyPlanId: number;

  @Column({ name: 'clientId' })
  clientId: number;

  @Column({ name: 'userId' })
  userId: number;

  @Column({ name: 'productName' })
  productName: string;

  @Column({ name: 'productId', nullable: true })
  productId: number;

  @Column({ name: 'quantity' })
  quantity: number;

  @Column({ name: 'expiryDate', nullable: true })
  expiryDate: Date;

  @Column({ name: 'batchNumber', nullable: true })
  batchNumber: string;

  @Column({ name: 'comments', type: 'text', nullable: true })
  comments: string;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;

  // Relations
  @ManyToOne(() => JourneyPlan)
  @JoinColumn({ name: 'journeyPlanId' })
  journeyPlan: JourneyPlan;

  @ManyToOne(() => SalesRep)
  @JoinColumn({ name: 'userId' })
  user: SalesRep;

  @ManyToOne(() => Clients)
  @JoinColumn({ name: 'clientId' })
  client: Clients;
}
