const { fastify } = require('fastify');
require('dotenv').config();

// Application clients
const { dbConnect } = require('./clients/prisma.client');

// Application servers
const { rmqServer } = require('./servers/rmq.server');

// Application modules
const { ProfessorModule } = require('./professor/professor.module');

async function bootstrap() {
  const app = fastify();
  const port = process.env.PORT || 3000;

  app.getDefaultJsonParser();

  // Iniciando clients
  await rmqServer.connect(process.env.RABBITMQ_URI);
  await dbConnect();

  // Iniciando módulos
  new ProfessorModule(app).execute();

  app.listen({ port }, () => {
    console.log(`Application is running at port ${port}`);
    console.log(app.printRoutes());
  });

  process.on('beforeExit', async () => {
    await rmqServer.disconnect();
    await disconnectFromRMQ();
  });
}

bootstrap();
