/*
  Warnings:

  - You are about to drop the column `fpag_fonte` on the `Oferecimento` table. All the data in the column will be lost.
  - You are about to drop the column `fpag_taxa_inscricao` on the `Oferecimento` table. All the data in the column will be lost.
  - You are about to drop the column `fpag_tipo` on the `Oferecimento` table. All the data in the column will be lost.
  - Added the required column `fpag_fonte` to the `CustosOferecimento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fpag_taxa_inscricao` to the `CustosOferecimento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fpag_tipo` to the `CustosOferecimento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CondicoesCustosOferecimento" ALTER COLUMN "created_at" SET DEFAULT now(),
ALTER COLUMN "updated_at" SET DEFAULT now();

-- AlterTable
ALTER TABLE "Curso" ALTER COLUMN "created_at" SET DEFAULT now(),
ALTER COLUMN "updated_at" SET DEFAULT now();

-- AlterTable
ALTER TABLE "CustosOferecimento" ADD COLUMN     "fpag_fonte" TEXT NOT NULL,
ADD COLUMN     "fpag_taxa_inscricao" TEXT NOT NULL,
ADD COLUMN     "fpag_tipo" TEXT NOT NULL,
ALTER COLUMN "assinatura_status" SET DEFAULT 'Pendente',
ALTER COLUMN "created_at" SET DEFAULT now(),
ALTER COLUMN "updated_at" SET DEFAULT now();

-- AlterTable
ALTER TABLE "Inscricao" ALTER COLUMN "telefone_informacoes" DROP NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT now(),
ALTER COLUMN "updated_at" SET DEFAULT now(),
ALTER COLUMN "modelo" SET DEFAULT 'Basico';

-- AlterTable
ALTER TABLE "Oferecimento" DROP COLUMN "fpag_fonte",
DROP COLUMN "fpag_taxa_inscricao",
DROP COLUMN "fpag_tipo",
ALTER COLUMN "assinatura_status" SET DEFAULT 'Pendente',
ALTER COLUMN "explicacao" DROP NOT NULL,
ALTER COLUMN "host" DROP NOT NULL,
ALTER COLUMN "pagina_facebook" DROP NOT NULL,
ALTER COLUMN "dias_semana_horarios" DROP NOT NULL,
ALTER COLUMN "data_inicio" DROP NOT NULL,
ALTER COLUMN "data_encerramento" DROP NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT now(),
ALTER COLUMN "updated_at" SET DEFAULT now();

-- AlterTable
ALTER TABLE "TaxasCustosOferecimento" ALTER COLUMN "created_at" SET DEFAULT now(),
ALTER COLUMN "updated_at" SET DEFAULT now();
