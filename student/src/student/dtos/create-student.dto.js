const joi = require('joi');

const { BadRequestException } = require('../../exceptions');

class CreateStudentDTO {
  constructor(dtoPayload) {
    this.validateFields(dtoPayload);
  }

  dtoSchema() {
    return joi.object({
      nome: joi.string().required().min(2),
      telefone: joi.string().required(),
      email: joi.string().required().email(),
      matricula: joi.string().length(10).required(),
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
      documento_identificacao: joi.object({
        tipo: joi.string().required(),
        numero: joi.string().required(),
        orgao_emissor: joi.string().required(),
        uf_emissao: joi.string().equal(2).required(),
      }),
      cpf: joi.string().max(14),
      data_nascimento: joi.string().isoDate(),
      endereco: joi.object({
        cep: joi.string().max(9).required(),
        logradouro: joi.string().max(255).required(),
        numero: joi.string().max(10).required(),
        bairro: joi.string().max(255).required(),
        complemento: joi.string().max(255).required(),
        estado: joi.string().equal(2).required(),
        cidade: joi.string().max(255).required(),
        pais_residencia: joi.string().max(255).required(),
      }),
      origem: joi.object({
        pais: joi.string().max(255).required(),
        estado: joi.string().max(255).required(),
        cidade: joi.string().max(255).required(),
      }),
      genero: joi.string(),
      estado_civil: joi.string(),
      possui_deficiencia: joi.boolean(),
      tipo_deficiencia: joi.string().max(255),
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
