const { prismaClient } = require('../clients/prisma.client');
const { InternalServerErrorException } = require('../exceptions');

class StudentRepository {
  async findAll() {
    try {
      return await prismaClient.aluno.findMany();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findById(aluno_id) {
    try {
      return await prismaClient.aluno.findUnique({
        where: { id: aluno_id },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findByMatricula(matricula) {
    try {
      return await prismaClient.aluno.findUnique({
        where: { matricula },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findByEmail(email) {
    try {
      return await prismaClient.aluno.findUnique({
        where: { email },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findByCpf(cpf) {
    try {
      return await prismaClient.aluno.findUnique({
        where: { cpf },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findByRg(rg_numero) {
    try {
      return await prismaClient.aluno.findUnique({
        where: { rg_numero },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async create({ confirma_senha, ...createAlunoDTO }) {
    try {
      return await prismaClient.aluno.create({
        data: createAlunoDTO,
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async count() {
    try {
      return await prismaClient.aluno.count();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}

module.exports = { StudentRepository };
