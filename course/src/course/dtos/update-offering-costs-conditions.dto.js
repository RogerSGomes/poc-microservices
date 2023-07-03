const joi = require('joi');

const { BadRequestException } = require('../../exceptions');

class UpdateOfferingCostsConditionsDTO {
  constructor(dtoPayload) {
    this.validateFields(dtoPayload);
  }

  dtoSchema() {
    return joi.object({
      forma_pagamento: joi.object({
        tipo: joi.string(),
        fonte: joi.string(),
        taxa_inscricao: joi.number(),
      }),
      curso_gratuito: joi.boolean(),
      valor_a_vista: joi.number(),
      valor_a_vista_vencimento: joi.string().isoDate(),
      parcelas_boleto: joi.array().items(
        joi.object({
          nmr_parcelas: joi.number(),
          valor: joi.number(),
          data_vencimento: joi.string().isoDate(),
        }),
      ),
      parcelas_cartao_credito: joi.number(),
      porcentagem_desconto_estudantes: joi.number(),
      opcao_desconto: joi.array().items(
        joi.object({
          para: joi.string(),
          porcentagem_desconto: joi.number(),
        }),
      ),
      convenio: joi.object({
        numero_processo: joi.string(),
        empresa: joi.string(),
        cnpj: joi.string(),
        tipo: joi.string(),
        responsavel: joi.string(),
        responsavel_cargo: joi.string(),
        sem_valor_parcela: joi.boolean(),
        numero_parcelas: joi.number(),
      }),
      recurso: joi.object({
        valor: joi.number(),
        empresa: joi.string(),
      }),
      empresa: joi.object({
        nome: joi.string(),
        endereco: joi.string(),
        bairro: joi.string(),
        cidade: joi.string(),
        cep: joi.string(),
        cnpj: joi.string(),
        ins_estadual: joi.string(),
        nome_contato: joi.string(),
        telefone: joi.string(),
        fax: joi.string(),
        email: joi.string().email(),
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

module.exports = { UpdateOfferingCostsConditionsDTO };
