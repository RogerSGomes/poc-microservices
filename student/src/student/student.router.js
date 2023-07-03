const { StudentController } = require('./student.controller');

class StudentRouter {
  constructor(router) {
    this.router = router;
    this.studentController = new StudentController();
  }

  execute() {
    this.router.post('/', this.studentController.handleCreateStudent);
    this.router.get('/', this.studentController.handleGetAll);
    this.router.get('/:student_id', this.studentController.handleGetById);
    this.router.put('/:student_id', this.studentController.handleUpdateStudent);
    this.router.post(`/entrar`, this.studentController.handleSignIn);
    this.router.post('/cadastrar', this.studentController.handleSignUp);
  }
}

module.exports = { StudentRouter };
