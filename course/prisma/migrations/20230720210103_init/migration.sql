-- CreateEnum
CREATE TYPE "CursoStatus" AS ENUM ('Incompleta', 'Pendente', 'Andamento');

-- CreateEnum
CREATE TYPE "InscricaoModelo" AS ENUM ('Basico', 'Completo');

-- CreateEnum
CREATE TYPE "AssinaturaStatus" AS ENUM ('Pendente', 'Assinado');

-- CreateTable
CREATE TABLE "Curso" (
    "curso_id" TEXT NOT NULL,
    "curso_status" "CursoStatus" NOT NULL DEFAULT 'Incompleta',
    "sigla" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "fluxo_continuo" BOOLEAN NOT NULL,
    "disciplina_eletiva" BOOLEAN NOT NULL,
    "forma_realizacao" TEXT NOT NULL,
    "plataforma" TEXT NOT NULL,
    "mensagem" TEXT,
    "descricao" VARCHAR(10000) NOT NULL,
    "unidade" TEXT NOT NULL,
    "departamento" TEXT NOT NULL,
    "palavras_chave" TEXT[],
    "area_geral" TEXT NOT NULL,
    "areas_tematicas" TEXT[],
    "carga_horaria_presencial_pratica" TEXT,
    "carga_horaria_presencial_teorica" TEXT,
    "carga_horaria_ead_pratica" TEXT,
    "carga_horaria_ead_teorica" TEXT,
    "ementa" VARCHAR(1500),
    "bibliografia" VARCHAR(10000) NOT NULL,
    "procedimentos" VARCHAR(10000) NOT NULL,
    "objetivo" VARCHAR(1000) NOT NULL,
    "publico_alvo" VARCHAR(1000) NOT NULL,
    "frequencia_minima" DOUBLE PRECISION NOT NULL,
    "nota_minima" DOUBLE PRECISION NOT NULL,
    "grau_escolaridade" TEXT NOT NULL,
    "divulgacao_corporativa" BOOLEAN NOT NULL,
    "diretor" TEXT,
    "coordenador" TEXT,
    "docente_responsavel" JSONB,
    "docentes_unicamp" JSONB[],
    "docentes_vinculo" JSONB[],
    "docentes_sem_vinculo" JSONB[],
    "palestrantes" JSONB[],
    "alunos" JSONB[],
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT now(),

    CONSTRAINT "Curso_pkey" PRIMARY KEY ("curso_id")
);

