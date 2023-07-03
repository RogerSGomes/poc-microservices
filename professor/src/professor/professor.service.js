const { ProfessorRepository } = require('./professor.repository');
const { NotFoundException } = require('../exceptions');

const { rmqServer } = require('../servers/rmq.server');

class ProfessorService {
  constructor() {
    this.professorRepository = new ProfessorRepository();
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

  async createProfessor(createProfessorDTO) {
    return await this.professorRepository.create(createProfessorDTO);
  }

  async updateProfessor(professor_id, updateProfessorDTO) {
    return await this.professorRepository.update(professor_id, updateProfessorDTO);
  }

  async signIn(signInDTO) {
    const professor = await this.professorRepository.findByLogin(signInDTO.login);

    return await rmqServer.executeRPC({
      message: { dto: signInDTO, model: professor, role: 'professor' },
      queue: 'authentication_queue',
      replyQueue: 'authenticated_professors_queue',
      correlationId: signInDTO.login,
    });
  }
}

module.exports = { ProfessorService };
