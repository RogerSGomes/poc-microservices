const joi = require('joi');

const { BadRequestException } = require('../../exceptions');

class UpdateOfferingCostsDTO {
  constructor(dtoPayload) {
    this.validateFields(dtoPayload);
  }

  dtoSchema() {
    return joi.object({
      fluxo_continuo: joi.boolean(),
      professores_hora_aula: joi.number(),
      professores_outras_atividades: joi.number(),
      material_consumo: joi.number(),
      material_permanente: joi.number(),
      servico_terceiros: joi.number(),
      outros_custos: joi.number(),
      aproveitamento_recursos: joi.number(),
      total: joi.number(),
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

module.exports = { UpdateOfferingCostsDTO };
