import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservationEntity } from '../entities/reservations.entity';
import { Repository } from 'typeorm';
import { CreateReservationDto } from '../dtos/createReservation.dto';
import { UpdateReservationDto } from '../dtos/updateReservation.dto';
import { UserEntity } from 'src/users/entities/users.entity';
import { HotelEntity } from 'src/hotels/entities/hotels.entity';
import { ReservationResponseDto } from '../dtos/responseReservation.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(ReservationEntity)
    private readonly reservationRepository: Repository<ReservationEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(HotelEntity)
    private readonly hotelRepository: Repository<HotelEntity>,
  ) {}

  async create(
    createReservation: CreateReservationDto,
  ): Promise<ReservationEntity> {
    const user = await this.userRepository.findOne({
      where: { userId: createReservation.userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const hotel = await this.hotelRepository.findOne({
      where: { hotelId: createReservation.hotelId },
    });
    if (!hotel) {
      throw new NotFoundException('Hotel not found');
    }

    const newReservacion = this.reservationRepository.create({
      ...createReservation,
      user,
      hotel,
    });

    return await this.reservationRepository.save(newReservacion);
  }

  async findAllReservations(): Promise<ReservationResponseDto[]> {
    const reservations = await this.reservationRepository.find({
      relations: ['user', 'hotel'],
    });
    return reservations.map((reservation) =>
      plainToClass(ReservationResponseDto, reservation, {
        excludeExtraneousValues: true,
      }),
    );
  }

  async updateReservation(
    reservationId: number,
    updateReservation: UpdateReservationDto,
  ): Promise<any> {
    const reservation = await this.reservationRepository.findOne({
      where: { reservationId },
    });
    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }
    await this.reservationRepository.update(reservationId, updateReservation);

    const updateReservationData = await this.reservationRepository.findOne({
      where: { reservationId },
    });

    return await updateReservationData;
  }

  async findOne(reservationId: number): Promise<ReservationResponseDto> {
    const reservation = await this.reservationRepository.findOne({
      where: { reservationId },
      relations: ['user', 'hotel'],
    });

    if (!reservation) {
      throw new NotFoundException('Reserva no encontrada');
    }

    return plainToClass(ReservationResponseDto, reservation, {
      excludeExtraneousValues: true,
    });
  }
}
