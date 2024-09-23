import { Module } from '@nestjs/common';
import { ReservationService } from './services/reservation.service';
import { ReservationController } from './controllers/reservation.controller';
import { ReservationEntity } from './entities/reservations.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/users.entity';
import { HotelEntity } from 'src/hotels/entities/hotels.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReservationEntity, UserEntity, HotelEntity]),
  ],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
