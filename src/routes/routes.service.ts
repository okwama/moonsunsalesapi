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

  async findAll(userCountryId: number): Promise<Route[]> {
    return this.routeRepository.find({
      where: { country_id: userCountryId }, // Only routes in user's country
      order: {
        name: 'ASC',
      },
    });
  }

  async findOne(id: number, userCountryId: number): Promise<Route | null> {
    return this.routeRepository.findOne({ 
      where: { 
        id,
        country_id: userCountryId, // Only routes in user's country
      }
    });
  }

  async findByRegion(regionId: number, userCountryId: number): Promise<Route[]> {
    return this.routeRepository.find({
      where: { 
        region: regionId,
        country_id: userCountryId, // Only routes in user's country
      },
      order: { name: 'ASC' },
    });
  }

  async findByCountry(countryId: number, userCountryId: number): Promise<Route[]> {
    // Ensure user can only access routes from their own country
    if (countryId !== userCountryId) {
      return [];
    }
    return this.routeRepository.find({
      where: { country_id: userCountryId },
      order: { name: 'ASC' },
    });
  }

  async findActive(userCountryId: number): Promise<Route[]> {
    return this.routeRepository.find({
      where: { 
        status: 1,
        country_id: userCountryId, // Only active routes in user's country
      },
      order: { name: 'ASC' },
    });
  }

  async findByLeader(leaderId: number, userCountryId: number): Promise<Route[]> {
    return this.routeRepository.find({
      where: { 
        leader_id: leaderId,
        country_id: userCountryId, // Only routes in user's country
      },
      order: { name: 'ASC' },
    });
  }
} 