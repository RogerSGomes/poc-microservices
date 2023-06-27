const { ProfessorRepository } = require('./professor.repository');
const { NotFoundException } = require('../exceptions');

const { rmqServer } = require('../servers/rmq.server');

class ProfessorService {
  constructor() {
    this.professorRepository = new ProfessorRepository();
  }

  async createProfessor(createProfessorDTO) {
    return await this.professorRepository.create(createProfessorDTO);
  }

  async getAll() {
    const professors = await this.professorRepository.findAll();
    const professorsAmount = await this.professorRepository.count();

    return { professors, professorsAmount };
  }

  async getById(professor_id) {
    const professor = await this.professorRepository.findById(professor_id);

    if (!professor) {
      throw new NotFoundException('Professor não encontrado.');
    }

    return professor;
  }

  async getByEmail(email) {
    const professor = await this.professorRepository.findByEmail(email);

    if (!professor) {
      throw new NotFoundException('Professor não encontrado.');
    }

    return professor;
  }

  async signIn(signInDTO) {
    const professor = await this.professorRepository.findByEmail(signInDTO.email);

    return await rmqServer.executeRPC({
      message: { dto: signInDTO, model: professor, role: 'professor' },
      queue: 'authentication_queue',
      replyQueue: 'authenticated_professors_queue',
      correlationId: signInDTO.email,
    });
  }
}

module.exports = { ProfessorService };
