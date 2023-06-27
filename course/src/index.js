const fastify = require('fastify');
require('dotenv').config();

// Application clients
const { dbConnect, dbDisconnect } = require('./clients/prisma.client');
const { rmqServer } = require('./servers/rmq.server');

// Application modules
const { CourseModule } = require('./course/course.module');

async function bootstrap() {
  const app = fastify();
  const port = process.env.PORT || 3003;

  app.getDefaultJsonParser();

  // Iniciando clients da aplicação
  await dbConnect();
  await rmqServer.connect(process.env.RABBITMQ_URI);

  // Iniciando módulos da aplicação
  new CourseModule(app).execute();

  app.listen({ port }, () => {
    console.log(`Application is running at port ${port}`);
    console.log(app.printRoutes());
  });

  process.on('beforeExit', async () => {
    await dbDisconnect();
    await rmqServer.disconnect();
  });
}

bootstrap();
