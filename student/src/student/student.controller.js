const { StudentService } = require('./student.service');
const { CreateStudentDTO, SignUpDTO, SignInDTO } = require('./dtos');

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

    const createdStudent = await this.studentService.createStudent(createStudentDTO);
    res.status(201).send(createdStudent);
  };

  handleSignIn = async (req, res) => {
    const signInDTO = new SignInDTO(req.body);

    const access = await this.studentService.signIn(signInDTO);
    return res.status(200).send(access);
  };

  handleSignUp = async (req, res) => {
    const signUpDTO = new SignUpDTO(req.body);

    const createdStudent = await this.studentService.createStudent(signUpDTO);
    return res.status(201).send(createdStudent);
  };
}

module.exports = { StudentController };
