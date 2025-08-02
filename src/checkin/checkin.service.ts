import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class CheckinService {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async findAll(query: any) {
    try {
      const result = await this.dataSource.query(
        'CALL GetCheckins(?, ?, ?)',
        [query.userId, query.status, query.limit]
      );
      return result[0];
    } catch (error) {
      console.error('Error fetching checkins:', error);
      throw new Error('Failed to fetch checkins');
    }
  }

  async findOne(id: number) {
    try {
      const result = await this.dataSource.query(
        'CALL GetCheckinById(?)',
        [id]
      );
      return result[0][0];
    } catch (error) {
      console.error('Error fetching checkin by ID:', error);
      throw new Error('Failed to fetch checkin');
    }
  }

  async create(createCheckinDto: any) {
    try {
      const result = await this.dataSource.query(
        'CALL CreateCheckin(?, ?, ?, ?)',
        [
          createCheckinDto.userId,
          createCheckinDto.location,
          createCheckinDto.checkinTime,
          createCheckinDto.status
        ]
      );
      return result[0][0];
    } catch (error) {
      console.error('Error creating checkin:', error);
      throw new Error('Failed to create checkin');
    }
  }

  async update(id: number, updateCheckinDto: any) {
    try {
      const result = await this.dataSource.query(
        'CALL UpdateCheckin(?, ?, ?, ?, ?)',
        [
          id,
          updateCheckinDto.userId,
          updateCheckinDto.location,
          updateCheckinDto.checkinTime,
          updateCheckinDto.status
        ]
      );
      return result[0][0];
    } catch (error) {
      console.error('Error updating checkin:', error);
      throw new Error('Failed to update checkin');
    }
  }

  async remove(id: number) {
    try {
      await this.dataSource.query(
        'CALL DeleteCheckin(?)',
        [id]
      );
      return { message: 'Checkin deleted successfully' };
    } catch (error) {
      console.error('Error deleting checkin:', error);
      throw new Error('Failed to delete checkin');
    }
  }
} 