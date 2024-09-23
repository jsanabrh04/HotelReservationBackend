import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/createUser.dto';
import { UpdateUserDto } from '../dtos/updateUser.dto';
import * as bcrypt from 'bcrypt';
import { UserResponseDto } from '../dtos/responseUser.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { userId, email } = createUserDto;

    // Verificar si el ID ya existe
    const existingUserById = await this.userRepository.findOne({
      where: { userId },
    });
    if (existingUserById) {
      throw new ConflictException('El ID ya está en uso');
    }

    // Verificar si el correo electrónico ya está en uso
    const existingUserByEmail = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUserByEmail) {
      throw new ConflictException('El correo electrónico ya está en uso');
    }

    const { password, ...rest } = createUserDto;

    // Encriptar la contraseña antes de guardarla
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUsuario = this.userRepository.create({
      ...rest,
      password: hashedPassword, // Guardamos la contraseña encriptada
    });

    return this.userRepository.save(newUsuario);
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.find();
    return users.map((user) => plainToClass(UserResponseDto, user));
  }

  async updateUser(userId: number, updateUser: UpdateUserDto): Promise<any> {
    const user = await this.userRepository.findOne({ where: { userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.update(userId, updateUser);

    const updateUserData = await this.userRepository.findOne({
      where: { userId },
    });

    return await updateUserData;
  }

  async findOne(userId: number): Promise<UserResponseDto> {
    const user = await this.userRepository.findOneBy({ userId });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return plainToClass(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { email } });
  }
}
