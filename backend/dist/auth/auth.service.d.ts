import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    private generateToken;
    register(dto: RegisterDto): Promise<{
        message: string;
        access_token: string;
        user: {
            id: number;
            email: string;
            role: import("@prisma/client").$Enums.Role;
            darkMode: boolean;
        };
    }>;
    login(dto: LoginDto): Promise<{
        message: string;
        access_token: string;
        user: {
            id: number;
            email: string;
            role: import("@prisma/client").$Enums.Role;
            darkMode: boolean;
        };
    }>;
}
