import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HotelEntity } from '../entities/hotels.entity';
import { CreateHotelDto } from '../dtos/createHotel.dto';
import { UpdateHotelDto } from '../dtos/updateHotel.dto';

@Injectable()
export class HotelsService {
  constructor(
    @InjectRepository(HotelEntity)
    private readonly hotelRepository: Repository<HotelEntity>,
  ) {}
  async createHotel(createHotel: CreateHotelDto): Promise<HotelEntity> {
    const hotel = this.hotelRepository.create(createHotel);
    return await this.hotelRepository.save(hotel);
  }

  async findAllHotels() {
    return await this.hotelRepository.find();
  }

  async updateHotel(
    hotelId: number,
    updateHotel: UpdateHotelDto,
  ): Promise<any> {
    const hotel = await this.hotelRepository.findOne({ where: { hotelId } });
    if (!hotel) {
      throw new NotFoundException('Hotel not found');
    }
    await this.hotelRepository.update(hotelId, updateHotel);

    const updateHotelData = await this.hotelRepository.findOne({
      where: { hotelId },
    });

    return await updateHotelData;
  }

  async findById(hotelId: number): Promise<HotelEntity> {
    const hotel = await this.hotelRepository.findOne({ where: { hotelId } });
    return hotel;
  }
}
