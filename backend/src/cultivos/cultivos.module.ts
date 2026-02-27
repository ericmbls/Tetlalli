import { Module } from '@nestjs/common';
import { CultivosController } from './cultivos.controller';
import { CultivosService } from './cultivos.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [CultivosController],
  providers: [CultivosService, PrismaService],
<<<<<<< HEAD
=======
  exports: [CultivosService], 
>>>>>>> 743b11d50e10de0d8abcac4b1ae09b420b60a52e
})
export class CultivosModule {}