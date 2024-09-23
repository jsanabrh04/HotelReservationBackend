import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ReservationService } from '../services/reservation.service';
import { CreateReservationDto } from '../dtos/createReservation.dto';
import { ReservationEntity } from '../entities/reservations.entity';
import { UpdateReservationDto } from '../dtos/updateReservation.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Reservations')
@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post('createReservation')
  async createUser(
    @Body() createReservation: CreateReservationDto,
  ): Promise<ReservationEntity> {
    return this.reservationService.create(createReservation);
  }

  @Get('/findAllReservations')
  async findAllUser() {
    return this.reservationService.findAllReservations();
  }

  @Patch('/updateReservation/:reservationId')
  async updateReservation(
    @Param('reservationId') reservationId: number,
    @Body() updateReservation: UpdateReservationDto,
  ) {
    return this.reservationService.updateReservation(
      reservationId,
      updateReservation,
    );
  }

  @Get('/findOne/:reservationId')
  async findOne(@Param('reservationId') reservationId: number) {
    return await this.reservationService.findOne(reservationId);
  }
}
