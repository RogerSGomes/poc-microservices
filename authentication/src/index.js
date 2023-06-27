const fastify = require('fastify');
require('dotenv').config();

// Application servers
const { rmqServer } = require('./servers/rmq.server');

// Application modules
const { AuthConsumer } = require('./auth/auth.consumer');

async function bootstrap() {
  const app = fastify();
  const port = process.env.PORT || 3002;

  app.getDefaultJsonParser();

  // Iniciando servers
  await rmqServer.connect(process.env.RABBITMQ_URI);

  // Iniciando módulos
  new AuthConsumer().execute();

  app.listen({ port }, () => {
    console.log(`Application is running at port ${port}`);
    console.log(app.printRoutes());
  });

  process.on('beforeExit', async () => {
    await rmqServer.disconnect();
  });
}

bootstrap();
