const jwt = require('jsonwebtoken');

const { rmqServer } = require('../servers/rmq.server');
const { UnauthorizedException } = require('../exceptions/unauthorized.exception');

class AuthService {
  async verifyLogin(login) {
    try {
      const result = await rmqServer.executeRPC({
        message: { login },
        queue: 'auth_professor_queue',
        replyQueue: 'auth_response_queue',
        correlationId: login,
      });

      return {
        model: result,
        role: 'Professor',
      };
    } catch (error) {
      console.log(error);
      return await rmqServer.executeRPC({
        message: { login },
        queue: 'auth_student_queue',
        replyQueue: 'auth_response_queue',
        correlationId: login,
      });
    }
  }

  async authenticate(signInDTO) {
    try {
      const result = await this.verifyLogin(signInDTO.login);
      return result;
    } catch (error) {
      throw new UnauthorizedException('Credenciais incorretas.');
    }
  }

  // authenticate({ dto, model, role }) {
  //   const isValidCredentials = model?.senha === dto.senha;

  //   return !isValidCredentials
  //     ? {
  //         status: 401,
  //         error: 'Credenciais incorretas.',
  //       }
  //     : {
  //         access_token: jwt.sign({ sub: model.id, role }, process.env.JWT_SECRET),
  //       };
  // }

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
