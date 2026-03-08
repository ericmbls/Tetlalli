import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePreferencesDto } from '../auth/dto/update-preferences.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
  return this.prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      farmName: true,
      location: true,
      language: true
    }
  });
}

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }

    return user;
  }

  async create(dto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    return this.prisma.user.create({
      data: {
        ...dto,
        password: hashedPassword,
      },
    });
  }

  async update(id: number, dto: UpdateUserDto) {
    await this.findOne(id);

    let data: any = { ...dto };

    if (dto.password) {
      data.password = await bcrypt.hash(dto.password, 10);
    }

    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.user.delete({
      where: { id },
    });
  }

  async updatePreferences(userId: number, dto: UpdatePreferencesDto) {
    await this.findOne(userId);

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        ...dto,
      },
      select: {
        darkMode: true,
        language: true,
        farmName: true,
        location: true,
      },
    });
  }

  async getPreferences(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        darkMode: true,
        language: true,
        farmName: true,
        location: true,
      },
    });

    if (!user) {
      throw new NotFoundException(
        `Usuario con id ${userId} no encontrado`,
      );
    }

    return user;
  }
}