const { prismaClient } = require('../clients/prisma.client');
const { InternalServerErrorException } = require('../exceptions');

class CourseRepository {
  async findAll() {
    try {
      return await prismaClient.curso.findMany({
        include: {
          oferecimento: {
            include: {
              inscricao: true,
              custos_oferecimento: {
                include: { taxas_custos_oferecimento: true, condicoes_custos_oferecimento: true },
              },
            },
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findById(course_id) {
    try {
      return await prismaClient.curso.findUnique({
        where: {
          id: course_id,
        },
        include: {
          oferecimento: {
            include: {
              inscricao: true,
              custos_oferecimento: {
                include: { taxas_custos_oferecimento: true, condicoes_custos_oferecimento: true },
              },
            },
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async create(createCourseDTO) {
    try {
      return await prismaClient.curso.create({
        data: createCourseDTO,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(course_id, updateCourseDTO) {
    try {
      return await prismaClient.curso.update({
        where: {
          id: course_id,
        },
        data: updateCourseDTO,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async delete(course_id) {
    try {
      return await prismaClient.curso.delete({
        where: {
          id: course_id,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async createOffering(course_id, createOfferingDTO) {
    try {
      return await prismaClient.oferecimento.create({
        data: {
          curso: { connect: { id: course_id } },
          ...createOfferingDTO,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateOffering(offering_id, updateOfferingDTO) {
    try {
      return await prismaClient.oferecimento.update({
        where: { id: offering_id },
        data: updateOfferingDTO,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async createSubscription(offering_id, createSubscriptionDTO) {
    try {
      return await prismaClient.inscricao.create({
        data: {
          oferecimento: { connect: { id: offering_id } },
          ...createSubscriptionDTO,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateSubscription(subscription_id, updateSubscriptionDTO) {
    try {
      return await prismaClient.inscricao.update({
        where: { id: subscription_id },
        data: updateSubscriptionDTO,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async createOfferingCosts(offering_id, createOfferingCostsDTO) {
    try {
      return await prismaClient.custosOferecimento.create({
        data: {
          oferecimento: { connect: { id: offering_id } },
          ...createOfferingCostsDTO,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateOfferingCosts(offering_costs_id, updateOfferingCostsDTO) {
    try {
      return await prismaClient.custosOferecimento.update({
        where: { id: offering_costs_id },
        data: updateOfferingCostsDTO,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async createOfferingCostsTax(costs_id, createOfferingCostsTaxDTO) {
    try {
      return await prismaClient.taxasCustosOferecimento.create({
        data: {
          custos_oferecimento: { connect: { id: costs_id } },
          ...createOfferingCostsTaxDTO,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateOfferingCostsTax(offering_costs_tax_id, updateOfferingCostsTaxDTO) {
    try {
      return await prismaClient.taxasCustosOferecimento.update({
        where: { id: offering_costs_tax_id },
        data: updateOfferingCostsTaxDTO,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async createOfferingCostsConditions(costs_id, createOfferingCostsConditionsDTO) {
    try {
      return await prismaClient.condicoesCustosOferecimento.create({
        data: {
          custos_oferecimento: { connect: { id: costs_id } },
          ...createOfferingCostsConditionsDTO,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateOfferingCostsConditions(offering_costs_conditions_id, updateOfferingCostsConditionsDTO) {
    try {
      return await prismaClient.condicoesCustosOferecimento.update({
        where: { id: offering_costs_conditions_id },
        data: updateOfferingCostsConditionsDTO,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async count() {
    try {
      return await prismaClient.curso.count();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}

module.exports = { CourseRepository };
