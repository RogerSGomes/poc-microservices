const joi = require('joi');

const { BadRequestException } = require('../../exceptions');

class UpdateOfferingDTO {
  constructor(dtoPayload) {
    this.validateFields(dtoPayload);
  }

  dtoSchema() {
    return joi.object({
      assinatura_status: joi.string().valid('Pendente', 'Assinado'),
      divulgar_extecamp: joi.boolean(),
      explicacao: joi.string().max(200),
      host: joi.string().uri(),
      pagina_facebook: joi.string().uri(),
      inscricao: joi.object({
        local: joi.string(),
        telefone_secretaria: joi.string(),
        telefone_informacoes: joi.string(),
        data_abertura: joi.string().isoDate(),
        data_encerramento: joi.string().isoDate(),
        modelo: joi.string().valid('Basico', 'Completo'),
      }),
      local: joi.string(),
      uf: joi.string().max(2),
      cidade: joi.string(),
      dias_semana_horarios: joi.string(),
      data_inicio: joi.string().isoDate(),
      data_encerramento: joi.string().isoDate(),
      min_vagas: joi.number(),
      max_vagas: joi.number(),
      tem_criterios: joi.boolean(),
      parametros: joi.array().items(joi.string()),
      documentos_extras: joi.array().items(joi.string()),
      curso_parceria: joi.array().items(joi.string()),
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

module.exports = { UpdateOfferingDTO };
