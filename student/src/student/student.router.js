const { StudentController } = require('./student.controller');
const { AuthMiddleware } = require('./middlewares');

class StudentRouter {
  constructor(router) {
    this.router = router;
    this.studentController = new StudentController();
    this.authMiddleware = new AuthMiddleware();
  }

  execute() {
    this.router.post(
      '/',
      { onRequest: this.authMiddleware.ensureAuthenticated },
      this.studentController.handleCreateStudent,
    );
    this.router.get('/', { onRequest: this.authMiddleware.ensureAuthenticated }, this.studentController.handleGetAll);
    this.router.get(
      '/:student_id',
      { onRequest: this.authMiddleware.ensureAuthenticated },
      this.studentController.handleGetById,
    );
    this.router.put(
      '/:student_id',
      { onRequest: this.authMiddleware.ensureAuthenticated },
      this.studentController.handleUpdateStudent,
    );
    this.router.post(`/entrar`, this.studentController.handleSignIn);
    this.router.post('/cadastrar', this.studentController.handleSignUp);
  }
}

module.exports = { StudentRouter };
