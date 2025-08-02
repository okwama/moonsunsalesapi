import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { SalesRep } from './sales-rep.entity';

@Entity('LoginHistory')
@Index('idx_userId', ['userId'])
@Index('idx_userId_status', ['userId', 'status'])
@Index('idx_sessionStart', ['sessionStart'])
@Index('idx_sessionEnd', ['sessionEnd'])
@Index('idx_userId_sessionStart', ['userId', 'sessionStart'])
@Index('idx_status_sessionStart', ['status', 'sessionStart'])
export class LoginHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  userId: number;

  @Column({ nullable: true, default: 'UTC' })
  timezone: string;

  @Column({ nullable: true })
  duration: number;

  @Column({ nullable: true, default: 0 })
  status: number;

  @Column({ nullable: true })
  sessionEnd: string;

  @Column({ nullable: true })
  sessionStart: string;

  @ManyToOne(() => SalesRep, salesRep => salesRep.LoginHistory)
  @JoinColumn({ name: 'userId' })
  SalesRep: SalesRep;
} 