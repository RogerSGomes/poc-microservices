const joi = require('joi');

const { BadRequestException } = require('../../exceptions');

class CreateOfferingDTO {
  constructor(dtoPayload) {
    this.validateFields(dtoPayload);
  }

  dtoSchema() {
    return joi.object({
      divulgar_extecamp: joi.boolean().required(),
      explicacao: joi.string().max(200),
      host: joi.string().uri(),
      pagina_facebook: joi.string().uri(),
      inscricao: joi
        .object({
          local: joi.string().required(),
          telefone_secretaria: joi.string().required(),
          telefone_informacoes: joi.string(),
          data_abertura: joi.string().isoDate().required(),
          data_encerramento: joi.string().isoDate().required(),
          modelo: joi.string().valid('Basico', 'Completo').required(),
        })
        .required(),
      local: joi.string().required(),
      uf: joi.string().max(2).required(),
      cidade: joi.string().required(),
      dias_semana_horarios: joi.string(),
      data_inicio: joi.string().isoDate(),
      data_encerramento: joi.string().isoDate(),
      min_vagas: joi.number().required(),
      max_vagas: joi.number().required(),
      tem_criterios: joi.boolean().required(),
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

module.exports = { CreateOfferingDTO };
