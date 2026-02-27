<<<<<<< HEAD
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CultivosModule } from './cultivos/cultivos.module';

@Module({
  imports: [AuthModule, CultivosModule],
})
export class AppModule {}
=======
// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module'; 
import { CultivosModule } from './cultivos/cultivos.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    AuthModule,
    UsuariosModule,
    CultivosModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
>>>>>>> 743b11d50e10de0d8abcac4b1ae09b420b60a52e
