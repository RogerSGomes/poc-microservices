-- AlterTable
ALTER TABLE "CondicoesCustosOferecimento" ALTER COLUMN "created_at" SET DEFAULT now(),
ALTER COLUMN "updated_at" SET DEFAULT now();

-- AlterTable
ALTER TABLE "Curso" ALTER COLUMN "oferecimento_id" DROP NOT NULL,
ALTER COLUMN "curso_status" SET DEFAULT 'Pendente',
ALTER COLUMN "diretor" DROP NOT NULL,
ALTER COLUMN "coordenador" DROP NOT NULL,
ALTER COLUMN "docente_responsavel" DROP NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT now(),
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
ALTER TABLE "TaxasCustosOferecimento" ALTER COLUMN "created_at" SET DEFAULT now(),
ALTER COLUMN "updated_at" SET DEFAULT now();
