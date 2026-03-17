import { TipoReporte } from "@prisma/client";

export class UpdateReporteDto {
  titulo?: string;
  descripcion?: string;
  tipo?: TipoReporte;
}