-- CreateTable
CREATE TABLE "Oferecimento" (
    "oferecimento_id" TEXT NOT NULL,
    "curso_id" TEXT NOT NULL,
    "assinatura_status" "AssinaturaStatus" NOT NULL DEFAULT 'Pendente',
    "divulgar_extecamp" BOOLEAN NOT NULL,
    "explicacao" VARCHAR(200),
    "host" TEXT,
    "pagina_facebook" TEXT,
    "local" TEXT NOT NULL,
    "uf" CHAR(2) NOT NULL,
    "cidade" TEXT NOT NULL,
    "dias_semana_horarios" TEXT,
    "data_inicio" TIMESTAMP(3),
    "data_encerramento" TIMESTAMP(3),
    "min_vagas" INTEGER NOT NULL,
    "max_vagas" INTEGER NOT NULL,
    "tem_criterios" BOOLEAN NOT NULL,
    "parametros" JSONB[],
    "documentos_extras" JSONB[],
    "curso_parceria" JSONB[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT now(),

    CONSTRAINT "Oferecimento_pkey" PRIMARY KEY ("oferecimento_id")
);

-- CreateTable
CREATE TABLE "Inscricao" (
    "inscricao_id" TEXT NOT NULL,
    "oferecimento_id" TEXT NOT NULL,
    "local" TEXT NOT NULL,
    "telefone_secretaria" TEXT NOT NULL,
    "telefone_informacoes" TEXT,
    "data_abertura" TIMESTAMP(3) NOT NULL,
    "data_encerramento" TIMESTAMP(3) NOT NULL,
    "modelo" "InscricaoModelo" NOT NULL DEFAULT 'Basico',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT now(),

    CONSTRAINT "Inscricao_pkey" PRIMARY KEY ("inscricao_id")
);

-- CreateTable
CREATE TABLE "CustosOferecimento" (
    "custos_oferecimento_id" TEXT NOT NULL,
    "oferecimento_id" TEXT NOT NULL,
    "assinatura_status" "AssinaturaStatus" NOT NULL DEFAULT 'Pendente',
    "fluxo_continuo" BOOLEAN NOT NULL,
    "professores_hora_aula" DOUBLE PRECISION DEFAULT 0,
    "professores_outras_atividades" DOUBLE PRECISION DEFAULT 0,
    "material_consumo" DOUBLE PRECISION DEFAULT 0,
    "material_permanente" DOUBLE PRECISION DEFAULT 0,
    "servico_terceiros" DOUBLE PRECISION DEFAULT 0,
    "outros_custos" DOUBLE PRECISION DEFAULT 0,
    "aproveitamento_recursos" DOUBLE PRECISION DEFAULT 0,
    "total" DOUBLE PRECISION DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT now(),

    CONSTRAINT "CustosOferecimento_pkey" PRIMARY KEY ("custos_oferecimento_id")
);

-- CreateTable
CREATE TABLE "CondicoesCustosOferecimento" (
    "condicoes_custos_oferecimento_id" TEXT NOT NULL,
    "custos_oferecimento_id" TEXT NOT NULL,
    "forma_pagamento" JSONB NOT NULL,
    "curso_gratuito" BOOLEAN NOT NULL,
    "valor_a_vista" DOUBLE PRECISION DEFAULT 0,
    "valor_a_vista_vencimento" TIMESTAMP(3),
    "parcelas_boleto" JSONB[],
    "parcelas_cartao_credito" INTEGER DEFAULT 0,
    "porcentagem_desconto_estudantes" DOUBLE PRECISION DEFAULT 0,
    "opcao_desconto" JSONB[],
    "convenio" JSONB,
    "recurso" JSONB,
    "empresa" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT now(),

    CONSTRAINT "CondicoesCustosOferecimento_pkey" PRIMARY KEY ("condicoes_custos_oferecimento_id")
);

-- CreateTable
CREATE TABLE "TaxasCustosOferecimento" (
    "taxas_custos_oferecimento_id" TEXT NOT NULL,
    "custos_oferecimento_id" TEXT NOT NULL,
    "fixas" DOUBLE PRECISION DEFAULT 0,
    "aiu_unidade_porcentagem" DOUBLE PRECISION DEFAULT 0,
    "aiu_unidade_valor" DOUBLE PRECISION DEFAULT 0,
    "fundo_extensao_unidade" TEXT,
    "fundo_extensao_porcentagem" DOUBLE PRECISION DEFAULT 0,
    "fundo_extensao_valor" DOUBLE PRECISION DEFAULT 0,
    "total" DOUBLE PRECISION DEFAULT 0,
    "subsidios" DOUBLE PRECISION DEFAULT 0,
    "custo_total" DOUBLE PRECISION DEFAULT 0,
    "custo_aluno_min_vagas" DOUBLE PRECISION DEFAULT 0,
    "custo_aluno_valor" DOUBLE PRECISION DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT now(),

    CONSTRAINT "TaxasCustosOferecimento_pkey" PRIMARY KEY ("taxas_custos_oferecimento_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Oferecimento_curso_id_key" ON "Oferecimento"("curso_id");

-- CreateIndex
CREATE UNIQUE INDEX "Inscricao_oferecimento_id_key" ON "Inscricao"("oferecimento_id");

-- CreateIndex
CREATE UNIQUE INDEX "CustosOferecimento_oferecimento_id_key" ON "CustosOferecimento"("oferecimento_id");

-- CreateIndex
CREATE UNIQUE INDEX "CondicoesCustosOferecimento_custos_oferecimento_id_key" ON "CondicoesCustosOferecimento"("custos_oferecimento_id");

-- CreateIndex
CREATE UNIQUE INDEX "TaxasCustosOferecimento_custos_oferecimento_id_key" ON "TaxasCustosOferecimento"("custos_oferecimento_id");

-- AddForeignKey
ALTER TABLE "Oferecimento" ADD CONSTRAINT "Oferecimento_curso_id_fkey" FOREIGN KEY ("curso_id") REFERENCES "Curso"("curso_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscricao" ADD CONSTRAINT "Inscricao_oferecimento_id_fkey" FOREIGN KEY ("oferecimento_id") REFERENCES "Oferecimento"("oferecimento_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustosOferecimento" ADD CONSTRAINT "CustosOferecimento_oferecimento_id_fkey" FOREIGN KEY ("oferecimento_id") REFERENCES "Oferecimento"("oferecimento_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CondicoesCustosOferecimento" ADD CONSTRAINT "CondicoesCustosOferecimento_custos_oferecimento_id_fkey" FOREIGN KEY ("custos_oferecimento_id") REFERENCES "CustosOferecimento"("custos_oferecimento_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaxasCustosOferecimento" ADD CONSTRAINT "TaxasCustosOferecimento_custos_oferecimento_id_fkey" FOREIGN KEY ("custos_oferecimento_id") REFERENCES "CustosOferecimento"("custos_oferecimento_id") ON DELETE CASCADE ON UPDATE CASCADE;
