const joi = require('joi');

const { BadRequestException } = require('../../exceptions');

class UpdateCoordinationDTO {
  constructor(dtoPayload) {
    this.validateFields(dtoPayload);
  }

  dtoSchema() {
    return joi.object({
      diretor: joi.string(),
      coordenador: joi.string(),
      docente_responsavel: joi.object({
        id: joi.string().uuid(),
        carga_horaria: joi.string(),
      }),
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

module.exports = { UpdateCoordinationDTO };
