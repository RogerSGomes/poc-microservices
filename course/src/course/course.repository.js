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

  async findById(curso_id) {
    try {
      return await prismaClient.curso.findUnique({
        where: {
          id: curso_id,
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

  async update(curso_id, data) {
    try {
      return await prismaClient.curso.update({
        where: {
          id: curso_id,
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
}

module.exports = { CourseRepository };
