import { ReservationEntity } from 'src/reservations/entities/reservations.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class HotelEntity {
  @PrimaryGeneratedColumn()
  hotelId: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column()
  description: string;

  @OneToMany(() => ReservationEntity, (reservation) => reservation.hotel)
  reservations: ReservationEntity[];
}
