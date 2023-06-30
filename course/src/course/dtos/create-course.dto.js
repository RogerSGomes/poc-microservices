const joi = require('joi');

const { BadRequestException } = require('../../exceptions');

class CreateCourseDTO {
  constructor(dtoPayload) {
    this.validateFields(dtoPayload);
  }

  dtoSchema() {
    return joi.object({
      sigla: joi.string().required(),
      nome: joi.string().required(),
      tipo: joi.string().required(),
      fluxo_continuo: joi.boolean().required(),
      disciplina_eletiva: joi.boolean().required(),
      forma_realização: joi.string().required(),
      plataforma: joi.string().required(),
      mensagem: joi.string().required(),
      descricao: joi.string().min(50).max(10000),
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
