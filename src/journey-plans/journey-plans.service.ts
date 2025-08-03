import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder, DataSource } from 'typeorm';
import { JourneyPlan } from './entities/journey-plan.entity';
import { CreateJourneyPlanDto } from './dto/create-journey-plan.dto';
import { UpdateJourneyPlanDto } from './dto/update-journey-plan.dto';

interface FindAllOptions {
  page: number;
  limit: number;
  status?: string;
  timezone?: string;
  date?: string;
  userId?: number;
}

interface FindByDateRangeOptions {
  page: number;
  limit: number;
  status?: string;
  timezone?: string;
  startDate: string;
  endDate: string;
  userId?: number;
}

@Injectable()
export class JourneyPlansService {
  constructor(
    @InjectRepository(JourneyPlan)
    private journeyPlanRepository: Repository<JourneyPlan>,
    private dataSource: DataSource,
  ) {}

  async create(createJourneyPlanDto: CreateJourneyPlanDto, userId?: number): Promise<JourneyPlan> {
    const journeyPlan = this.journeyPlanRepository.create({
      ...createJourneyPlanDto,
      userId: userId,
      status: 0, // pending
      date: new Date(createJourneyPlanDto.date),
    });
    
    const saved = await this.journeyPlanRepository.save(journeyPlan);
    return this.findOne(saved.id);
  }

  // Stored Procedure Method
  async findAllWithProcedure(options: FindAllOptions): Promise<{
    data: JourneyPlan[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
    success: boolean;
  }> {
    try {
      const { page, limit, status, date, userId, timezone } = options;
      const offset = (page - 1) * limit;

      // Convert status string to number
      const statusMap: { [key: string]: number } = {
        'pending': 0,
        'checked_in': 1,
        'in_progress': 2,
        'completed': 3,
        'cancelled': 4,
      };
      const statusValue = status ? (statusMap[status] ?? -1) : -1;

      // Use today's date if not provided
      const targetDate = date || new Date().toISOString().split('T')[0];

      console.log('🚀 Using stored procedure for journey plans');
      console.log('📊 Params:', { userId, statusValue, targetDate, page, limit, offset });

      // Call stored procedure
      const result = await this.dataSource.query(
        'CALL GetJourneyPlans(?, ?, ?, ?, ?, ?)',
        [userId || 0, statusValue, targetDate, page, limit, offset]
      );

      if (result && result.length > 0) {
        const data = result[0]; // First result set contains the data
        const total = result[1]?.[0]?.total || 0; // Second result set contains count

        console.log('✅ Stored procedure executed successfully');
        console.log('📊 Total found:', total);
        console.log('📊 Data length:', data.length);

        return {
          data,
          pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
          },
          success: true,
        };
      } else {
        throw new Error('No results from stored procedure');
      }
    } catch (error) {
      console.log('⚠️ Stored procedure failed, falling back to service method:', error.message);
      return this.findAll(options);
    }
  }

