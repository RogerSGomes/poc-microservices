-- CreateTable
CREATE TABLE "Professor" (
    "professor_id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "senha" VARCHAR(255) NOT NULL,
    "matricula" TEXT NOT NULL,
    "instituicao" TEXT,
    "unidade" TEXT,
    "departamento" TEXT,
    "titulacao" VARCHAR(255),
    "situacao" VARCHAR(255),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT now(),

    CONSTRAINT "Professor_pkey" PRIMARY KEY ("professor_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Professor_email_key" ON "Professor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Professor_matricula_key" ON "Professor"("matricula");
