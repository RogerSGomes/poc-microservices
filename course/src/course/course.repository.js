const { prismaClient } = require('../clients/prisma.client');

class CourseRepository {
  async findAll() {
    return await prismaClient.curso.findMany();
  }

  async findById(curso_id) {
    return await prismaClient.curso.findUnique({
      where: {
        id: curso_id,
      },
    });
  }

  async create(createCourseDTO) {
    return await prismaClient.curso.create({
      data: createCourseDTO,
    });
  }

  async count() {
    return await prismaClient.curso.count();
  }
}

module.exports = { CourseRepository };
