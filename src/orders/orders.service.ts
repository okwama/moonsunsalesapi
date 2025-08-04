import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    private dataSource: DataSource,
  ) {}

  async create(createOrderDto: CreateOrderDto, salesrepId?: number): Promise<Order> {
    let retryCount = 0;
    const maxRetries = 3;

    while (retryCount < maxRetries) {
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        // Generate SO number if not provided
        const soNumber = createOrderDto.soNumber || await this.generateSoNumber();
        
        // Calculate totals from order items
        let subtotal = 0;
        let taxAmount = 0;
        let totalAmount = 0;
        let netPrice = 0;

        // Calculate totals from order items
        for (const item of createOrderDto.orderItems) {
          const itemUnitPrice = item.unitPrice || 0;
          const itemQuantity = item.quantity || 0;
          const itemTotal = itemUnitPrice * itemQuantity;
          const itemTax = item.taxAmount || (itemTotal * 0.16); // Default 16% VAT
          const itemNet = itemTotal + itemTax;
          
          subtotal += itemTotal;
          taxAmount += itemTax;
          totalAmount += itemTotal;
          netPrice += itemNet;
        }

        // Create the order
        const orderData = {
          soNumber: soNumber,
          clientId: createOrderDto.clientId,
          orderDate: createOrderDto.orderDate ? new Date(createOrderDto.orderDate) : new Date(),
          expectedDeliveryDate: createOrderDto.expectedDeliveryDate ? new Date(createOrderDto.expectedDeliveryDate) : null,
          subtotal: subtotal,
          taxAmount: taxAmount,
          totalAmount: totalAmount,
          netPrice: netPrice,
          notes: createOrderDto.comment || createOrderDto.notes,
          createdBy: null, // Not set for sales rep orders
          salesrep: salesrepId, // Set from JWT token
          riderId: createOrderDto.riderId,
          status: createOrderDto.status || 'draft',
          myStatus: createOrderDto.myStatus || 0,
        };

        const order = this.orderRepository.create(orderData);
        const savedOrder = await queryRunner.manager.save(order);

        // Create order items
        for (const itemDto of createOrderDto.orderItems) {
          const itemUnitPrice = itemDto.unitPrice || 0;
          const itemQuantity = itemDto.quantity || 0;
          const itemTotal = itemUnitPrice * itemQuantity;
          const itemTax = itemDto.taxAmount || (itemTotal * 0.16); // Default 16% VAT
          const itemNet = itemTotal + itemTax;

          const orderItemData = {
            salesOrderId: savedOrder.id,
            productId: itemDto.productId,
            quantity: itemQuantity,
            unitPrice: itemUnitPrice,
            taxAmount: itemTax,
            totalPrice: itemTotal,
            taxType: itemDto.taxType || 'vat_16',
            netPrice: itemNet,
            shippedQuantity: itemDto.shippedQuantity || 0,
          };

          const orderItem = this.orderItemRepository.create(orderItemData);
          await queryRunner.manager.save(orderItem);
        }

        await queryRunner.commitTransaction();

        // Return the order with items
        return this.findOne(savedOrder.id);
      } catch (error) {
        await queryRunner.rollbackTransaction();
        
        // Check if it's a duplicate key error
        if (error.message && error.message.includes('Duplicate entry') && error.message.includes('so_number')) {
          retryCount++;
          if (retryCount >= maxRetries) {
            throw new Error(`Failed to create order after ${maxRetries} retries due to SO number conflicts`);
          }
          // Wait a bit before retrying to avoid immediate conflicts
          await new Promise(resolve => setTimeout(resolve, 100 * retryCount));
          continue;
        }
        
        throw error;
      } finally {
        await queryRunner.release();
      }
    }
    
    throw new Error('Failed to create order after maximum retries');
  }

  private async generateSoNumber(): Promise<string> {
    const currentYear = new Date().getFullYear();
    
    // Get the latest SO number for the current year
    const latestOrder = await this.orderRepository
      .createQueryBuilder('order')
      .where('order.soNumber LIKE :pattern', { pattern: `SO-${currentYear}-%` })
      .orderBy('order.soNumber', 'DESC')
      .getOne();
    
    let nextNumber = 1;
    
    if (latestOrder && latestOrder.soNumber) {
      const parts = latestOrder.soNumber.split('-');
      if (parts.length >= 3) {
        const yearPart = parts[1];
        const numberPart = parts[2];
        
        // Only increment if it's the same year
        if (yearPart === currentYear.toString()) {
          const lastNumber = parseInt(numberPart);
          if (!isNaN(lastNumber)) {
            nextNumber = lastNumber + 1;
          }
        }
        // If it's a different year, start from 1
      }
    }
    
    return `SO-${currentYear}-${nextNumber.toString().padStart(4, '0')}`;
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: ['user', 'client', 'orderItems', 'orderItems.product'],
    });
  }

  async findOne(id: number): Promise<Order | null> {
    return this.orderRepository.findOne({
      where: { id },
      relations: ['user', 'client', 'orderItems', 'orderItems.product'],
    });
  }

  async update(id: number, updateOrderDto: Partial<CreateOrderDto>): Promise<Order | null> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Find the existing order
      const existingOrder = await this.findOne(id);
      if (!existingOrder) {
        throw new Error('Order not found');
      }

      // Update order items if provided
      if (updateOrderDto.orderItems && updateOrderDto.orderItems.length > 0) {
        // Delete existing order items
        await queryRunner.manager.delete(OrderItem, { salesOrderId: id });

        // Calculate new totals
        let subtotal = 0;
        let taxAmount = 0;
        let totalAmount = 0;
        let netPrice = 0;

        // Create new order items
        for (const itemDto of updateOrderDto.orderItems) {
          const itemUnitPrice = itemDto.unitPrice || 0;
          const itemQuantity = itemDto.quantity || 0;
          const itemTotal = itemUnitPrice * itemQuantity;
          const itemTax = itemDto.taxAmount || (itemTotal * 0.16); // Default 16% VAT
          const itemNet = itemTotal + itemTax;

          const orderItemData = {
            salesOrderId: id,
            productId: itemDto.productId,
            quantity: itemQuantity,
            unitPrice: itemUnitPrice,
            taxAmount: itemTax,
            totalPrice: itemTotal,
            taxType: itemDto.taxType || 'vat_16',
            netPrice: itemNet,
            shippedQuantity: itemDto.shippedQuantity || 0,
          };

          const orderItem = this.orderItemRepository.create(orderItemData);
          await queryRunner.manager.save(orderItem);

          subtotal += itemTotal;
          taxAmount += itemTax;
          totalAmount += itemTotal;
          netPrice += itemNet;
        }

        // Update order totals
        await queryRunner.manager.update(Order, id, {
          subtotal: subtotal,
          taxAmount: taxAmount,
          totalAmount: totalAmount,
          netPrice: netPrice,
          notes: updateOrderDto.comment || updateOrderDto.notes,
        });
      } else {
        // Update only order fields if no items provided
        const updateData: any = {};
        if (updateOrderDto.comment !== undefined) updateData.notes = updateOrderDto.comment;
        if (updateOrderDto.notes !== undefined) updateData.notes = updateOrderDto.notes;
        if (updateOrderDto.status !== undefined) updateData.status = updateOrderDto.status;
        
        if (Object.keys(updateData).length > 0) {
          await queryRunner.manager.update(Order, id, updateData);
        }
      }

      await queryRunner.commitTransaction();

      // Return the updated order
      return this.findOne(id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number): Promise<void> {
    await this.orderRepository.delete(id);
  }
} 