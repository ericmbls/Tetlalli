-- CreateEnum
CREATE TYPE "TipoReporte" AS ENUM ('RIEGO', 'FERTILIZACION', 'PLAGA', 'COSECHA', 'OBSERVACION');

-- CreateTable
CREATE TABLE "Reporte" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "tipo" "TipoReporte" NOT NULL,
    "imagen" TEXT,
    "cultivoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reporte_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reporte" ADD CONSTRAINT "Reporte_cultivoId_fkey" FOREIGN KEY ("cultivoId") REFERENCES "Cultivo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
