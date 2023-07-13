const { StudentRepository } = require('./student.repository');
const { NotFoundException } = require('../exceptions');

const { rmqServer } = require('../servers/rmq.server');

class StudentService {
  constructor() {
    this.studentRepository = new StudentRepository();
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

  async getByLogin(student_login) {
    const student = await this.studentRepository.findByLogin(student_login);

    if (!student) {
      throw new NotFoundException('Aluno não encontrado.');
    }

    return student;
  }

  async createStudent(createStudentDTO) {
    return await this.studentRepository.create(createStudentDTO);
  }

  async updateStudent(student_id, updateStudentDTO) {
    if (
      (updateStudentDTO.documento_identificacao !== undefined) |
      (updateStudentDTO.endereco !== undefined) |
      (updateStudentDTO.naturalidade !== undefined)
    ) {
      const student = await this.getById(student_id);

      updateStudentDTO.documento_identificacao = {
        ...student.documento_identificacao,
        ...updateStudentDTO.documento_identificacao,
      };

      updateStudentDTO.endereco = {
        ...student.endereco,
        ...updateStudentDTO.endereco,
      };

      updateStudentDTO.naturalidade = {
        ...student.naturalidade,
        ...updateStudentDTO.naturalidade,
      };
    }

    return await this.studentRepository.update(student_id, updateStudentDTO);
  }
}

module.exports = { StudentService };
