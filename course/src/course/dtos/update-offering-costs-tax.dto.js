const joi = require('joi');

const { BadRequestException } = require('../../exceptions');

class UpdateOfferingCostsTaxDTO {
  constructor(dtoPayload) {
    this.validateFields(dtoPayload);
  }

  dtoSchema() {
    return joi.object({
      fixas: joi.number(),
      aiu_unidade_porcentagem: joi.number(),
      aiu_unidade_valor: joi.number(),
      fundo_extensao_unidade: joi.string(),
      fundo_extensao_porcentagem: joi.number(),
      fundo_extensao_valor: joi.number(),
      total: joi.number(),
      subsidios: joi.number(),
      custo_total: joi.number(),
      custo_aluno_min_vagas: joi.number(),
      custo_aluno_valor: joi.number(),
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

module.exports = { UpdateOfferingCostsTaxDTO };
