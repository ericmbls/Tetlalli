import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateReporteDto } from "./dto/create-reporte.dto";
import { UpdateReporteDto } from "./dto/update-reporte.dto";
import PDFDocument from "pdfkit";

@Injectable()
export class ReportesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateReporteDto, imagen?: string | null) {
    return this.prisma.reporte.create({
      data: {
        titulo: dto.titulo,
        descripcion: dto.descripcion,
        tipo: dto.tipo,
        cultivoId: dto.cultivoId,
        imagen: imagen ?? null,
      },
    });
  }

  async findByCultivo(cultivoId: number) {
    return this.prisma.reporte.findMany({
      where: { cultivoId },
      orderBy: { createdAt: "desc" },
    });
  }

  async findAll() {
    const reportes = await this.prisma.reporte.findMany({
      orderBy: { createdAt: "desc" },
    });

    return reportes.map((r) => ({
      id: r.id,
      title: r.titulo,
      date: r.createdAt.toLocaleDateString(),
      type: r.tipo,
      size: "120 KB",
      status: "ready",
    }));
  }

  async getKpis() {
    const total = await this.prisma.reporte.count();
    const riego = await this.prisma.reporte.count({ where: { tipo: "RIEGO" } });
    const plaga = await this.prisma.reporte.count({ where: { tipo: "PLAGA" } });

    return [
      { title: "Reportes Totales", value: total, badge: "Total", sub: "Registros del sistema", icon: "📄" },
      { title: "Riegos Registrados", value: riego, badge: "Agua", sub: "Eventos de riego", icon: "💧" },
      { title: "Alertas de Plaga", value: plaga, badge: "Riesgo", sub: "Detecciones", icon: "🐛" },
    ];
  }

  async getChart() {
    return [
      { month: "Ene", fresa: 40, lechuga: 30, pimiento: 20, tomate: 50 },
      { month: "Feb", fresa: 60, lechuga: 20, pimiento: 30, tomate: 40 },
      { month: "Mar", fresa: 30, lechuga: 50, pimiento: 20, tomate: 60 },
      { month: "Abr", fresa: 70, lechuga: 40, pimiento: 35, tomate: 45 },
    ];
  }

  async generarReporte() {
    return { message: "Reporte generado correctamente" };
  }

  async generarPdf(id: number) {
    const reporte = await this.prisma.reporte.findUnique({ where: { id } });
    if (!reporte) throw new Error("Reporte no encontrado");

    const doc = new PDFDocument();
    const buffers: Buffer[] = [];

    doc.on("data", buffers.push.bind(buffers));

    doc.fontSize(20).text("Reporte de Cultivo", { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(`ID: ${reporte.id}`);
    doc.text(`Título: ${reporte.titulo}`);
    doc.text(`Descripción: ${reporte.descripcion}`);
    doc.text(`Tipo: ${reporte.tipo}`);
    doc.text(`Fecha: ${reporte.createdAt}`);

    doc.end();

    return new Promise<Buffer>((resolve) => {
      doc.on("end", () => {
        resolve(Buffer.concat(buffers));
      });
    });
  }

  async update(id: number, dto: UpdateReporteDto) {
    return this.prisma.reporte.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    return this.prisma.reporte.delete({ where: { id } });
  }
}