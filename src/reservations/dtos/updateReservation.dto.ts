import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsNotEmpty } from 'class-validator';
import { Room } from 'src/models/rooms.model';

export class UpdateReservationDto {
  @ApiProperty()
  @IsNotEmpty()
  userId?: number;

  @ApiProperty()
  @IsNotEmpty()
  hotelId?: number;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  checkInDate?: Date;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  checkOutDate?: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Room)
  room?: Room;
}
