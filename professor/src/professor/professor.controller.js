const { ProfessorService } = require('./professor.service');
const { SignUpDTO, SignInDTO, CreateProfessorDTO } = require('./dtos');

class ProfessorController {
  constructor() {
    this.professorService = new ProfessorService();
  }

  handleGetAll = async (req, res) => {
    const { professors, professorsAmount } = await this.professorService.getAll();
    return res.status(200).send({ result: professors, total: professorsAmount });
  };

  handleGetById = async (req, res) => {
    const { professor_id } = req.params;

    const professor = await this.professorService.getById(professor_id);
    return res.status(200).send(professor);
  };

  handleSignIn = async (req, res) => {
    const signInDTO = new SignInDTO(req.body);

    const access = await this.professorService.signIn(signInDTO);
    return res.status(200).send(access);
  };

  handleSignUp = async (req, res) => {
    const signUpDTO = new SignUpDTO(req.body);

    const createdProfessor = await this.professorService.createProfessor(signUpDTO);
    return res.status(201).send(createdProfessor);
  };

  handleCreateProfessor = async (req, res) => {
    const createProfessorDTO = new CreateProfessorDTO(req.body);

    const createdProfessor = await this.professorService.createProfessor(createProfessorDTO);
    return res.status(201).send(createdProfessor);
  };
}

module.exports = { ProfessorController };
