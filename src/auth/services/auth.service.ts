import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
/* import { CreateUserDto } from 'src/users/dtos/createUser.dto';
import { UserEntity } from 'src/users/entities/users.entity'; */
import { UsersService } from 'src/users/services/users.service';
import { LoginDto } from '../dtos/loginAuth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // Usamos CreateUserDto aquí
  /*   async register(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { email, password, role } = createUserDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUsuario = await this.usersService.createUser({
      ...createUserDto,
      password: hashedPassword,
    });

    return newUsuario;
  } */

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.usersService.findByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { email: user.email, sub: user.userId, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
