import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SalesRep } from '../entities/sales-rep.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(SalesRep)
    private userRepository: Repository<SalesRep>,
  ) {}

  async findByEmail(email: string): Promise<SalesRep | null> {
    return this.userRepository.findOne({
      where: { email, status: 1 }, // Active users only
    });
  }

  async findByPhoneNumber(phoneNumber: string): Promise<SalesRep | null> {
    return this.userRepository.findOne({
      where: { phoneNumber, status: 1 }, // Active users only
    });
  }

  async findById(id: number): Promise<SalesRep | null> {
    return this.userRepository.findOne({
      where: { id, status: 1 }, // Active users only
    });
  }

  async findAll(): Promise<SalesRep[]> {
    return this.userRepository.find({
      where: { status: 1 }, // Active users only
    });
  }

  async create(userData: Partial<SalesRep>): Promise<SalesRep> {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  async update(id: number, userData: Partial<SalesRep>): Promise<SalesRep | null> {
    await this.userRepository.update(id, userData);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.update(id, { status: 0 }); // Soft delete
  }

  async findByCountryAndRegion(countryId: number, regionId: number): Promise<SalesRep[]> {
    return this.userRepository.find({
      where: { countryId, region_id: regionId, status: 1 },
    });
  }

  async findByRoute(routeId: number): Promise<SalesRep[]> {
    return this.userRepository.find({
      where: { route_id: routeId, status: 1 },
    });
  }
} 