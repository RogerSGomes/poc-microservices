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
}

module.exports = { CourseRepository };
