import { Expose, Type } from 'class-transformer';
import { HotelResponseDto } from 'src/hotels/dtos/hotelResponse.dto';

import { UserResponseDto } from 'src/users/dtos/responseUser.dto';

export class ReservationResponseDto {
  @Expose()
  reservationId: number;

  @Expose()
  checkInDate: Date;

  @Expose()
  checkOutDate: Date;

  @Expose()
  room: string;

  @Expose()
  createdAt: Date;

  @Expose()
  @Type(() => HotelResponseDto)
  hotel: HotelResponseDto;

  @Expose()
  @Type(() => UserResponseDto)
  user: UserResponseDto;
}
