-- CreateTable
CREATE TABLE "Aluno" (
    "aluno_id" TEXT NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "matricula" VARCHAR(10) NOT NULL,
    "senha" VARCHAR(255) NOT NULL,
    "documento_identificacao" JSONB,
    "cpf" VARCHAR(14),
    "data_nascimento" TIMESTAMP(3),
    "endereco" JSONB,
    "naturalidade" JSONB,
    "genero" TEXT,
    "estado_civil" TEXT,
    "possui_deficiencia" BOOLEAN,
    "tipo_deficiencia" VARCHAR(255),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT now(),

    CONSTRAINT "Aluno_pkey" PRIMARY KEY ("aluno_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_email_key" ON "Aluno"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_matricula_key" ON "Aluno"("matricula");

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_cpf_key" ON "Aluno"("cpf");
