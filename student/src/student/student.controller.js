const { StudentService } = require('./student.service');
const { CreateStudentDTO } = require('./dtos');

class StudentController {
  constructor() {
    this.studentService = new StudentService();
  }

  handleGetAll = async (req, res) => {
    const { students, studentsAmount } = await this.studentService.getAll();

    return res.status(200).send({
      result: students,
      total: studentsAmount,
    });
  };

  handleGetById = async (req, res) => {
    const { aluno_id } = req.params;

    const student = await this.studentService.getById(aluno_id);
    return res.status(200).send(student);
  };

  handleCreateStudent = async (req, res) => {
    const createStudentDTO = new CreateStudentDTO(req.body);
    return res.send(createStudentDTO);

    const createdStudent = await this.studentService.createStudent(createStudentDTO);
    res.status(201).send(createdStudent);
  };
}

module.exports = { StudentController };
