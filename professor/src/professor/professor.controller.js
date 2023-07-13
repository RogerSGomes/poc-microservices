const { ProfessorService } = require('./professor.service');
const { SignUpDTO, SignInDTO, CreateProfessorDTO, UpdateProfessorDTO } = require('./dtos');

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

  handleCreateProfessor = async (req, res) => {
    const createProfessorDTO = new CreateProfessorDTO(req.body);

    const createdProfessor = await this.professorService.createProfessor(createProfessorDTO);
    return res.status(201).send(createdProfessor);
  };

  handleUpdateProfessor = async (req, res) => {
    const { professor_id } = req.params;
    const updateProfessorDTO = new UpdateProfessorDTO(req.body);

    const updatedProfessor = await this.professorService.updateProfessor(professor_id, updateProfessorDTO);
    return res.status(201).send(updatedProfessor);
  };

  handleSignUp = async (req, res) => {
    const signUpDTO = new SignUpDTO(req.body);

    const createdProfessor = await this.professorService.createProfessor(signUpDTO);
    return res.status(201).send(createdProfessor);
  };
}

module.exports = { ProfessorController };
