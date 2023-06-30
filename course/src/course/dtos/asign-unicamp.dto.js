const joi = require('joi');

const { BadRequestException } = require('../../exceptions');

class AsignUnicampDTO {
  constructor(dtoPayload) {
    this.validateFields(dtoPayload);
  }

  dtoSchema() {
    return joi.object({
      id: joi.string().required().uuid(),
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

module.exports = { AsignUnicampDTO };
