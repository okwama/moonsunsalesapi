import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SalesClientPayment } from '../entities/sales-client-payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(SalesClientPayment)
    private paymentsRepository: Repository<SalesClientPayment>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async create(createPaymentDto: CreatePaymentDto, file?: Express.Multer.File): Promise<SalesClientPayment> {
    const payment = this.paymentsRepository.create({
      ...createPaymentDto,
      date: new Date(),
      status: createPaymentDto.status || 'PENDING',
    });

    // Upload file to Cloudinary if provided
    if (file) {
      const uploadResult = await this.cloudinaryService.uploadFile(file);
      payment.invoicefileUrl = uploadResult.secure_url;
    }

    return this.paymentsRepository.save(payment);
  }

  async findByClientId(clientId: number): Promise<SalesClientPayment[]> {
    return this.paymentsRepository.find({
      where: { clientId },
      order: { date: 'DESC' },
    });
  }

  async findOne(id: number): Promise<SalesClientPayment> {
    const payment = await this.paymentsRepository.findOne({ where: { id } });
    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
    return payment;
  }

  async update(id: number, updatePaymentDto: Partial<CreatePaymentDto>): Promise<SalesClientPayment> {
    const payment = await this.findOne(id);
    Object.assign(payment, updatePaymentDto);
    return this.paymentsRepository.save(payment);
  }

  async remove(id: number): Promise<void> {
    const payment = await this.findOne(id);
    await this.paymentsRepository.remove(payment);
  }

  async findBySalesRepId(salesrepId: number): Promise<SalesClientPayment[]> {
    return this.paymentsRepository.find({
      where: { salesrepId },
      order: { date: 'DESC' },
    });
  }
} 