const { prismaClient } = require('../clients/prisma.client');
const { InternalServerErrorException } = require('../exceptions');

class CourseRepository {
  async findAll() {
    try {
      return await prismaClient.curso.findMany();
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

  async update(course_id, data) {
    try {
      return await prismaClient.curso.update({
        where: {
          id: course_id,
        },
        data,
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

  async createOfferingAndSubscription(course_id, createOfferingDTO, createSubscriptionDTO) {
    try {
      return await prismaClient.inscricao.create({
        data: {
          oferecimento: { create: { curso_id: course_id, ...createOfferingDTO } },
          ...createSubscriptionDTO,
        },
        include: { oferecimento: true },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOfferingById(offering_id) {
    try {
      return await prismaClient.oferecimento.findUnique({
        where: {
          id: offering_id,
        },
        include: {
          inscricao: true,
          custos_oferecimento: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}

module.exports = { CourseRepository };
