const fastify = require('fastify');
require('dotenv').config();

// Application servers
const { rmqServer } = require('./servers/rmq.server');
const { dbConnect, dbDisconnect } = require('./clients/prisma.client');

// Application modules
const { StudentModule } = require('./student/student.module');
const { StudentConsumer } = require('./student/student.consumer');

async function bootstrap() {
  const app = fastify();
  const port = process.env.PORT || 3001;

  app.getDefaultJsonParser();

  // Iniciando servers
  await rmqServer.connect(process.env.RABBITMQ_URI);
  await dbConnect();

  // Iniciando módulos
  new StudentModule(app).execute();
  await new StudentConsumer().execute();

  app.listen({ port }, () => {
    console.log(`Application is running at port ${port}`);
    console.log(app.printRoutes());
  });

  process.on('beforeExit', async () => {
    await rmqServer.disconnect();
    await dbDisconnect();
  });
}

bootstrap();
