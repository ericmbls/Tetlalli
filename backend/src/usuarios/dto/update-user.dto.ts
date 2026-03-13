import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { Role } from '@prisma/client';

export class UpdateUserDto extends PartialType(CreateUserDto) {

  @IsOptional()
  @Transform(({ value }) => value?.toLowerCase())
  @IsEnum(Role)
  role?: Role;

  @IsString()
  @IsOptional()
  farmName?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  language?: string;
}