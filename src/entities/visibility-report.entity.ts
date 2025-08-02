import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { SalesRep } from './sales-rep.entity';
import { Clients } from './clients.entity';

@Entity('visibility_reports')
export class VisibilityReport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'journey_plan_id' })
  journeyPlanId: number;

  @Column({ name: 'salesrep_id' })
  salesrepId: number;

  @Column({ name: 'client_id' })
  clientId: number;

  @Column({ name: 'visibility_activity' })
  visibilityActivity: string;

  @Column({ name: 'activity_details', type: 'text', nullable: true })
  activityDetails: string;

  @Column({ name: 'report_type', default: 'VISIBILITY_ACTIVITY' })
  reportType: string;

  @Column({ name: 'status', default: 'PENDING' })
  status: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => SalesRep)
  @JoinColumn({ name: 'salesrep_id' })
  salesrep: SalesRep;

  @ManyToOne(() => Clients)
  @JoinColumn({ name: 'client_id' })
  client: Clients;
} 