import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EstadoCultivo } from '@prisma/client';
import axios from 'axios';

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

    const apiKey = process.env.OPENWEATHER_API_KEY;
    const location = 'Huamantla,mx';
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric&lang=es`;

    const forecastRes = await axios.get(url);
    const forecastData = forecastRes.data.list;

    const pronostico: any[] = [];
    const diasVistos = new Set();

    for (const item of forecastData) {
      const fecha = new Date(item.dt * 1000);
      const dayName = fecha.toLocaleDateString('es-MX', { weekday: 'short' });

      if (!diasVistos.has(dayName)) {
        diasVistos.add(dayName);

        let icon = 'sun';
        if (item.weather[0].main === 'Clouds') icon = 'cloudSun';
        if (item.weather[0].main === 'Rain') icon = 'cloudRain';

        pronostico.push({
          id: pronostico.length + 1,
          day: dayName,
          icon,
          temp: `${Math.round(item.main.temp)}°C`,
        });
      }
    }

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