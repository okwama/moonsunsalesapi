import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('routes')
export class Route {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column()
  region: number;

  @Column({ type: 'varchar', length: 100 })
  region_name: string;

  @Column()
  country_id: number;

  @Column({ type: 'varchar', length: 100 })
  country_name: string;

  @Column()
  leader_id: number;

  @Column({ type: 'varchar', length: 100 })
  leader_name: string;

  @Column()
  status: number;
} 