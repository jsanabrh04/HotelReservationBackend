import { HotelEntity } from 'src/hotels/entities/hotels.entity';
import { Room } from 'src/models/rooms.model';
import { UserEntity } from 'src/users/entities/users.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ReservationEntity {
  @PrimaryGeneratedColumn()
  reservationId: number;

  @Column()
  checkInDate: Date;

  @Column()
  checkOutDate: Date;

  @Column({ type: 'enum', enum: Room })
  room: Room;

  @ManyToOne(() => UserEntity, (user) => user.reservations)
  user: UserEntity;

  @ManyToOne(() => HotelEntity, (hotel) => hotel.reservations)
  hotel: HotelEntity;

  @CreateDateColumn()
  createdAt: Date;
}
