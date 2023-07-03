const joi = require('joi');

const { BadRequestException } = require('../../exceptions');

class UpdateCourseDTO {
  constructor(dtoPayload) {
    this.validateFields(dtoPayload);
  }

  dtoSchema() {
    return joi.object({
      sigla: joi.string(),
      nome: joi.string(),
      tipo: joi.string(),
      fluxo_continuo: joi.boolean(),
      disciplina_eletiva: joi.boolean(),
      forma_realizacao: joi.string(),
      plataforma: joi.string(),
      mensagem: joi.string(),
      descricao: joi.string().min(50).max(10000),
      unidade: joi.string(),
      departamento: joi.string(),
      palavras_chave: joi.array().items(joi.string()),
      area_geral: joi.string(),
      areas_tematicas: joi.array().items(joi.string()),
      carga_horaria_presencial_pratica: joi.string(),
      carga_horaria_presencial_teorica: joi.string(),
      carga_horaria_ead_pratica: joi.string(),
      carga_horaria_ead_teorica: joi.string(),
      ementa: joi.string().max(1500),
      bibliografia: joi.string().min(50).max(10000),
      procedimentos: joi.string().min(50).max(10000),
      objetivo: joi.string().min(50).max(1000),
      publico_alvo: joi.string().min(10).max(1000),
      frequencia_minima: joi.number(),
      nota_minima: joi.number(),
      grau_escolaridade: joi.string(),
      divulgacao_corporativa: joi.boolean(),
    });
  }

  validateFields(dtoPayload) {
    const result = this.dtoSchema().validate(dtoPayload ?? {});

    if (result.error) {
      const errorMessage = result.error.details[0].message;
      throw new BadRequestException(errorMessage);
    } else {
      Object.assign(this, result.value);
    }
  }
}

module.exports = { UpdateCourseDTO };
