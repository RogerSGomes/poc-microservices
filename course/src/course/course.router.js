const { CourseController } = require('./course.controller');
const { AuthMiddleware } = require('./middlewares/auth.middleware');

class CourseRouter {
  constructor(router) {
    this.router = router;
    this.courseController = new CourseController();
    this.authMiddleware = new AuthMiddleware();
  }

  execute() {
    this.router.get('/', { onRequest: this.authMiddleware.ensureAuthenticated }, this.courseController.handleGetAll);
    this.router.get(
      '/:course_id',
      { onRequest: this.authMiddleware.ensureAuthenticated },
      this.courseController.handleGetById,
    );
    this.router.post(
      '/',
      { onRequest: this.authMiddleware.ensureAuthenticated },
      this.courseController.handleCreateCourse,
    );
    this.router.get(
      '/:course_id/oferecimento',
      { onRequest: this.authMiddleware.ensureAuthenticated },
      this.courseController.handleGetCourseOffering,
    );
    this.router.post(
      '/:course_id/oferecimento',
      { onRequest: this.authMiddleware.ensureAuthenticated },
      this.courseController.handleCreateOffering,
    );
    this.router.post(
      '/:course_id/custos-oferecimento',
      { onRequest: this.authMiddleware.ensureAuthenticated },
      this.courseController.handleCreateOfferingCosts,
    );
    this.router.post(
      '/:course_id/custos-oferecimento/taxas',
      { onRequest: this.authMiddleware.ensureAuthenticated },
      this.courseController.handleCreateOfferingCostsTax,
    );
    this.router.post(
      '/:course_id/custos-oferecimento/condicoes',
      { onRequest: this.authMiddleware.ensureAuthenticated },
      this.courseController.handleCreateOfferingCostsConditions,
    );
    this.router.patch(
      '/:course_id/coordenacao',
      { onRequest: this.authMiddleware.ensureAuthenticated },
      this.courseController.handleAsignCoordination,
    );
    this.router.patch(
      '/:course_id/docentes/unicamp',
      { onRequest: this.authMiddleware.ensureAuthenticated },
      this.courseController.handleAsignUnicamp,
    );
    this.router.patch(
      '/:course_id/docentes/com-vinculo',
      { onRequest: this.authMiddleware.ensureAuthenticated },
      this.courseController.handleAsignAttached,
    );
    this.router.patch(
      '/:course_id/docentes/sem-vinculo',
      { onRequest: this.authMiddleware.ensureAuthenticated },
      this.courseController.handleAsignUnattached,
    );
    this.router.patch(
      '/:course_id/palestrantes',
      { onRequest: this.authMiddleware.ensureAuthenticated },
      this.courseController.handleAsignSpeaker,
    );
    this.router.patch(
      '/:course_id/inscrever',
      { onRequest: this.authMiddleware.ensureAuthenticated },
      this.courseController.handleSubscribeStudent,
    );
    this.router.delete(
      '/:course_id/desinscrever',
      { onRequest: this.authMiddleware.ensureAuthenticated },
      this.courseController.handleUnsubscribeStudent,
    );
  }
}

module.exports = { CourseRouter };
