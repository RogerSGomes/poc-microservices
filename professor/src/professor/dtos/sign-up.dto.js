const joi = require('joi');

const { BadRequestException } = require('../../exceptions');

class SignUpDTO {
  constructor(dtoPayload) {
    this.validateFields(dtoPayload);
  }

  dtoSchema() {
    return joi.object({
      nome: joi.string().required().min(2),
      telefone: joi.string().required(),
      email: joi.string().required().email(),
      matricula: joi.string().required(),
      senha: joi
        .string()
        .required()
        .custom((value, helpers) => {
          const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

          if (!value.match(regex)) {
            return helpers.error('any.invalid');
          }

          return value;
        }, 'strong password validation'),
      confirma_senha: joi.string().required().valid(joi.ref('senha')),
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
