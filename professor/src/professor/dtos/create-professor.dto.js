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
      instituicao: joi.string().required(),
      unidade: joi.string().required(),
      departamento: joi.string().required(),
      titulacao: joi.string().required(),
      situacao: joi.string().required(),
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
