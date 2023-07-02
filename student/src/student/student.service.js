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

  async createStudent(createStudentDTO) {
    return await this.studentRepository.create(createStudentDTO);
  }

  async signIn(signInDTO) {
    const student = await this.studentRepository.findByLogin(signInDTO.login);

    return await rmqServer.executeRPC({
      message: { dto: signInDTO, model: student, role: 'student' },
      queue: 'authentication_queue',
      replyQueue: 'authenticated_students_queue',
      correlationId: signInDTO.login,
    });
  }
}

module.exports = { StudentService };
