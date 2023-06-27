const { prismaClient } = require('../clients/prisma.client');

class StudentRepository {
  async findAll() {
    return await prismaClient.aluno.findMany();
  }

  async findById(aluno_id) {
    return await prismaClient.aluno.findUnique({
      where: { id: aluno_id },
    });
  }

  async findByMatricula(matricula) {
    return await prismaClient.aluno.findUnique({
      where: { matricula },
    });
  }

  async findByEmail(email) {
    return await prismaClient.aluno.findUnique({
      where: { email },
    });
  }

  async findByCpf(cpf) {
    return await prismaClient.aluno.findUnique({
      where: { cpf },
    });
  }

  async findByRg(rg_numero) {
    return await prismaClient.aluno.findUnique({
      where: { rg_numero },
    });
  }

  async create({ confirma_senha, ...createAlunoDTO }) {
    return await prismaClient.aluno.create({
      data: createAlunoDTO,
    });
  }

  async count() {
    return await prismaClient.aluno.count();
  }
}

module.exports = { StudentRepository };
