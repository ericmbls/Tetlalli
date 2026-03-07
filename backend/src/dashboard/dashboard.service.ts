import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EstadoCultivo } from '@prisma/client';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getDashboard(userId: number) {
    const totalCultivos = await this.prisma.cultivo.count({ where: { userId } });
    const activos = await this.prisma.cultivo.count({ where: { userId, estado: EstadoCultivo.activo } });
    const inactivos = await this.prisma.cultivo.count({ where: { userId, estado: EstadoCultivo.inactivo } });
    const cosechados = await this.prisma.cultivo.count({ where: { userId, estado: EstadoCultivo.cosechado } });

    const kpis = [
      { title: 'Total de cultivos', value: totalCultivos, sub: '+2 este mes', icon: 'sprout', status: 'neutral' },
      { title: 'Activos', value: activos, sub: 'En producción', icon: 'activity', status: 'success' },
      { title: 'Inactivos', value: inactivos, sub: 'Fuera de ciclo', icon: 'alertCircle', status: 'danger' },
      { title: 'Cosechados', value: cosechados, sub: 'Finalizados', icon: 'download', status: 'neutral' },
    ];

    const pronostico = [
      { id: 1, day: 'Lun', icon: 'sun', temp: '24°' },
      { id: 2, day: 'Mar', icon: 'cloudSun', temp: '22°' },
      { id: 3, day: 'Mié', icon: 'cloudRain', temp: '20°' },
    ];

    const zonasCultivo = await this.prisma.cultivo.findMany({
      where: { userId },
      select: {
        id: true,
        nombre: true,
        ubicacion: true,
        estado: true,
        frecuenciaRiego: true,
        imagen: true,
      },
    });

    const heatmapZones = Array.from({ length: 16 }, (_, i) => ({
      id: i + 1,
      status: [6, 12].includes(i + 1) ? 'alert' : 'ok',
    }));

    return { kpis, pronostico, zonasCultivo, heatmapZones };
  }
}