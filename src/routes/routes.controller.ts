import { Controller, Get, Param, ParseIntPipe, UseGuards, Request } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { Route } from '../entities/route.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('routes')
@UseGuards(JwtAuthGuard)
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Get()
  async findAll(@Request() req): Promise<Route[]> {
    const userCountryId = req.user.countryId;
    return this.routesService.findAll(userCountryId);
  }

  @Get('active')
  async findActive(@Request() req): Promise<Route[]> {
    const userCountryId = req.user.countryId;
    return this.routesService.findActive(userCountryId);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: string, @Request() req): Promise<Route> {
    const userCountryId = req.user.countryId;
    const route = await this.routesService.findOne(parseInt(id), userCountryId);
    if (!route) {
      throw new Error('Route not found');
    }
    return route;
  }

  @Get('region/:regionId')
  async findByRegion(@Param('regionId', ParseIntPipe) regionId: string, @Request() req): Promise<Route[]> {
    const userCountryId = req.user.countryId;
    return this.routesService.findByRegion(parseInt(regionId), userCountryId);
  }

  @Get('country/:countryId')
  async findByCountry(@Param('countryId', ParseIntPipe) countryId: string, @Request() req): Promise<Route[]> {
    const userCountryId = req.user.countryId;
    return this.routesService.findByCountry(parseInt(countryId), userCountryId);
  }

  @Get('leader/:leaderId')
  async findByLeader(@Param('leaderId', ParseIntPipe) leaderId: string, @Request() req): Promise<Route[]> {
    const userCountryId = req.user.countryId;
    return this.routesService.findByLeader(parseInt(leaderId), userCountryId);
  }
} 