const joi = require('joi');

const { BadRequestException } = require('../../exceptions');

class AsignSpeakerDTO {
  constructor(dtoPayload) {
    this.validateFields(dtoPayload);
  }

  dtoSchema() {
    return joi.object({
      nome: joi.string().required(),
      tipo_vinculo: joi.string().required(),
      nome_palestra: joi.string().required(),
      valor: joi.number().required(),
      carga_horaria: joi.string().required(),
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

module.exports = { AsignSpeakerDTO };
