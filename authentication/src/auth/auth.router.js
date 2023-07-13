const { AuthController } = require('./auth.controller');

class AuthRouter {
  constructor(router) {
    this.router = router;
    this.authController = new AuthController();
  }

  execute() {
    this.router.post(`/entrar`, this.authController.handleSignIn);
  }
}

module.exports = { AuthRouter };
