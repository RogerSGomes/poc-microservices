const joi = require('joi');

const { BadRequestException } = require('../../exceptions');

class SignUpDTO {
  constructor(dtoPayload) {
    this.validateFields(dtoPayload);
  }

  dtoSchema() {
    return joi.object({
      nome: joi.string().required().min(2).messages({
        'string.base': 'O nome deve ser uma string.',
        'string.empty': 'Informe o nome.',
        'any.required': 'Informe o nome.',
        'string.min': 'O nome deve conter pelo menos dois caracteres.',
      }),
      email: joi.string().required().email().messages({
        'string.base': 'O email deve ser uma string.',
        'string.empty': 'Informe o email.',
        'any.required': 'Informe o email.',
        'string.email': 'Informe um email válido.',
      }),
      senha: joi
        .string()
        .required()
        .custom((value, helpers) => {
          const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

          if (!value.match(regex)) {
            return helpers.error('any.invalid');
          }

          return value;
        }, 'strong password validation')
        .messages({
          'string.empty': 'Informe a senha.',
          'any.required': 'Informe a senha.',
          'any.invalid':
            'A senha deve conter no mínimo 8 caracteres, incluindo pelo menos 1 letra maiúscula, 1 letra minúscula e 1 número.',
        }),
      confirma_senha: joi.string().required().valid(joi.ref('senha')).messages({
        'string.empty': 'Informe a confirmação da senha.',
        'any.required': 'Informe a confirmação da senha.',
        'any.only': 'As senhas não coincidem.',
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

module.exports = { SignUpDTO };
