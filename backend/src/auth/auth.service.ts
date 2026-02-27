<<<<<<< HEAD
import { Injectable, UnauthorizedException } from '@nestjs/common';
=======
import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
>>>>>>> 743b11d50e10de0d8abcac4b1ae09b420b60a52e
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';
<<<<<<< HEAD
=======
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
>>>>>>> 743b11d50e10de0d8abcac4b1ae09b420b60a52e

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

<<<<<<< HEAD
  async register(body: any) {
    const { name, email, password } = body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const exists = await this.prisma.user.findUnique({ where: { email } });
    if (exists) throw new UnauthorizedException('El correo ya está registrado');

    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: Role.user,
      },
    });

    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);
=======
  private generateToken(user: any) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return this.jwtService.sign(payload, { expiresIn: '1h' });
  }

  async register(dto: RegisterDto) {
    const exists = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (exists) throw new ConflictException('El correo ya está registrado');

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
        role: Role.user,
        darkMode: false, // valor inicial
      },
    });

    const token = this.generateToken(user);
>>>>>>> 743b11d50e10de0d8abcac4b1ae09b420b60a52e

    return {
      message: 'Usuario registrado exitosamente',
      access_token: token,
<<<<<<< HEAD
      user: { id: user.id, email: user.email, role: user.role },
    };
  }

  async login(body: any) {
    const { email, password } = body;
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Usuario no encontrado');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new UnauthorizedException('Contraseña incorrecta');

    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);
=======
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        darkMode: user.darkMode,
      },
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException('Usuario no encontrado');

    const isValid = await bcrypt.compare(dto.password, user.password);
    if (!isValid) throw new UnauthorizedException('Contraseña incorrecta');

    const token = this.generateToken(user);
>>>>>>> 743b11d50e10de0d8abcac4b1ae09b420b60a52e

    return {
      message: 'Login exitoso',
      access_token: token,
<<<<<<< HEAD
      user: { id: user.id, email: user.email, role: user.role },
=======
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        darkMode: user.darkMode,
      },
>>>>>>> 743b11d50e10de0d8abcac4b1ae09b420b60a52e
    };
  }
}