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
      '/:curso_id',
      { onRequest: this.authMiddleware.ensureAuthenticated },
      this.courseController.handleGetById,
    );
    this.router.post(
      '/',
      { onRequest: this.authMiddleware.ensureAuthenticated },
      this.courseController.handleCreateCourse,
    );
    this.router.get(
      '/:curso_id/oferecimento',
      { onRequest: this.authMiddleware.ensureAuthenticated },
      this.courseController.handleGetCourseOffering,
    );
    this.router.post(
      '/:curso_id/oferecimento',
      { onRequest: this.authMiddleware.ensureAuthenticated },
      this.courseController.handleCreateOffering,
    );
    this.router.post(
      '/:curso_id/custos-oferecimento',
      { onRequest: this.authMiddleware.ensureAuthenticated },
      this.courseController.handleCreateOfferingCosts,
    );
    this.router.post(
      '/:curso_id/custos-oferecimento/taxas',
      { onRequest: this.authMiddleware.ensureAuthenticated },
      this.courseController.handleCreateOfferingCostsTax,
    );
    this.router.post(
      '/:curso_id/custos-oferecimento/condicoes',
      { onRequest: this.authMiddleware.ensureAuthenticated },
      this.courseController.handleCreateOfferingCostsConditions,
    );
    this.router.patch(
      '/:curso_id/coordenacao',
      { onRequest: this.authMiddleware.ensureAuthenticated },
      this.courseController.handleAsignCoordination,
    );
    this.router.patch(
      '/:curso_id/docentes/unicamp',
      { onRequest: this.authMiddleware.ensureAuthenticated },
      this.courseController.handleAsignUnicamp,
    );
    this.router.patch(
      '/:curso_id/docentes/com-vinculo',
      { onRequest: this.authMiddleware.ensureAuthenticated },
      this.courseController.handleAsignAttached,
    );
    this.router.patch(
      '/:curso_id/docentes/sem-vinculo',
      { onRequest: this.authMiddleware.ensureAuthenticated },
      this.courseController.handleAsignUnattached,
    );
    this.router.patch(
      '/:curso_id/palestrantes',
      { onRequest: this.authMiddleware.ensureAuthenticated },
      this.courseController.handleAsignSpeaker,
    );
  }
}

module.exports = { CourseRouter };
