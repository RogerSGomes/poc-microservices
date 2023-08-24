/*
  Warnings:

  - A unique constraint covering the columns `[matricula]` on the table `Professor` will be added. If there are existing duplicate values, this will fail.
  - Made the column `matricula` on table `Professor` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Professor" ALTER COLUMN "matricula" SET NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT now(),
ALTER COLUMN "updated_at" SET DEFAULT now();

-- CreateIndex
CREATE UNIQUE INDEX "Professor_matricula_key" ON "Professor"("matricula");
