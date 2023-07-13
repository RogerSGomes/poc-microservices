const { ProfessorService } = require('./professor.service');
const { rmqServer } = require('../servers/rmq.server');

class ProfessorConsumer {
  constructor() {
    this.professorService = new ProfessorService();
  }

  async execute() {
    await this.authProfessorConsumer();
  }

  async authProfessorConsumer() {
    await rmqServer.channel.assertQueue('auth_professor_queue');
    await rmqServer.channel.consume('auth_professor_queue', async message => {
      try {
        const messageObject = JSON.parse(message.content.toString());
        const professor = await this.professorService.getByLogin(messageObject.login);

        rmqServer.channel.sendToQueue(message.properties.replyTo, Buffer.from(JSON.stringify(professor)), {
          correlationId: message.properties.correlationId,
        });
      } catch (error) {
        rmqServer.channel.sendToQueue(message.properties.replyTo, Buffer.from(JSON.stringify(error)), {
          correlationId: message.properties.correlationId,
        });
      } finally {
        rmqServer.channel.ack(message);
      }
    });
  }
}

module.exports = {
  ProfessorConsumer,
};