  // Enhanced service method with better performance
  async findAll(options: FindAllOptions): Promise<{
    data: JourneyPlan[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
    success: boolean;
  }> {
    const { page, limit, status, date, userId, timezone } = options;
    const offset = (page - 1) * limit;

    // Build query with optimized joins
    let query = this.journeyPlanRepository
      .createQueryBuilder('journeyPlan')
      .leftJoinAndSelect('journeyPlan.client', 'client')
      .leftJoinAndSelect('journeyPlan.user', 'user');

    // Add filters
    if (userId) {
      query = query.where('journeyPlan.userId = :userId', { userId });
    }

    if (status) {
      const statusMap: { [key: string]: number } = {
        'pending': 0,
        'checked_in': 1,
        'in_progress': 2,
        'completed': 3,
        'cancelled': 4,
      };
      const statusValue = statusMap[status] ?? 0;
      query = query.andWhere('journeyPlan.status = :status', { status: statusValue });
    }

    // Always filter by date - use provided date or default to today
    const targetDate = date || new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
    const startOfDay = new Date(targetDate);
    const endOfDay = new Date(targetDate);
    endOfDay.setDate(endOfDay.getDate() + 1);
    
    console.log('🔍 Journey Plans Filter Debug:');
    console.log('🔍 Target Date:', targetDate);
    console.log('🔍 Start of Day:', startOfDay);
    console.log('🔍 End of Day:', endOfDay);
    console.log('🔍 User ID:', userId);
    console.log('🔍 Status:', status);
    
    query = query.andWhere('journeyPlan.date >= :startDate AND journeyPlan.date < :endDate', {
      startDate: startOfDay,
      endDate: endOfDay,
    });

    // Get total count
    const total = await query.getCount();

    // Get paginated results
    const data = await query
      .orderBy('journeyPlan.date', 'DESC')
      .addOrderBy('journeyPlan.time', 'DESC')
      .skip(offset)
      .take(limit)
      .getMany();

    const totalPages = Math.ceil(total / limit);

    console.log('🔍 Journey Plans Results:');
    console.log('🔍 Total found:', total);
    console.log('🔍 Data length:', data.length);
    console.log('🔍 First journey plan date:', data[0]?.date);
    console.log('🔍 All journey plan dates:', data.map(jp => jp.date));

    return {
      data,
      pagination: {
        total,
        page,
        limit,
        totalPages,
      },
      success: true,
    };
  }

  async findByDateRange(options: FindByDateRangeOptions): Promise<{
    data: JourneyPlan[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
    success: boolean;
  }> {
    const { page, limit, status, startDate, endDate, userId } = options;
    const offset = (page - 1) * limit;

    // Build query
    let query = this.journeyPlanRepository
      .createQueryBuilder('journeyPlan')
      .leftJoinAndSelect('journeyPlan.client', 'client')
      .leftJoinAndSelect('journeyPlan.user', 'user');

    // Add filters
    if (userId) {
      query = query.where('journeyPlan.userId = :userId', { userId });
    }

    if (status) {
      const statusMap: { [key: string]: number } = {
        'pending': 0,
        'checked_in': 1,
        'in_progress': 2,
        'completed': 3,
        'cancelled': 4,
      };
      const statusValue = statusMap[status] ?? 0;
      query = query.andWhere('journeyPlan.status = :status', { status: statusValue });
    }

    // Filter by date range
    const startOfRange = new Date(startDate);
    const endOfRange = new Date(endDate);
    endOfRange.setDate(endOfRange.getDate() + 1); // Include the end date
    
    query = query.andWhere('journeyPlan.date >= :startDate AND journeyPlan.date < :endDate', {
      startDate: startOfRange,
      endDate: endOfRange,
    });

    // Get total count
    const total = await query.getCount();

    // Get paginated results
    const data = await query
      .orderBy('journeyPlan.date', 'DESC')
      .addOrderBy('journeyPlan.time', 'DESC')
      .skip(offset)
      .take(limit)
      .getMany();

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      pagination: {
        total,
        page,
        limit,
        totalPages,
      },
      success: true,
    };
  }

  async findOne(id: number): Promise<JourneyPlan | null> {
    return this.journeyPlanRepository.findOne({
      where: { id },
      relations: ['client', 'user'],
    });
  }

  async update(id: number, updateJourneyPlanDto: UpdateJourneyPlanDto): Promise<JourneyPlan | null> {
    const journeyPlan = await this.findOne(id);
    if (!journeyPlan) {
      throw new NotFoundException(`Journey plan with ID ${id} not found`);
    }

    // Convert status string to number if provided
    let statusValue: number | undefined;
    if (updateJourneyPlanDto.status) {
      const statusMap: { [key: string]: number } = {
        'pending': 0,
        'checked_in': 1,
        'in_progress': 2,
        'completed': 3,
        'cancelled': 4,
      };
      statusValue = statusMap[updateJourneyPlanDto.status] ?? 0;
    }

    // Convert date strings to Date objects
    const updateData: any = { ...updateJourneyPlanDto };
    if (statusValue !== undefined) {
      updateData.status = statusValue;
    }
    if (updateData.checkInTime) {
      updateData.checkInTime = new Date(updateData.checkInTime);
    }
    if (updateData.checkoutTime) {
      updateData.checkoutTime = new Date(updateData.checkoutTime);
    }

    await this.journeyPlanRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const journeyPlan = await this.findOne(id);
    if (!journeyPlan) {
      throw new NotFoundException(`Journey plan with ID ${id} not found`);
    }
    await this.journeyPlanRepository.delete(id);
  }

  async checkout(
    id: number,
    checkoutDto: {
      checkoutTime?: string;
      checkoutLatitude?: number;
      checkoutLongitude?: number;
    },
  ): Promise<JourneyPlan> {
    const journeyPlan = await this.findOne(id);
    if (!journeyPlan) {
      throw new NotFoundException(`Journey plan with ID ${id} not found`);
    }

    const updateData: any = {
      status: 3, // completed
      checkoutTime: checkoutDto.checkoutTime ? new Date(checkoutDto.checkoutTime) : new Date(),
    };

    if (checkoutDto.checkoutLatitude !== undefined) {
      updateData.checkoutLatitude = checkoutDto.checkoutLatitude;
    }
    if (checkoutDto.checkoutLongitude !== undefined) {
      updateData.checkoutLongitude = checkoutDto.checkoutLongitude;
    }

    await this.journeyPlanRepository.update(id, updateData);
    return this.findOne(id);
  }
} 