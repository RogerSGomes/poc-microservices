const joi = require('joi');

const { BadRequestException } = require('../../exceptions');

class SubscribeStudentDTO {
  constructor(dtoPayload) {
    this.validateFields(dtoPayload);
  }

  dtoSchema() {
    return joi.object({
      id: joi.string().uuid(),
      termo_compromisso_assinado: joi.boolean().required(),
      documentos_upload: joi.boolean().required(),
      cpf_upload: joi.boolean().required(),
      declaracao_upload: joi.boolean().required(),
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

module.exports = { SubscribeStudentDTO };
