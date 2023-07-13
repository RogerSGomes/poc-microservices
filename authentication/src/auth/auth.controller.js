const { AuthService } = require('./auth.service');
const { SignInDTO } = require('./dtos');

class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  handleSignIn = async (req, res) => {
    const signInDTO = new SignInDTO(req.body);

    const authenticatedUser = await this.authService.authenticate(signInDTO);
    res.status(200).send(authenticatedUser);
  };
}

module.exports = { AuthController };
