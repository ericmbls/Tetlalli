import { TipoReporte } from "@prisma/client";

export class CreateReporteDto {
  titulo: string;
  descripcion: string;
  tipo: TipoReporte;
  cultivoId: number;
}