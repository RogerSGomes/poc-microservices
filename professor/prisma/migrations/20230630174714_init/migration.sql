-- CreateTable
CREATE TABLE "Professor" (
    "professor_id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "senha" VARCHAR(255) NOT NULL,
    "matricula" VARCHAR(10) NOT NULL,
    "instituicao" TEXT NOT NULL,
    "unidade" TEXT NOT NULL,
    "departamento" TEXT NOT NULL,
    "titulacao" VARCHAR(255) NOT NULL,
    "situacao" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT now(),

    CONSTRAINT "Professor_pkey" PRIMARY KEY ("professor_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Professor_email_key" ON "Professor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Professor_matricula_key" ON "Professor"("matricula");
