import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ReservationModule } from './reservations/reservation.module';
import { HotelsModule } from './hotels/hotels.module';
import { ReservationEntity } from './reservations/entities/reservations.entity';
import { UserEntity } from './users/entities/users.entity';
import { HotelEntity } from './hotels/entities/hotels.entity';
import { ReservationController } from './reservations/controllers/reservation.controller';
import { UsersController } from './users/controllers/users.controller';
import { HotelsController } from './hotels/controllers/hotels.controller';
import { ReservationService } from './reservations/services/reservation.service';
import { UsersService } from './users/services/users.service';
import { HotelsService } from './hotels/services/hotels.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
      entities: [ReservationEntity, UserEntity, HotelEntity],
      extra: {
        ssl: false,
      },
    }),
    TypeOrmModule.forFeature([ReservationEntity, UserEntity, HotelEntity]),
    UsersModule,
    ReservationModule,
    HotelsModule,
    AuthModule,
  ],
  controllers: [ReservationController, UsersController, HotelsController],
  providers: [ReservationService, UsersService, HotelsService],
})
export class AppModule {}
