import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { Route } from '../entities/route.entity';

@Controller('routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Get()
  async findAll(): Promise<Route[]> {
    return this.routesService.findAll();
  }

  @Get('active')
  async findActive(): Promise<Route[]> {
    return this.routesService.findActive();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: string): Promise<Route> {
    const route = await this.routesService.findOne(parseInt(id));
    if (!route) {
      throw new Error('Route not found');
    }
    return route;
  }

  @Get('region/:regionId')
  async findByRegion(@Param('regionId', ParseIntPipe) regionId: string): Promise<Route[]> {
    return this.routesService.findByRegion(parseInt(regionId));
  }

  @Get('country/:countryId')
  async findByCountry(@Param('countryId', ParseIntPipe) countryId: string): Promise<Route[]> {
    return this.routesService.findByCountry(parseInt(countryId));
  }

  @Get('leader/:leaderId')
  async findByLeader(@Param('leaderId', ParseIntPipe) leaderId: string): Promise<Route[]> {
    return this.routesService.findByLeader(parseInt(leaderId));
  }
} 