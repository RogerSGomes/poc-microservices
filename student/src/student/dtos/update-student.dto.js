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
      rg_numero: joi.string().max(12),
      rg_orgao_emissor: joi.string().max(50),
      rg_uf_emissao: joi.string().equal(2),
      cpf: joi.string().max(14),
      endereco_rua: joi.string().max(255),
      endereco_numero: joi.string().max(10),
      endereco_complemento: joi.string().max(255),
      endereco_bairro: joi.string().max(255),
      endereco_cidade: joi.string().max(255),
      endereco_estado: joi.string().equal(2),
      endereco_cep: joi.string().max(9),
      pais_origem: joi.string().max(255),
      estado_origem: joi.string().max(255),
      cidade_origem: joi.string().max(255),
      genero: joi.string(),
      estado_civil: joi.string(),
      possui_deficiencia: joi.boolean(),
      data_nascimento: joi.string().isoDate(),
      tipo_deficiencia: joi.string().max(255),
      pais_residencia: joi.string().max(255),
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
