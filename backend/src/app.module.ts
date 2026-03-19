import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { CultivosModule } from './cultivos/cultivos.module';
<<<<<<< HEAD
=======
import { DashboardModule } from './dashboard/dashboard.module';
import { ReportesModule } from './reportes/reportes.module';
>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsuariosModule,
    CultivosModule,
<<<<<<< HEAD
=======
    DashboardModule,
    ReportesModule,
>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
  ],
})
export class AppModule {}