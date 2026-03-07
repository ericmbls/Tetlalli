import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsDateString,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { EstadoCultivo } from '@prisma/client';

export class CreateCultivoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsDateString()
  @IsNotEmpty()
  fechaSiembra: string;

  @IsString()
  @IsNotEmpty()
  ubicacion: string;

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  frecuenciaRiego: number;

  @IsEnum(EstadoCultivo)
  @IsOptional()
  estado?: EstadoCultivo;

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsOptional()
  imagen?: string;
}