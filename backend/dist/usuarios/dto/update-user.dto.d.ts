import { CreateUserDto } from './create-user.dto';
import { Role } from '@prisma/client';
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    role?: Role;
    farmName?: string;
    location?: string;
    language?: string;
}
export {};
