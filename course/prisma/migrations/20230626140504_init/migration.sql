-- CreateTable
CREATE TABLE "Curso" (
    "curso_id" TEXT NOT NULL,
    "professor_id" TEXT NOT NULL,
    "alunos" JSONB[],
    "nome" TEXT NOT NULL,
    "duracao" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT now(),

    CONSTRAINT "Curso_pkey" PRIMARY KEY ("curso_id")
);
