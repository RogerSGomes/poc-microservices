const joi = require('joi');

const { BadRequestException } = require('../../exceptions');

class CreateProfessorDTO {
  constructor(dtoPayload) {
    this.validateFields(dtoPayload);
  }

  dtoSchema() {
    return joi.object({
      nome: joi.string().required(),
      email: joi.string().required(),
      telefone: joi.string().required(),
      senha: joi.string().required(),
      matricula: joi.string().required(),
      instituicao: joi.string(),
      unidade: joi.string(),
      departamento: joi.string(),
      titulacao: joi.string(),
      situacao: joi.string(),
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

module.exports = { CreateProfessorDTO };
