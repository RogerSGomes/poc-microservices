-- CreateTable
CREATE TABLE "Aluno" (
    "aluno_id" TEXT NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "matricula" VARCHAR(10) NOT NULL,
    "senha" VARCHAR(255) NOT NULL,
    "rg_numero" VARCHAR(12) NOT NULL,
    "rg_orgao_emissor" VARCHAR(50) NOT NULL,
    "rg_uf_emissao" VARCHAR(2) NOT NULL,
    "cpf" VARCHAR(14) NOT NULL,
    "endereco_rua" VARCHAR(255) NOT NULL,
    "endereco_numero" VARCHAR(10) NOT NULL,
    "endereco_complemento" VARCHAR(255),
    "endereco_bairro" VARCHAR(255) NOT NULL,
    "endereco_cidade" VARCHAR(255) NOT NULL,
    "endereco_estado" VARCHAR(2) NOT NULL,
    "endereco_cep" VARCHAR(9) NOT NULL,
    "pais_origem" VARCHAR(255) NOT NULL,
    "estado_origem" VARCHAR(255) NOT NULL,
    "cidade_origem" VARCHAR(255) NOT NULL,
    "genero" TEXT NOT NULL,
    "estado_civil" TEXT NOT NULL,
    "possui_deficiencia" BOOLEAN NOT NULL,
    "data_nascimento" TIMESTAMP(3) NOT NULL,
    "tipo_deficiencia" VARCHAR(255),
    "pais_residencia" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT now(),

    CONSTRAINT "Aluno_pkey" PRIMARY KEY ("aluno_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_email_key" ON "Aluno"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_matricula_key" ON "Aluno"("matricula");

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_rg_numero_key" ON "Aluno"("rg_numero");

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_cpf_key" ON "Aluno"("cpf");
