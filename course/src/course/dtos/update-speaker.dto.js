const joi = require('joi');

const { BadRequestException } = require('../../exceptions');

class UpdateSpeakerDTO {
  constructor(dtoPayload) {
    this.validateFields(dtoPayload);
  }

  dtoSchema() {
    return joi.object({
      nome: joi.string(),
      tipo_vinculo: joi.string(),
      nome_palestra: joi.string(),
      valor: joi.number(),
      carga_horaria: joi.string(),
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

module.exports = { UpdateSpeakerDTO };
