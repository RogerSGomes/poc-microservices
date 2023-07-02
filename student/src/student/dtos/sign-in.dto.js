const joi = require('joi');

const { BadRequestException } = require('../../exceptions');

class SignInDTO {
  constructor(dtoPayload) {
    this.validateFields(dtoPayload);
  }

  dtoSchema() {
    return joi.object({
      login: joi.string().required().messages({
        'string.base': 'O login deve ser uma string.',
        'string.empty': 'Informe o email ou a matricula.',
        'any.required': 'Informe o email ou a matricula.',
      }),
      senha: joi.string().required().messages({
        'string.empty': 'Informe a senha.',
        'any.required': 'Informe a senha.',
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

module.exports = { SignInDTO };
