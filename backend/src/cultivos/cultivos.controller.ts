<<<<<<< HEAD
import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';import { CultivosService } from './cultivos.service';
=======
import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';
import { CultivosService } from './cultivos.service';
import { CreateCultivoDto } from './dto/create-cultivo.dto';
import { UpdateCultivoDto } from './dto/update-cultivo.dto';
>>>>>>> 743b11d50e10de0d8abcac4b1ae09b420b60a52e

@Controller('cultivos')
export class CultivosController {
  constructor(private readonly cultivosService: CultivosService) {}

  @Get()
  findAll() {
    return this.cultivosService.findAll();
  }

  @Post()
<<<<<<< HEAD
  create(@Body() body: any) {
    return this.cultivosService.create(body);
=======
  create(@Body() createCultivoDto: CreateCultivoDto) {
    return this.cultivosService.create(createCultivoDto);
>>>>>>> 743b11d50e10de0d8abcac4b1ae09b420b60a52e
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
<<<<<<< HEAD
    @Body() body: any,
  ) {
    return this.cultivosService.update(Number(id), body);
=======
    @Body() updateCultivoDto: UpdateCultivoDto,
  ) {
    return this.cultivosService.update(Number(id), updateCultivoDto);
>>>>>>> 743b11d50e10de0d8abcac4b1ae09b420b60a52e
  }
}