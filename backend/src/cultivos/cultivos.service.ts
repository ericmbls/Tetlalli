import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCultivoDto } from './dto/create-cultivo.dto';
import { UpdateCultivoDto } from './dto/update-cultivo.dto';

@Injectable()
export class CultivosService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.cultivo.findMany();
  }

  async findOne(id: number) {
    const cultivo = await this.prisma.cultivo.findUnique({
      where: { id: Number(id) },
    });

    if (!cultivo) {
      throw new NotFoundException(`Cultivo con id ${id} no encontrado`);
    }

    return cultivo;
  }

  async create(data: CreateCultivoDto & { imagen?: string }) {
    return this.prisma.cultivo.create({ data });
  }

  async update(id: number, data: UpdateCultivoDto & { imagen?: string }) {
    await this.findOne(id);

    return this.prisma.cultivo.update({
      where: { id: Number(id) },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.cultivo.delete({
      where: { id: Number(id) },
    });
  }
}