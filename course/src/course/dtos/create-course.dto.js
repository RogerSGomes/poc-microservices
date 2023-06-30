const joi = require('joi');

const { BadRequestException } = require('../../exceptions');

class CreateCourseDTO {
  constructor(dtoPayload) {
    this.validateFields(dtoPayload);
  }

  dtoSchema() {
    return joi.object({
      sigla: joi.string().required(),
      nome: joi.string().required(),
      tipo: joi.string().required(),
      fluxo_continuo: joi.boolean().required(),
      disciplina_eletiva: joi.boolean().required(),
      forma_realizacao: joi.string().required(),
      plataforma: joi.string().required(),
      mensagem: joi.string(),
      descricao: joi.string().min(50).max(10000).required(),
      unidade: joi.string().required(),
      departamento: joi.string().required(),
      palavras_chave: joi.array().items(joi.string()).required(),
      area_geral: joi.string().required(),
      areas_tematicas: joi.array().items(joi.string()).required(),
      carga_horaria_presencial_pratica: joi.string(),
      carga_horaria_presencial_teorica: joi.string(),
      carga_horaria_ead_pratica: joi.string(),
      carga_horaria_ead_teorica: joi.string(),
      ementa: joi.string().max(1500),
      bibliografia: joi.string().min(50).max(10000).required(),
      procedimentos: joi.string().min(50).max(10000).required(),
      objetivo: joi.string().min(50).max(1000).required(),
      publico_alvo: joi.string().min(10).max(1000).required(),
      frequencia_minima: joi.number().required(),
      nota_minima: joi.number().required(),
      grau_escolaridade: joi.string().required(),
      divulgacao_corporativa: joi.boolean().required(),
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

module.exports = { CreateCourseDTO };
