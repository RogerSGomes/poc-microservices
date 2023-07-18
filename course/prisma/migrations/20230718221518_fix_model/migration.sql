/*
  Warnings:

  - You are about to drop the column `fundo_extencao_porcentagem` on the `TaxasCustosOferecimento` table. All the data in the column will be lost.
  - You are about to drop the column `fundo_extencao_unidade` on the `TaxasCustosOferecimento` table. All the data in the column will be lost.
  - You are about to drop the column `fundo_extencao_valor` on the `TaxasCustosOferecimento` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CondicoesCustosOferecimento" ALTER COLUMN "created_at" SET DEFAULT now(),
ALTER COLUMN "updated_at" SET DEFAULT now();

-- AlterTable
ALTER TABLE "Curso" ALTER COLUMN "created_at" SET DEFAULT now(),
ALTER COLUMN "updated_at" SET DEFAULT now();

-- AlterTable
ALTER TABLE "CustosOferecimento" ALTER COLUMN "created_at" SET DEFAULT now(),
ALTER COLUMN "updated_at" SET DEFAULT now();

-- AlterTable
ALTER TABLE "Inscricao" ALTER COLUMN "created_at" SET DEFAULT now(),
ALTER COLUMN "updated_at" SET DEFAULT now();

-- AlterTable
ALTER TABLE "Oferecimento" ALTER COLUMN "created_at" SET DEFAULT now(),
ALTER COLUMN "updated_at" SET DEFAULT now();

-- AlterTable
ALTER TABLE "TaxasCustosOferecimento" DROP COLUMN "fundo_extencao_porcentagem",
DROP COLUMN "fundo_extencao_unidade",
DROP COLUMN "fundo_extencao_valor",
ADD COLUMN     "fundo_extensao_porcentagem" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "fundo_extensao_unidade" TEXT,
ADD COLUMN     "fundo_extensao_valor" DOUBLE PRECISION DEFAULT 0,
ALTER COLUMN "created_at" SET DEFAULT now(),
ALTER COLUMN "updated_at" SET DEFAULT now();
