import { EstadoCultivo } from '@prisma/client';
export declare class CreateCultivoDto {
    nombre: string;
    descripcion?: string;
    fechaSiembra: string;
    ubicacion: string;
    frecuenciaRiego: number;
    estado?: EstadoCultivo;
    userId: number;
    imagen?: string;
}
