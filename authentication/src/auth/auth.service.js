const jwt = require('jsonwebtoken');

class AuthService {
  authenticate({ dto, model, role }) {
    const isValidCredentials = model?.senha === dto.senha;

    return !isValidCredentials
      ? {
          status: 401,
          error: 'Credenciais incorretas.',
        }
      : {
          access_token: jwt.sign({ sub: model.id, role }, process.env.JWT_SECRET),
        };
  }

  ensureAuthenticated(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return {
        status: 403,
        error: error.message,
      };
    }
  }
}

module.exports = { AuthService };
