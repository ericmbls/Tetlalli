import { CreateCultivoDto } from './create-cultivo.dto';
import { EstadoCultivo } from '@prisma/client';
declare const UpdateCultivoDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateCultivoDto>>;
export declare class UpdateCultivoDto extends UpdateCultivoDto_base {
    estado?: EstadoCultivo;
    imagen?: string;
    fechaSiembra?: string;
}
export {};
