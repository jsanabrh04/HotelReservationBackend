import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { HotelsService } from '../services/hotels.service';
import { CreateHotelDto } from '../dtos/createHotel.dto';
import { HotelEntity } from '../entities/hotels.entity';
import { UpdateHotelDto } from '../dtos/updateHotel.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@ApiTags('Hotels')
@Controller('hotels')
@UseGuards(JwtAuthGuard)
export class HotelsController {
  constructor(private readonly hotelService: HotelsService) {}

  @Post('createHotel')
  @Roles('admin')
  async createHotel(@Body() createHotel: CreateHotelDto): Promise<HotelEntity> {
    return this.hotelService.createHotel(createHotel);
  }

  @Get('/findAllHotels')
  @Roles('user', 'admin')
  async findAllHotels() {
    return this.hotelService.findAllHotels();
  }

  @Patch('/updateHotel/:hotelId')
  @Roles('admin')
  async updateHotel(
    @Param('hotelId') hotelId: number,
    @Body() updateHotel: UpdateHotelDto,
  ) {
    return this.hotelService.updateHotel(hotelId, updateHotel);
  }

  @Get('/findOne/:hotelId')
  @Roles('admin')
  async findOne(@Param('hotelId') hotelId: number) {
    return await this.hotelService.findById(hotelId);
  }
}
