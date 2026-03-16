import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getDashboard(req: any): Promise<{
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
