-- DropIndex
DROP INDEX "Professor_matricula_key";

-- AlterTable
ALTER TABLE "Professor" ALTER COLUMN "matricula" DROP NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT now(),
ALTER COLUMN "updated_at" SET DEFAULT now();
