const { prismaClient } = require('../clients/prisma.client');

class ProfessorRepository {
  async findAll() {
    return await prismaClient.professor.findMany();
  }

  async findById(professor_id) {
    return await prismaClient.professor.findUnique({
      where: { id: professor_id },
    });
  }

  async findByEmail(email) {
    return await prismaClient.professor.findUnique({
      where: { email },
    });
  }

  async create({ nome, email, senha }) {
    return await prismaClient.professor.create({
      data: { nome, email, senha },
    });
  }

  async count() {
    return await prismaClient.professor.count();
  }
}

module.exports = { ProfessorRepository };
