import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { StoreInventory } from './store-inventory.entity';

@Entity('stores')
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'store_code', length: 20, unique: true })
  storeCode: string;

  @Column({ name: 'store_name', length: 100 })
  storeName: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ name: 'country_id', type: 'int' })
  countryId: number;

  @Column({ name: 'is_active', type: 'boolean', default: true, nullable: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', precision: 0 })
  createdAt: Date;

  @OneToMany(() => StoreInventory, storeInventory => storeInventory.store)
  storeInventory: StoreInventory[];
} 