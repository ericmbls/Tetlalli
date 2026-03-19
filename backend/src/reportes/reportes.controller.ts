import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UploadedFile,
  UseInterceptors,
  Res,
} from "@nestjs/common";

import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import type { Express, Response } from "express";
import { ReportesService } from "./reportes.service";
import { CreateReporteDto } from "./dto/create-reporte.dto";
import { UpdateReporteDto } from "./dto/update-reporte.dto";

@Controller("reportes")
export class ReportesController {
  constructor(private readonly reportesService: ReportesService) { }

  @Post()
  @UseInterceptors(
    FileInterceptor("imagen", {
      storage: diskStorage({
        destination: "./uploads",
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  async create(
    @Body() dto: CreateReporteDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    const imagen = file ? `/uploads/${file.filename}` : null;
    return this.reportesService.create(dto, imagen);
  }

  @Get("cultivo/:id")
  findByCultivo(@Param("id", ParseIntPipe) cultivoId: number) {
    return this.reportesService.findByCultivo(cultivoId);
  }

  @Get("list")
  findAll() {
    return this.reportesService.findAll();
  }

  @Get("kpis")
  getKpis() {
    return this.reportesService.getKpis();
  }

  @Get("chart")
  getChart() {
    return this.reportesService.getChart();
  }

  @Post("generar")
  generarReporte() {
    return this.reportesService.generarReporte();
  }

  @Get(":id/descargar")
  async descargarReporte(
    @Param("id", ParseIntPipe) id: number,
    @Res() res: Response
  ) {
    try {
      const fileBuffer = await this.reportesService.generarPdf(id);

      res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=reporte-${id}.pdf`,
      });

      res.send(fileBuffer);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al generar o descargar el reporte");
    }
  }

  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateReporteDto) {
    return this.reportesService.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.reportesService.remove(id);
  }
}