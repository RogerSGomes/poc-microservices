const joi = require('joi');

const { BadRequestException } = require('../../exceptions');

class UpdateStudentDTO {
  constructor(dtoPayload) {
    this.validateFields(dtoPayload);
  }

  dtoSchema() {
    return joi.object({
      nome: joi.string().min(2),
      telefone: joi.string(),
      email: joi.string().email(),
      matricula: joi.string().length(10),
      documento_identificacao: joi.object({
        tipo: joi.string(),
        numero: joi.string(),
        orgao_emissor: joi.string(),
        uf_emissao: joi.string().equal(2),
      }),
      cpf: joi.string().max(14),
      data_nascimento: joi.string().isoDate(),
      endereco: joi.object({
        cep: joi.string().max(9),
        logradouro: joi.string().max(255),
        numero: joi.string().max(10),
        bairro: joi.string().max(255),
        complemento: joi.string().max(255),
        estado: joi.string().equal(2),
        cidade: joi.string().max(255),
        pais_residencia: joi.string().max(255),
      }),
      origem: joi.object({
        pais: joi.string().max(255),
        estado: joi.string().max(255),
        cidade: joi.string().max(255),
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

module.exports = { UpdateStudentDTO };
