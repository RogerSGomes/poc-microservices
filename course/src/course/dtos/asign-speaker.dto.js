const joi = require('joi');

const { BadRequestException } = require('../../exceptions');

class AsignSpeakerDTO {
  constructor(dtoPayload) {
    this.validateFields(dtoPayload);
  }

  dtoSchema() {
    return joi.object({
      id: joi.string().uuid().required(),
      nome: joi.string().required(),
      matricula: joi.string().required(),
      instituicao: joi.string(),
      titulacao: joi.string(),
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
