import { ApiProperty } from '@nestjs/swagger';

export class DashboardDto {
  @ApiProperty({ type: [Object] })
  kpis: any[];

  @ApiProperty({ type: [Object] })
  pronostico: any[];

  @ApiProperty({ type: [Object] })
  zonasCultivo: any[];

  @ApiProperty({ type: [Object] })
  heatmapZones: any[];
}