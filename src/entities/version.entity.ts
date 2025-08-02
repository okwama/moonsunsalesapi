import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('versions')
export class Version {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20 })
  version: string;

  @Column({ type: 'int', name: 'build_number' })
  buildNumber: number;

  @Column({ type: 'varchar', length: 20, nullable: true, name: 'min_required_version' })
  minRequiredVersion: string;

  @Column({ type: 'boolean', default: false, name: 'force_update' })
  forceUpdate: boolean;

  @Column({ type: 'text', nullable: true, name: 'update_message' })
  updateMessage: string;

  @Column({ type: 'boolean', default: true, name: 'is_active' })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
  createdAt: Date;
} 