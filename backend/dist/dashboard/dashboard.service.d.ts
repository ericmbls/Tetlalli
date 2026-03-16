import { PrismaService } from '../prisma/prisma.service';
export declare class DashboardService {
    private prisma;
    constructor(prisma: PrismaService);
    getDashboard(userId: number): Promise<{
        kpis: {
            title: string;
            value: number;
            sub: string;
            icon: string;
            status: string;
        }[];
        pronostico: any[];
        zonasCultivo: {
            id: number;
            nombre: string;
            ubicacion: string;
            frecuenciaRiego: number;
            estado: import("@prisma/client").$Enums.EstadoCultivo;
            imagen: string | null;
        }[];
        heatmapZones: {
            id: number;
            status: string;
        }[];
    }>;
}
