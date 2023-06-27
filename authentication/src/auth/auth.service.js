const jwt = require('jsonwebtoken');

class AuthService {
  async authenticate({ dto, model, role }) {
    const isValidCredentials = model?.senha === dto.senha;

    if (!isValidCredentials) {
      return {
        status: 401,
        error: 'Credenciais incorretas.',
      };
    }

    return {
      access_token: jwt.sign({ sub: model.id, role: role }, process.env.JWT_SECRET),
    };
  }

  ensureAuthenticated(token) {
    console.log(token);
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
