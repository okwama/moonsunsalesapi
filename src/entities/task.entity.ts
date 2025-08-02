import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity('tasks')
@Index('tasks_salesRepId_fkey', ['salesRepId'])
@Index('idx_assignedById', ['assignedById'])
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  completedAt: Date;

  @Column({ default: false })
  isCompleted: boolean;

  @Column({ default: 'medium' })
  priority: string;

  @Column({ default: 'pending' })
  status: string;

  @Column()
  salesRepId: number;

  @Column({ nullable: true })
  assignedById: number;
} 