import { IsString, IsNotEmpty, IsEnum, IsNumber, IsOptional } from "class-validator";
import { TipoReporte } from "@prisma/client";
import { Type } from "class-transformer";

export class CreateReporteDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsNotEmpty()
  @IsEnum(TipoReporte)
  tipo: TipoReporte;

  @IsNumber()
  @Type(() => Number)
  cultivoId: number;

  @IsOptional()
  @IsString()
  fecha?: string;
}