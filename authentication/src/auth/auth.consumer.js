const { AuthService } = require('./auth.service');
const { rmqServer } = require('../servers/rmq.server');

class AuthConsumer {
  constructor() {
    this.authService = new AuthService();
  }

  async execute() {
    await this.ensureAuthenticatedConsumer();
  }

  async ensureAuthenticatedConsumer() {
    await rmqServer.channel.assertQueue('ensure_authenticated_queue');
    await rmqServer.channel.consume('ensure_authenticated_queue', message => {
      try {
        const result = this.authService.ensureAuthenticated(JSON.parse(message.content.toString()));

        rmqServer.channel.sendToQueue(message.properties.replyTo, Buffer.from(JSON.stringify(result)), {
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

module.exports = { AuthConsumer };
