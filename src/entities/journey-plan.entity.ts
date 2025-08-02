import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { SalesRep } from './sales-rep.entity';
import { Clients } from './clients.entity';

@Entity('JourneyPlanss')
@Index('idx_clientId', ['clientId'])
@Index('JourneyPlan_routeId_fkey', ['routeId'])
@Index('idx_userId', ['userId'])
export class JourneyPlan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column()
  time: string;

  @Column({ nullable: true })
  userId: number;

  @Column({ nullable: true })
  clientId: number;

  @Column({ default: 0 })
  status: number;

  @Column({ type: 'timestamp', nullable: true })
  checkInTime: Date;

  @Column({ type: 'float', nullable: true })
  latitude: number;

  @Column({ type: 'float', nullable: true })
  longitude: number;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true })
  notes: string;

  @Column({ type: 'float', nullable: true })
  checkoutLatitude: number;

  @Column({ type: 'float', nullable: true })
  checkoutLongitude: number;

  @Column({ type: 'timestamp', nullable: true })
  checkoutTime: Date;

  @Column({ default: true })
  showUpdateLocation: boolean;

  @Column({ nullable: true })
  routeId: number;

  @ManyToOne(() => Clients, clients => clients.journeyPlans, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'clientId' })
  client: Clients;

  @ManyToOne(() => SalesRep, salesRep => salesRep.journeyPlans, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: SalesRep;
} 