const { rmqServer } = require('../../servers/rmq.server');

class AuthMiddleware {
  async ensureAuthenticated(req, res, next) {
    const token = extractTokenFromHeaders(req.headers);

    const tokenPayload = await rmqServer.executeRPC({
      message: token,
      queue: 'ensure_authenticated_queue',
      replyQueue: 'ensure_authenticated_response_queue',
      correlationId: token,
    });

    req.profile = tokenPayload;

    next();
  }
}

function extractTokenFromHeaders(headers) {
  const [type, token] = headers.authorization?.split(' ') ?? [];
  return token ?? '';
}

module.exports = { AuthMiddleware };
