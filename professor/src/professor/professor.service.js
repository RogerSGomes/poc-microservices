const { ProfessorRepository } = require('./professor.repository');
const { NotFoundException } = require('../exceptions');

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

  async getByLogin(professor_login) {
    const professor = await this.professorRepository.findByLogin(professor_login);

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
}

module.exports = { ProfessorService };
