import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Route } from '../entities/route.entity';

@Injectable()
export class RoutesService {
  constructor(
    @InjectRepository(Route)
    private routeRepository: Repository<Route>,
  ) {}

  async findAll(): Promise<Route[]> {
    return this.routeRepository.find({
      order: {
        name: 'ASC',
      },
    });
  }

  async findOne(id: number): Promise<Route | null> {
    return this.routeRepository.findOne({ where: { id } });
  }

  async findByRegion(regionId: number): Promise<Route[]> {
    return this.routeRepository.find({
      where: { region: regionId },
      order: { name: 'ASC' },
    });
  }

  async findByCountry(countryId: number): Promise<Route[]> {
    return this.routeRepository.find({
      where: { country_id: countryId },
      order: { name: 'ASC' },
    });
  }

  async findActive(): Promise<Route[]> {
    return this.routeRepository.find({
      where: { status: 1 },
      order: { name: 'ASC' },
    });
  }

  async findByLeader(leaderId: number): Promise<Route[]> {
    return this.routeRepository.find({
      where: { leader_id: leaderId },
      order: { name: 'ASC' },
    });
  }
} 