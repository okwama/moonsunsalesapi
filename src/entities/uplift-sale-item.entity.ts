import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { UpliftSale } from './uplift-sale.entity';
import { Product } from '../products/entities/product.entity';

@Entity('UpliftSaleItem')
@Index('UpliftSaleItem_productId_fkey', ['productId'])
@Index('UpliftSaleItem_upliftSaleId_fkey', ['upliftSaleId'])
export class UpliftSaleItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  upliftSaleId: number;

  @Column()
  productId: number;

  @Column()
  quantity: number;

  @Column({ type: 'float' })
  unitPrice: number;

  @Column({ type: 'float' })
  total: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => Product, product => product.upliftSaleItems, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'productId' })
  product: Product;

  @ManyToOne(() => UpliftSale, upliftSale => upliftSale.upliftSaleItems, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'upliftSaleId' })
  upliftSale: UpliftSale;
} 