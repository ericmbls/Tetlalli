<<<<<<< HEAD
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CultivosService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.cultivo.findMany();
  }

  async create(data: any) {
    return this.prisma.cultivo.create({ data });
  }

  async update(id: number, data: any) {
=======
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
      where: { id },
    });

    if (!cultivo) {
      throw new NotFoundException(`Cultivo con id ${id} no encontrado`);
    }

    return cultivo;
  }

  async create(data: CreateCultivoDto) {
    return this.prisma.cultivo.create({
      data,
    });
  }

  async update(id: number, data: UpdateCultivoDto) {
    await this.findOne(id); 

>>>>>>> 743b11d50e10de0d8abcac4b1ae09b420b60a52e
    return this.prisma.cultivo.update({
      where: { id },
      data,
    });
  }
<<<<<<< HEAD
=======

  async delete(id: number) {
    await this.findOne(id); 

    return this.prisma.cultivo.delete({
      where: { id },
    });
  }
>>>>>>> 743b11d50e10de0d8abcac4b1ae09b420b60a52e
}