const { AuthService } = require('./auth.service');

class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  handleSignIn(req, res) {}
}

module.exports = { AuthController };
