const { StudentController } = require('./student.controller');

class StudentRouter {
  constructor(router) {
    this.router = router;
    this.studentController = new StudentController();
  }

  execute() {
    this.router.get('/', this.studentController.handleGetAll);
    this.router.get('/:aluno_id', this.studentController.handleGetById);
    this.router.post('/', this.studentController.handleCreateStudent);
    this.router.post('/sign-up', this.studentController.handleSignUp);
  }
}

module.exports = { StudentRouter };
