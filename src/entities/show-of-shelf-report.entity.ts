import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { SalesRep } from './sales-rep.entity';
import { Clients } from './clients.entity';
import { JourneyPlan } from '../journey-plans/entities/journey-plan.entity';

@Entity('ShowOfShelfReport')
export class ShowOfShelfReport {
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

  @Column({ name: 'totalItemsOnShelf' })
  totalItemsOnShelf: number;

  @Column({ name: 'companyItemsOnShelf' })
  companyItemsOnShelf: number;

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
