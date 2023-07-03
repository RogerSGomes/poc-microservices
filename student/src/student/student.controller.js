const { StudentService } = require('./student.service');
const { CreateStudentDTO, SignUpDTO, SignInDTO, UpdateStudentDTO } = require('./dtos');

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
    const { student_id } = req.params;

    const student = await this.studentService.getById(student_id);
    return res.status(200).send(student);
  };

  handleCreateStudent = async (req, res) => {
    const createStudentDTO = new CreateStudentDTO(req.body);

    const createdStudent = await this.studentService.createStudent(createStudentDTO);
    return res.status(201).send(createdStudent);
  };

  handleUpdateStudent = async (req, res) => {
    const { student_id } = req.params;
    const updateStudentDTO = new UpdateStudentDTO(req.body);

    const updatedStudent = await this.studentService.updateStudent(student_id, updateStudentDTO);
    return res.status(200).send(updatedStudent);
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
