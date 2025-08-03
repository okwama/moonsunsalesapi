import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('salesclient_payment')
export class SalesClientPayment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'clientId' })
  clientId: number;

  @Column('double')
  amount: number;

  @Column({ name: 'invoicefileUrl', nullable: true })
  invoicefileUrl: string;

  @Column({ name: 'date', type: 'datetime', default: () => 'CURRENT_TIMESTAMP(3)' })
  date: Date;

  @Column({ nullable: true })
  status: string;

  @Column({ name: 'payment_method', nullable: true })
  payment_method: string;

  @Column({ name: 'salesrepId' })
  salesrepId: number;
} 