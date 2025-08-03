import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('outlets')
@UseGuards(JwtAuthGuard)
export class OutletsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  async createOutlet(@Body() body: any, @Request() req) {
    // Transform snake_case to camelCase for compatibility
    const createClientDto: CreateClientDto = {
      name: body.name,
      address: body.address,
      taxPin: body.tax_pin,
      email: body.email,
      contact: body.contact,
      latitude: body.latitude,
      longitude: body.longitude,
      location: body.location,
      clientType: body.client_type,
      regionId: body.region_id,
      region: body.region,
      routeId: body.route_id,
      routeName: body.route_name,
      routeIdUpdate: body.route_id_update,
      routeNameUpdate: body.route_name_update,
      balance: body.balance,
      outletAccount: body.outlet_account,
      countryId: body.country || req.user.countryId,
      addedBy: req.user.id,
    };

    const client = await this.clientsService.create(createClientDto, req.user.countryId);
    
    // Transform response to match Flutter's expected Client model
    return {
      id: client.id,
      name: client.name,
      address: client.address,
      contact: client.contact,
      email: client.email,
      latitude: client.latitude,
      longitude: client.longitude,
      regionId: client.region_id,
      region: client.region,
      countryId: client.countryId,
      status: client.status,
      taxPin: client.tax_pin,
      location: client.location,
      clientType: client.client_type,
      outletAccount: client.outlet_account,
      balance: client.balance,
      createdAt: client.created_at,
      updatedAt: client.updated_at,
    };
  }
} 