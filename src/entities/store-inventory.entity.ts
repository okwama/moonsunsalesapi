import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { Store } from './store.entity';

@Entity('store_inventory')
export class StoreInventory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'store_id', type: 'int' })
  storeId: number;

  @Column({ name: 'product_id', type: 'int' })
  productId: number;

  @Column({ type: 'int', default: 0, nullable: true })
  quantity: number;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', precision: 0 })
  updatedAt: Date;

  @ManyToOne(() => Store, store => store.storeInventory)
  @JoinColumn({ name: 'store_id' })
  store: Store;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;
} 