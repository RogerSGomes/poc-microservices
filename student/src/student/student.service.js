const { StudentRepository } = require('./student.repository');
const { NotFoundException } = require('../exceptions');

class StudentService {
  constructor() {
    this.studentRepository = new StudentRepository();
  }

  async createStudent(createStudentDTO) {
    return await this.studentRepository.create(createStudentDTO);
  }

  async getAll() {
    const students = await this.studentRepository.findAll();
    const studentsAmount = await this.studentRepository.count();

    return {
      students,
      studentsAmount,
    };
  }

  async getById(aluno_id) {
    const student = await this.studentRepository.findById(aluno_id);

    if (!student) {
      throw new NotFoundException('Aluno não encontrado.');
    }

    return student;
  }
}

module.exports = { StudentService };
