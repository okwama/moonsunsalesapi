import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VersionController } from './version.controller';
import { VersionService } from './version.service';
import { Version } from '../entities/version.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Version])],
  controllers: [VersionController],
  providers: [VersionService],
  exports: [VersionService],
})
export class VersionModule {} 