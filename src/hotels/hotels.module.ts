import { Module } from '@nestjs/common';
import { HotelsService } from './services/hotels.service';
import { HotelsController } from './controllers/hotels.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelEntity } from './entities/hotels.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([HotelEntity]), AuthModule],
  controllers: [HotelsController],
  providers: [HotelsService],
})
export class HotelsModule {}
