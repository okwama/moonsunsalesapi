import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { SalesRep } from './sales-rep.entity';
import { Clients } from './clients.entity';

@Entity('product_reports')
export class ProductReport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'journey_plan_id' })
  journeyPlanId: number;

  @Column({ name: 'salesrep_id' })
  salesrepId: number;

  @Column({ name: 'client_id' })
  clientId: number;

  @Column({ name: 'product_id' })
  productId: number;

  @Column({ name: 'product_name' })
  productName: string;

  @Column({ name: 'availability_status' })
  availabilityStatus: string;

  @Column({ name: 'quantity_available', type: 'int', nullable: true })
  quantityAvailable: number;

  @Column({ name: 'report_type', default: 'PRODUCT_AVAILABILITY' })
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