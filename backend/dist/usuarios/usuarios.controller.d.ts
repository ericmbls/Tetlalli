import { UsuariosService } from './usuarios.service';
import { UpdatePreferencesDto } from '../auth/dto/update-preferences.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsuariosController {
    private readonly usuariosService;
    constructor(usuariosService: UsuariosService);
    getPreferences(req: any): Promise<{
        darkMode: boolean;
        language: string | null;
        farmName: string | null;
        location: string | null;
    }>;
    updatePreferences(req: any, dto: UpdatePreferencesDto): Promise<{
        darkMode: boolean;
        language: string | null;
        farmName: string | null;
        location: string | null;
    }>;
    findAll(): Promise<{
        name: string;
        email: string;
        id: number;
        role: import("@prisma/client").$Enums.Role;
        language: string | null;
        farmName: string | null;
        location: string | null;
    }[]>;
    findOne(id: string): Promise<{
        name: string;
        email: string;
        password: string;
        id: number;
        role: import("@prisma/client").$Enums.Role;
        createdAt: Date;
        darkMode: boolean;
        language: string | null;
        farmName: string | null;
        location: string | null;
    }>;
    create(dto: CreateUserDto): Promise<{
        name: string;
        email: string;
        password: string;
        id: number;
        role: import("@prisma/client").$Enums.Role;
        createdAt: Date;
        darkMode: boolean;
        language: string | null;
        farmName: string | null;
        location: string | null;
    }>;
    update(id: string, dto: UpdateUserDto): Promise<{
        name: string;
        email: string;
        password: string;
        id: number;
        role: import("@prisma/client").$Enums.Role;
        createdAt: Date;
        darkMode: boolean;
        language: string | null;
        farmName: string | null;
        location: string | null;
    }>;
    remove(id: string): Promise<{
        name: string;
        email: string;
        password: string;
        id: number;
        role: import("@prisma/client").$Enums.Role;
        createdAt: Date;
        darkMode: boolean;
        language: string | null;
        farmName: string | null;
        location: string | null;
    }>;
}
