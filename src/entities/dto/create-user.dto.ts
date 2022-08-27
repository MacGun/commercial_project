import { ValidateNested } from '@nestjs/class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { UserEntity } from '@root/entities/user.entity';
import { Type } from 'class-transformer';

export class CreateUserDto extends PickType(UserEntity, ['email', 'name', 'birth', 'password', 'gender', 'phone'] as const) {}
