const jwt = require("jsonwebtoken");

const { rmqServer } = require("../servers/rmq.server");
const { UnauthorizedException, ForbiddenException } = require("../exceptions");

class AuthService {
    async authenticate({ login, senha }) {
        try {
            const { model, role } = await this.verifyLogin(login);

            if (model.senha != senha) {
                throw new Error("Senha incorreta.");
            }

            return {
                user_id: model.id,
                path: role,
                access_token: jwt.sign(
                    { sub: model.id, role },
                    process.env.JWT_SECRET
                ),
            };
        } catch (error) {
            throw new UnauthorizedException("Credenciais incorretas.");
        }
    }

    async verifyLogin(login) {
        try {
            const professor = await rmqServer.executeRPC({
                message: { login },
                queue: "auth_professor_queue",
                correlationId: login,
            });

            return {
                model: professor,
                role: "professor/offerings",
            };
        } catch (error) {
            const student = await rmqServer.executeRPC({
                message: { login },
                queue: "auth_student_queue",
                correlationId: login,
            });

            return {
                model: student,
                role: "student",
            };
        }
    }

    ensureAuthenticated(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            throw new ForbiddenException(error.message);
        }
    }
}

module.exports = { AuthService };
