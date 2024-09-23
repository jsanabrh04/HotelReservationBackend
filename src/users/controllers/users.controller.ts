import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../dtos/createUser.dto';
import { UserEntity } from '../entities/users.entity';
import { UpdateUserDto } from '../dtos/updateUser.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('createUser')
  async createUser(@Body() createUser: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(createUser);
  }

  @Get('/findAllUsers')
  async findAllUser() {
    return this.userService.findAll();
  }

  @Patch('/updateUser/:userId')
  async updateUser(
    @Param('userId') userId: number,
    @Body() updateUser: UpdateUserDto,
  ) {
    return this.userService.updateUser(userId, updateUser);
  }

  @Get('/findOne/:userId')
  async findOne(@Param('userId') userId: number) {
    return await this.userService.findOne(userId);
  }
}
