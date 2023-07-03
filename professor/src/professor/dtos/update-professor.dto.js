const joi = require('joi');

const { BadRequestException } = require('../../exceptions');

class UpdateProfessorDTO {
  constructor(dtoPayload) {
    this.validateFields(dtoPayload);
  }

  dtoSchema() {
    return joi.object({
      nome: joi.string(),
      email: joi.string(),
      telefone: joi.string(),
      matricula: joi.string(),
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

module.exports = { UpdateProfessorDTO };
