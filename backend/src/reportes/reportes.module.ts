import { Module } from '@nestjs/common';
import { ReportesController } from './reportes.controller';
import { ReportesService } from './reportes.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ReportesController],
  providers: [ReportesService, PrismaService],
  exports: [ReportesService]
})
export class ReportesModule {}