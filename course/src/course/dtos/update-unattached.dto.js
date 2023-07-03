const joi = require('joi');

const { BadRequestException } = require('../../exceptions');

class UpdateUnattachedDTO {
  constructor(dtoPayload) {
    this.validateFields(dtoPayload);
  }

  dtoSchema() {
    return joi.object({
      nome: joi.string(),
      documento_identificacao: joi.object({
        tipo: joi.string(),
        nmr_documento: joi.string(),
      }),
      pais_origem: joi.string(),
      instituicao: joi.string(),
      titulacao: joi.string(),
      funcao: joi.string(),
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

module.exports = { UpdateUnattachedDTO };
