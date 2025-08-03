import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  UseGuards, 
  UseInterceptors, 
  UploadedFile,
  Request,
  ParseIntPipe
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller('outlets')
@UseGuards(JwtAuthGuard)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get(':clientId/payments')
  async getClientPayments(
    @Param('clientId', ParseIntPipe) clientId: number,
    @Request() req
  ) {
    const payments = await this.paymentsService.findByClientId(clientId);
    
    // Transform to match Flutter app expectations
    return payments.map(payment => ({
      id: payment.id,
      clientId: payment.clientId,
      userId: payment.salesrepId,
      amount: payment.amount,
      imageUrl: payment.invoicefileUrl,
      method: payment.payment_method,
      status: payment.status,
      date: payment.date,
    }));
  }

  @Post(':clientId/payments')
  @UseInterceptors(FileInterceptor('image'))
  async uploadClientPayment(
    @Param('clientId', ParseIntPipe) clientId: number,
    @Body() createPaymentDto: any,
    @UploadedFile() file: Express.Multer.File,
    @Request() req
  ) {
    const userId = req.user.id;
    
    const paymentData: CreatePaymentDto = {
      clientId,
      amount: parseFloat(createPaymentDto.amount),
      payment_method: createPaymentDto.method,
      salesrepId: userId,
      status: 'PENDING',
    };

    const payment = await this.paymentsService.create(paymentData, file);
    
    // Return transformed data to match Flutter expectations
    return {
      id: payment.id,
      clientId: payment.clientId,
      userId: payment.salesrepId,
      amount: payment.amount,
      imageUrl: payment.invoicefileUrl,
      method: payment.payment_method,
      status: payment.status,
      date: payment.date,
    };
  }

  @Get('payments/salesrep/:salesrepId')
  async getSalesRepPayments(
    @Param('salesrepId', ParseIntPipe) salesrepId: number
  ) {
    const payments = await this.paymentsService.findBySalesRepId(salesrepId);
    
    return payments.map(payment => ({
      id: payment.id,
      clientId: payment.clientId,
      userId: payment.salesrepId,
      amount: payment.amount,
      imageUrl: payment.invoicefileUrl,
      method: payment.payment_method,
      status: payment.status,
      date: payment.date,
    }));
  }
} 