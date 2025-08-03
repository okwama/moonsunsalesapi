import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsController } from './clients.controller';
import { OutletsController } from './outlets.controller';
import { ClientsService } from './clients.service';
import { Clients } from '../entities/clients.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Clients])],
  controllers: [ClientsController, OutletsController],
  providers: [ClientsService],
  exports: [ClientsService],
})
export class ClientsModule {} 