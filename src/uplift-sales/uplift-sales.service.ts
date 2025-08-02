import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpliftSale } from '../entities/uplift-sale.entity';

@Injectable()
export class UpliftSalesService {
  constructor(
    @InjectRepository(UpliftSale)
    private upliftSaleRepository: Repository<UpliftSale>,
  ) {}

  async findAll(query: any) {
    try {
      const queryBuilder = this.upliftSaleRepository.createQueryBuilder('upliftSale')
        .leftJoinAndSelect('upliftSale.client', 'client')
        .leftJoinAndSelect('upliftSale.user', 'user')
        .leftJoinAndSelect('upliftSale.upliftSaleItems', 'items');

      if (query.userId) {
        queryBuilder.where('upliftSale.userId = :userId', { userId: query.userId });
      }

      if (query.status) {
        queryBuilder.andWhere('upliftSale.status = :status', { status: query.status });
      }

      if (query.startDate) {
        queryBuilder.andWhere('upliftSale.createdAt >= :startDate', { startDate: query.startDate });
      }

      if (query.endDate) {
        queryBuilder.andWhere('upliftSale.createdAt <= :endDate', { endDate: query.endDate });
      }

      return queryBuilder.orderBy('upliftSale.createdAt', 'DESC').getMany();
    } catch (error) {
      console.error('Error fetching uplift sales:', error);
      throw new Error('Failed to fetch uplift sales');
    }
  }

  async findOne(id: number) {
    try {
      return this.upliftSaleRepository.findOne({
        where: { id },
        relations: ['client', 'user', 'upliftSaleItems']
      });
    } catch (error) {
      console.error('Error fetching uplift sale by ID:', error);
      throw new Error('Failed to fetch uplift sale');
    }
  }

  async create(createUpliftSaleDto: any) {
    try {
      const upliftSale = this.upliftSaleRepository.create(createUpliftSaleDto);
      const result = await this.upliftSaleRepository.save(upliftSale);
      return Array.isArray(result) ? result[0] : result;
    } catch (error) {
      console.error('Error creating uplift sale:', error);
      throw new Error('Failed to create uplift sale');
    }
  }

  async update(id: number, updateUpliftSaleDto: any) {
    try {
      await this.upliftSaleRepository.update(id, updateUpliftSaleDto);
      return this.findOne(id);
    } catch (error) {
      console.error('Error updating uplift sale:', error);
      throw new Error('Failed to update uplift sale');
    }
  }

  async remove(id: number) {
    try {
      await this.upliftSaleRepository.delete(id);
      return { message: 'Uplift sale deleted successfully' };
    } catch (error) {
      console.error('Error deleting uplift sale:', error);
      throw new Error('Failed to delete uplift sale');
    }
  }
} 