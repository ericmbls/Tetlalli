import { CultivosService } from './cultivos.service';
import { CreateCultivoDto } from './dto/create-cultivo.dto';
import { UpdateCultivoDto } from './dto/update-cultivo.dto';
export declare class CultivosController {
    private readonly cultivosService;
    constructor(cultivosService: CultivosService);
    findAll(): Promise<{
        id: number;
        createdAt: Date;
        nombre: string;
        descripcion: string | null;
        fechaSiembra: Date;
        ubicacion: string;
        frecuenciaRiego: number;
        estado: import("@prisma/client").$Enums.EstadoCultivo;
        userId: number;
        imagen: string | null;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        createdAt: Date;
        nombre: string;
        descripcion: string | null;
        fechaSiembra: Date;
        ubicacion: string;
        frecuenciaRiego: number;
        estado: import("@prisma/client").$Enums.EstadoCultivo;
        userId: number;
        imagen: string | null;
    }>;
    create(createCultivoDto: CreateCultivoDto, file: Express.Multer.File): Promise<{
        id: number;
        createdAt: Date;
        nombre: string;
        descripcion: string | null;
        fechaSiembra: Date;
        ubicacion: string;
        frecuenciaRiego: number;
        estado: import("@prisma/client").$Enums.EstadoCultivo;
        userId: number;
        imagen: string | null;
    }>;
    update(id: string, file: Express.Multer.File, updateCultivoDto: UpdateCultivoDto): Promise<{
        id: number;
        createdAt: Date;
        nombre: string;
        descripcion: string | null;
        fechaSiembra: Date;
        ubicacion: string;
        frecuenciaRiego: number;
        estado: import("@prisma/client").$Enums.EstadoCultivo;
        userId: number;
        imagen: string | null;
    }>;
    remove(id: string): Promise<{
        id: number;
        createdAt: Date;
        nombre: string;
        descripcion: string | null;
        fechaSiembra: Date;
        ubicacion: string;
        frecuenciaRiego: number;
        estado: import("@prisma/client").$Enums.EstadoCultivo;
        userId: number;
        imagen: string | null;
    }>;
}
