const { ForbiddenException } = require('../../exceptions');
const { rmqServer } = require('../../servers/rmq.server');

class AuthMiddleware {
  async ensureAuthenticated(req, res) {
    const token = extractTokenFromHeaders(req.headers);

    const { role, sub } = await rmqServer.executeRPC({
      message: token,
      queue: 'ensure_authenticated_queue',
      correlationId: token,
    });

    const professorAllowedPaths = [
      { method: 'GET', path: '/cursos' },
      { method: 'POST', path: '/cursos' },
      { method: 'GET', path: '/cursos/:course_id' },
      { method: 'PUT', path: '/cursos/:course_id' },
      { method: 'DELETE', path: '/cursos/:course_id' },
      { method: 'POST', path: '/cursos/:course_id/oferecimento' },
      { method: 'PUT', path: '/cursos/:course_id/oferecimento' },
      { method: 'POST', path: '/cursos/:course_id/custos-oferecimento' },
      { method: 'PUT', path: '/cursos/:course_id/custos-oferecimento' },
      { method: 'POST', path: '/cursos/:course_id/custos-oferecimento/taxas' },
      { method: 'PUT', path: '/cursos/:course_id/custos-oferecimento/taxas' },
      { method: 'POST', path: '/cursos/:course_id/custos-oferecimento/condicoes' },
      { method: 'PUT', path: '/cursos/:course_id/custos-oferecimento/condicoes' },
      { method: 'POST', path: '/cursos/:course_id/coordenacao' },
      { method: 'PUT', path: '/cursos/:course_id/coordenacao' },
      { method: 'POST', path: '/cursos/:course_id/docentes/unicamp' },
      { method: 'PUT', path: '/cursos/:course_id/docentes/unicamp/:unicamp_id' },
      { method: 'DELETE', path: '/cursos/:course_id/docentes/unicamp/:unicamp_id' },
      { method: 'POST', path: '/cursos/:course_id/docentes/com-vinculo' },
      { method: 'PUT', path: '/cursos/:course_id/docentes/com-vinculo/:attached_id' },
      { method: 'DELETE', path: '/cursos/:course_id/docentes/com-vinculo/:attached_id' },
      { method: 'POST', path: '/cursos/:course_id/docentes/sem-vinculo' },
      { method: 'PUT', path: '/cursos/:course_id/docentes/sem-vinculo/:unattached_id' },
      { method: 'DELETE', path: '/cursos/:course_id/docentes/sem-vinculo/:unattached_id' },
      { method: 'POST', path: '/cursos/:course_id/palestrantes' },
      { method: 'PUT', path: '/cursos/:course_id/palestrantes/:speaker_id' },
      { method: 'DELETE', path: '/cursos/:course_id/palestrantes/:speaker_id' },
    ];

    const studentAllowedPaths = [
      { method: 'GET', path: '/cursos' },
      { method: 'GET', path: '/cursos/:course_id' },
      { method: 'POST', path: '/cursos/:course_id/inscrever' },
      { method: 'DELETE', path: '/cursos/:course_id/desinscrever' },
    ];

    const hasPathPermision =
      role === 'student'
        ? studentAllowedPaths.find(({ method, path }) => method === req.method && path === req.routerPath)
        : professorAllowedPaths.find(({ method, path }) => method === req.method && path === req.routerPath);

    if (!hasPathPermision) {
      throw new ForbiddenException('Acesso restrito.');
    }

    req.profile = { sub };
  }
}

function extractTokenFromHeaders(headers) {
  const [type, token] = headers.authorization?.split(' ') ?? [];
  return token ?? '';
}

module.exports = { AuthMiddleware };
