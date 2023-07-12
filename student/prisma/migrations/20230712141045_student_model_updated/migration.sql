/*
  Warnings:

  - You are about to drop the column `cidade_origem` on the `Aluno` table. All the data in the column will be lost.
  - You are about to drop the column `endereco_bairro` on the `Aluno` table. All the data in the column will be lost.
  - You are about to drop the column `endereco_cep` on the `Aluno` table. All the data in the column will be lost.
  - You are about to drop the column `endereco_cidade` on the `Aluno` table. All the data in the column will be lost.
  - You are about to drop the column `endereco_complemento` on the `Aluno` table. All the data in the column will be lost.
  - You are about to drop the column `endereco_estado` on the `Aluno` table. All the data in the column will be lost.
  - You are about to drop the column `endereco_numero` on the `Aluno` table. All the data in the column will be lost.
  - You are about to drop the column `endereco_rua` on the `Aluno` table. All the data in the column will be lost.
  - You are about to drop the column `estado_origem` on the `Aluno` table. All the data in the column will be lost.
  - You are about to drop the column `pais_origem` on the `Aluno` table. All the data in the column will be lost.
  - You are about to drop the column `pais_residencia` on the `Aluno` table. All the data in the column will be lost.
  - You are about to drop the column `rg_numero` on the `Aluno` table. All the data in the column will be lost.
  - You are about to drop the column `rg_orgao_emissor` on the `Aluno` table. All the data in the column will be lost.
  - You are about to drop the column `rg_uf_emissao` on the `Aluno` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Aluno_rg_numero_key";

-- AlterTable
ALTER TABLE "Aluno" DROP COLUMN "cidade_origem",
DROP COLUMN "endereco_bairro",
DROP COLUMN "endereco_cep",
DROP COLUMN "endereco_cidade",
DROP COLUMN "endereco_complemento",
DROP COLUMN "endereco_estado",
DROP COLUMN "endereco_numero",
DROP COLUMN "endereco_rua",
DROP COLUMN "estado_origem",
DROP COLUMN "pais_origem",
DROP COLUMN "pais_residencia",
DROP COLUMN "rg_numero",
DROP COLUMN "rg_orgao_emissor",
DROP COLUMN "rg_uf_emissao",
ADD COLUMN     "documento_identificacao" JSONB,
ADD COLUMN     "endereco" JSONB,
ADD COLUMN     "naturalidade" JSONB,
ALTER COLUMN "created_at" SET DEFAULT now(),
ALTER COLUMN "updated_at" SET DEFAULT now();
