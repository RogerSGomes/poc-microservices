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
    this.router.post('/', { onRequest: this.authMiddleware.ensureAuthenticated }, this.courseController.handleCreateCourse);
    this.router.get('/:course_id', { onRequest: this.authMiddleware.ensureAuthenticated }, this.courseController.handleGetById);
    this.router.put('/:course_id', { onRequest: this.authMiddleware.ensureAuthenticated }, this.courseController.handleUpdateCourse);
    this.router.post('/:course_id/oferecimento', { onRequest: this.authMiddleware.ensureAuthenticated }, this.courseController.handleCreateOffering);
    this.router.put('/:course_id/oferecimento', { onRequest: this.authMiddleware.ensureAuthenticated }, this.courseController.handleUpdateOffering);
    this.router.post('/:course_id/custos-oferecimento', { onRequest: this.authMiddleware.ensureAuthenticated }, this.courseController.handleCreateOfferingCosts);
    this.router.put('/:course_id/custos-oferecimento', { onRequest: this.authMiddleware.ensureAuthenticated }, this.courseController.handleUpdateOfferingCosts);
    this.router.post('/:course_id/custos-oferecimento/taxas', { onRequest: this.authMiddleware.ensureAuthenticated }, this.courseController.handleCreateOfferingCostsTax);
    this.router.put('/:course_id/custos-oferecimento/taxas', { onRequest: this.authMiddleware.ensureAuthenticated }, this.courseController.handleUpdateOfferingCostsTax);
    this.router.post('/:course_id/custos-oferecimento/condicoes', { onRequest: this.authMiddleware.ensureAuthenticated }, this.courseController.handleCreateOfferingCostsConditions);
    this.router.put('/:course_id/custos-oferecimento/condicoes', { onRequest: this.authMiddleware.ensureAuthenticated }, this.courseController.handleUpdateOfferingCostsConditions);
    this.router.post('/:course_id/coordenacao', { onRequest: this.authMiddleware.ensureAuthenticated }, this.courseController.handleAsignCoordination);
    this.router.post('/:course_id/docentes/unicamp', { onRequest: this.authMiddleware.ensureAuthenticated }, this.courseController.handleAsignUnicamp);
    this.router.put('/:course_id/docentes/unicamp/:unicamp_id', { onRequest: this.authMiddleware.ensureAuthenticated }, this.courseController.handleUpdateUnicamp);
    this.router.post('/:course_id/docentes/com-vinculo', { onRequest: this.authMiddleware.ensureAuthenticated }, this.courseController.handleAsignAttached);
    this.router.put('/:course_id/docentes/com-vinculo/:attached_id', { onRequest: this.authMiddleware.ensureAuthenticated }, this.courseController.handleUpdateAttached);
    this.router.post('/:course_id/docentes/sem-vinculo', { onRequest: this.authMiddleware.ensureAuthenticated }, this.courseController.handleAsignUnattached);
    this.router.put('/:course_id/docentes/sem-vinculo/:unattached_id', { onRequest: this.authMiddleware.ensureAuthenticated }, this.courseController.handleUpdateUnattached);
    this.router.post('/:course_id/palestrantes', { onRequest: this.authMiddleware.ensureAuthenticated }, this.courseController.handleAsignSpeaker);
    this.router.put('/:course_id/palestrantes/:speaker_id', { onRequest: this.authMiddleware.ensureAuthenticated }, this.courseController.handleUpdateSpeaker);
    this.router.post('/:course_id/inscrever', { onRequest: this.authMiddleware.ensureAuthenticated }, this.courseController.handleSubscribeStudent);
    this.router.delete('/:course_id/desinscrever', { onRequest: this.authMiddleware.ensureAuthenticated }, this.courseController.handleUnsubscribeStudent);
  }
}

module.exports = { CourseRouter };
