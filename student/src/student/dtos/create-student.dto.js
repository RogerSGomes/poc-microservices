const joi = require('joi');

const { BadRequestException } = require('../../exceptions');

class CreateStudentDTO {
  constructor(dtoPayload) {
    this.validateFields(dtoPayload);
  }

  dtoSchema() {
    return joi.object({
      nome: joi.string().required().min(2).messages({
        'string.base': 'O nome deve ser uma string.',
        'string.empty': 'Informe o nome.',
        'any.required': 'Informe o nome.',
        'string.min': 'O nome deve ter pelo menos dois caracteres.',
      }),
      email: joi.string().required().email().messages({
        'string.base': 'O email deve ser uma string.',
        'string.empty': 'Informe o email.',
        'any.required': 'Informe o email.',
        'string.email': 'Informe um email válido.',
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

module.exports = { CreateStudentDTO };
