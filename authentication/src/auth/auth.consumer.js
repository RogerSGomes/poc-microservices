const { AuthService } = require('./auth.service');
const { rmqServer } = require('../servers/rmq.server');

class AuthConsumer {
  constructor() {
    this.authService = new AuthService();
  }

  async execute() {
    await this.authenticationConsumer();
    await this.ensureAuthenticatedConsumer();
  }

  async authenticationConsumer() {
    await rmqServer.channel.assertQueue('authentication_queue');
    await rmqServer.channel.consume('authentication_queue', message => {
      const result = this.authService.authenticate(JSON.parse(message.content.toString()));

      rmqServer.channel.sendToQueue(message.properties.replyTo, Buffer.from(JSON.stringify(result)), {
        correlationId: message.properties.correlationId,
      });

      rmqServer.channel.ack(message);
    });
  }

  async ensureAuthenticatedConsumer() {
    await rmqServer.channel.assertQueue('ensure_authenticated_queue');
    await rmqServer.channel.consume('ensure_authenticated_queue', message => {
      const result = this.authService.ensureAuthenticated(JSON.parse(message.content.toString()));

      rmqServer.channel.sendToQueue(message.properties.replyTo, Buffer.from(JSON.stringify(result)), {
        correlationId: message.properties.correlationId,
      });

      rmqServer.channel.ack(message);
    });
  }
}

module.exports = { AuthConsumer };
