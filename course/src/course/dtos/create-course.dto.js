const joi = require('joi');

const { BadRequestException } = require('../../exceptions');

class CreateCourseDTO {
  constructor(dtoPayload) {
    this.validateFields(dtoPayload);
  }

  dtoSchema() {
    return joi.object({
      professor_id: joi.string().required().uuid().messages({
        'string.base': 'O id do professor deve ser uma string.',
        'string.empty': 'Informe o id do professor.',
        'any.required': 'Informe o id do professor.',
        'string.guid': 'O id do professor deve ser um uuid.',
      }),
      nome: joi.string().required().min(2).messages({
        'string.base': 'O nome do curso deve ser uma string.',
        'string.empty': 'Informe o nome do curso.',
        'any.required': 'Informe o nome do curso.',
        'string.min': 'O nome do curso deve conter ao menos dois caracteres.',
      }),
      duracao: joi.number().required().integer().greater(0).messages({
        'number.base': 'A duração do curso deve ser um número.',
        'any.required': 'Informe a duração do curso.',
        'number.integer': 'A duração deve ser um número inteiro.',
        'number.greater': 'A duração do curso deve ser maior que 0.',
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

module.exports = { CreateCourseDTO };
