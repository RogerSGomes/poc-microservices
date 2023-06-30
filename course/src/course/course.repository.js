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
      console.log(error);
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
}

module.exports = { CourseRepository };
