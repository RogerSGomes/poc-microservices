const { CourseController } = require('./course.controller');
const { AuthMiddleware } = require('./middlewares/auth.middleware');

class CourseRouter {
  constructor(router) {
    this.router = router;
    this.courseController = new CourseController();
    this.authMiddleware = new AuthMiddleware();
  }

  execute() {
    this.router.post(
      '/',
      { onRequest: this.authMiddleware.ensureAuthenticated },
      this.courseController.handleCreateCourse,
    );
    this.router.post(
      '/:curso_id/coordination',
      { onRequest: this.authMiddleware.ensureAuthenticated },
      this.courseController.handleAsignCoordination,
    );
    this.router.get('/', { onRequest: this.authMiddleware.ensureAuthenticated }, this.courseController.handleGetAll);
  }
}

module.exports = { CourseRouter };
