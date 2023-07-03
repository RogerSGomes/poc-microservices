const { prismaClient } = require('../clients/prisma.client');
const { InternalServerErrorException } = require('../exceptions');

class ProfessorRepository {
  async findAll() {
    try {
      return await prismaClient.professor.findMany();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findById(professor_id) {
    try {
      return await prismaClient.professor.findUnique({
        where: { id: professor_id },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findByLogin(login) {
    try {
      return await prismaClient.professor.findFirst({
        where: { OR: [{ email: login }, { matricula: login }] },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async create({ confirma_senha, ...createProfessorDTO }) {
    try {
      return await prismaClient.professor.create({
        data: createProfessorDTO,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(professor_id, updateProfessorDTO) {
    try {
      return await prismaClient.professor.update({
        where: { id: professor_id },
        data: updateProfessorDTO,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async count() {
    try {
      return await prismaClient.professor.count();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}

module.exports = { ProfessorRepository };
