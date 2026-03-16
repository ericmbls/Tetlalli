"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
const axios_1 = __importDefault(require("axios"));
let DashboardService = class DashboardService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getDashboard(userId) {
        const totalCultivos = await this.prisma.cultivo.count({ where: { userId } });
        const activos = await this.prisma.cultivo.count({ where: { userId, estado: client_1.EstadoCultivo.activo } });
        const inactivos = await this.prisma.cultivo.count({ where: { userId, estado: client_1.EstadoCultivo.inactivo } });
        const cosechados = await this.prisma.cultivo.count({ where: { userId, estado: client_1.EstadoCultivo.cosechado } });
        const kpis = [
            { title: 'Total de cultivos', value: totalCultivos, sub: '+2 este mes', icon: 'sprout', status: 'neutral' },
            { title: 'Activos', value: activos, sub: 'En producción', icon: 'activity', status: 'success' },
            { title: 'Inactivos', value: inactivos, sub: 'Fuera de ciclo', icon: 'alertCircle', status: 'danger' },
            { title: 'Cosechados', value: cosechados, sub: 'Finalizados', icon: 'download', status: 'neutral' },
        ];
        const apiKey = process.env.OPENWEATHER_API_KEY;
        const location = 'Huamantla,mx';
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric&lang=es`;
        const forecastRes = await axios_1.default.get(url);
        const forecastData = forecastRes.data.list;
        const pronostico = [];
        const diasVistos = new Set();
        for (const item of forecastData) {
            const fecha = new Date(item.dt * 1000);
            const dayName = fecha.toLocaleDateString('es-MX', { weekday: 'short' });
            if (!diasVistos.has(dayName)) {
                diasVistos.add(dayName);
                let icon = 'sun';
                if (item.weather[0].main === 'Clouds')
                    icon = 'cloudSun';
                if (item.weather[0].main === 'Rain')
                    icon = 'cloudRain';
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
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map