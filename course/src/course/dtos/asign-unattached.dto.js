const joi = require('joi');

const { BadRequestException } = require('../../exceptions');

class AsignUnattachedDTO {
  constructor(dtoPayload) {
    this.validateFields(dtoPayload);
  }

  dtoSchema() {
    return joi.object({
      nome: joi.string().required(),
      documento_identificacao: joi
        .object({
          tipo: joi.string().required(),
          nmr_documento: joi.string().required(),
        })
        .required(),
      pais_origem: joi.string().required(),
      instituicao: joi.string().required(),
      titulacao: joi.string().required(),
      funcao: joi.string().required(),
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

module.exports = { AsignUnattachedDTO };
