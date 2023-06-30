-- CreateEnum
CREATE TYPE "InscricaoModelo" AS ENUM ('Basico', 'Completo');

-- CreateEnum
CREATE TYPE "AssinaturaStatus" AS ENUM ('Pendente', 'Assinado');

-- CreateTable
CREATE TABLE "Curso" (
    "curso_id" TEXT NOT NULL,
    "oferecimento_id" TEXT NOT NULL,
    "curso_status" TEXT NOT NULL,
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
    "diretor" TEXT NOT NULL,
    "coordenador" TEXT NOT NULL,
    "docente_responsavel" TEXT NOT NULL,
    "docentes_unicamp" JSONB[],
    "docentes_vinculo" JSONB[],
    "docentes_sem_vinculo" JSONB[],
    "palestrantes" JSONB[],
    "alunos" JSONB[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT now(),

    CONSTRAINT "Curso_pkey" PRIMARY KEY ("curso_id")
);

-- CreateTable
CREATE TABLE "Oferecimento" (
    "oferecimento_id" TEXT NOT NULL,
    "curso_id" TEXT NOT NULL,
    "assinatura_status" "AssinaturaStatus" NOT NULL,
    "divulgar_extecamp" BOOLEAN NOT NULL,
    "explicacao" VARCHAR(200) NOT NULL,
    "host" TEXT NOT NULL,
    "pagina_facebook" TEXT NOT NULL,
    "local" TEXT NOT NULL,
    "uf" CHAR(2) NOT NULL,
    "cidade" TEXT NOT NULL,
    "dias_semana_horarios" TEXT NOT NULL,
    "data_inicio" TIMESTAMP(3) NOT NULL,
    "data_encerramento" TIMESTAMP(3) NOT NULL,
    "min_vagas" INTEGER NOT NULL,
    "max_vagas" INTEGER NOT NULL,
    "tem_criterios" BOOLEAN NOT NULL,
    "parametros" JSONB[],
    "documentos_extras" JSONB[],
    "curso_parceria" JSONB[],
    "fpag_tipo" TEXT NOT NULL,
    "fpag_fonte" TEXT NOT NULL,
    "fpag_taxa_inscricao" TEXT NOT NULL,
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
    "telefone_informacoes" TEXT NOT NULL,
    "data_abertura" TIMESTAMP(3) NOT NULL,
    "data_encerramento" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT now(),
    "modelo" "InscricaoModelo" NOT NULL,

    CONSTRAINT "Inscricao_pkey" PRIMARY KEY ("inscricao_id")
);

-- CreateTable
CREATE TABLE "CustosOferecimento" (
    "custos_oferecimento_id" TEXT NOT NULL,
    "oferecimento_id" TEXT NOT NULL,
    "assinatura_status" "AssinaturaStatus" NOT NULL,
    "fluxo_continuo" BOOLEAN NOT NULL,
    "professores_hora_aula" DOUBLE PRECISION NOT NULL,
    "professores_outras_atividades" DOUBLE PRECISION NOT NULL,
    "material_consumo" DOUBLE PRECISION NOT NULL,
    "material_permanente" DOUBLE PRECISION NOT NULL,
    "servico_terceiros" DOUBLE PRECISION NOT NULL,
    "outros_custos" DOUBLE PRECISION NOT NULL,
    "aproveitamento_recursos" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT now(),

    CONSTRAINT "CustosOferecimento_pkey" PRIMARY KEY ("custos_oferecimento_id")
);

-- CreateTable
CREATE TABLE "CondicoesCustosOferecimento" (
    "condicoes_custos_oferecimento_id" TEXT NOT NULL,
    "custos_oferecimento_id" TEXT NOT NULL,
    "curso_gratuito" BOOLEAN NOT NULL,
    "valor_a_vista" DOUBLE PRECISION NOT NULL,
    "valor_a_vista_vencimento" TIMESTAMP(3) NOT NULL,
    "parcelas_boleto" JSONB[],
    "parcelas_cartao_credito" INTEGER NOT NULL,
    "porcentagem_desconto_estudantes" DOUBLE PRECISION NOT NULL,
    "opcao_desconto" JSONB[],
    "convenio_numero_processo" TEXT NOT NULL,
    "convenio_empresa" TEXT NOT NULL,
    "convenio_cnpj" TEXT NOT NULL,
    "convenio_tipo" TEXT NOT NULL,
    "convenio_responsavel" TEXT NOT NULL,
    "convenio_responsavel_cargo" TEXT NOT NULL,
    "convenio_sem_valor_parcela" BOOLEAN NOT NULL,
    "convenio_numero_parcelas" INTEGER,
    "recurso_valor" DOUBLE PRECISION NOT NULL,
    "recurso_empresa" TEXT NOT NULL,
    "empresa_nome" TEXT NOT NULL,
    "empresa_endereco" TEXT NOT NULL,
    "empresa_bairro" TEXT NOT NULL,
    "empresa_cidade" TEXT NOT NULL,
    "empresa_cep" TEXT NOT NULL,
    "empresa_cnpj" TEXT NOT NULL,
    "empresa_ins_estadual" TEXT NOT NULL,
    "empresa_nome_contato" TEXT NOT NULL,
    "empresa_telefone" TEXT NOT NULL,
    "empresa_fax" TEXT NOT NULL,
    "empresa_email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT now(),

    CONSTRAINT "CondicoesCustosOferecimento_pkey" PRIMARY KEY ("condicoes_custos_oferecimento_id")
);

-- CreateTable
CREATE TABLE "TaxasCustosOferecimento" (
    "taxas_custos_oferecimento_id" TEXT NOT NULL,
    "custos_oferecimento_id" TEXT NOT NULL,
    "fixas" DOUBLE PRECISION NOT NULL,
    "aiu_unidade_porcentagem" DOUBLE PRECISION NOT NULL,
    "aiu_unidade_valor" DOUBLE PRECISION NOT NULL,
    "fundo_extencao_unidade" TEXT NOT NULL,
    "fundo_extencao_porcentagem" DOUBLE PRECISION NOT NULL,
    "fundo_extencao_valor" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "subsidios" DOUBLE PRECISION NOT NULL,
    "custo_total" DOUBLE PRECISION NOT NULL,
    "custo_aluno_min_vagas" DOUBLE PRECISION NOT NULL,
    "custo_aluno_valor" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT now(),

    CONSTRAINT "TaxasCustosOferecimento_pkey" PRIMARY KEY ("taxas_custos_oferecimento_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Curso_oferecimento_id_key" ON "Curso"("oferecimento_id");

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
