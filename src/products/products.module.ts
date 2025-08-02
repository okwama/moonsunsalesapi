import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController, HealthController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { Store } from '../entities/store.entity';
import { StoreInventory } from '../entities/store-inventory.entity';
import { Category } from '../entities/category.entity';
import { CategoryPriceOption } from '../entities/category-price-option.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Store, StoreInventory, Category, CategoryPriceOption])],
  controllers: [ProductsController, HealthController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {} 