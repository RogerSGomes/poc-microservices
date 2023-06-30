const { ProfessorController } = require('./professor.controller');
const { AuthMiddleware } = require('./middlewares');

class ProfessorRouter {
  constructor(router) {
    this.router = router;
    this.professorController = new ProfessorController();
    this.authMiddleware = new AuthMiddleware();
  }

  execute() {
    this.router.post(`/`, this.professorController.handleCreateProfessor);
    this.router.get(
      `/`,
      {
        onRequest: this.authMiddleware.ensureAuthenticated,
      },
      this.professorController.handleGetAll,
    );
    this.router.get(
      `/:professor_id`,
      {
        onRequest: this.authMiddleware.ensureAuthenticated,
      },
      this.professorController.handleGetById,
    );
    this.router.post(`/cadastrar`, this.professorController.handleSignUp);
    this.router.post(`/entrar`, this.professorController.handleSignIn);
  }
}

module.exports = { ProfessorRouter };
