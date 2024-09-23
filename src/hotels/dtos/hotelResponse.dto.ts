import { Expose } from 'class-transformer';

export class HotelResponseDto {
  @Expose()
  hotelId: number;

  @Expose()
  name: string;

  @Expose()
  location: string;
}
