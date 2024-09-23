import { Exclude, Expose } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  userId: number;

  @Expose()
  email: string;

  @Expose()
  name: string;

  @Expose()
  role: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  createdAt: Date;

  @Exclude()
  password?: string;
}
