const jwt = require('jsonwebtoken');

const { rmqServer } = require('../servers/rmq.server');

class AuthService {
  async authenticate(signInDTO) {
    const reply = await rmqServer.executeRPC({
      message: signInDTO,
      queue: 'auth_identity_queue',
      replyQueue: 'auth_response_queue',
      correlationId: signInDTO.login,
    });

    return reply;
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
