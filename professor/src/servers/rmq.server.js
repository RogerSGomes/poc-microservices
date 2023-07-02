const { connect } = require('amqplib');

class RmqServer {
  async connect(uri) {
    this.connection = await connect(uri);
    this.channel = await this.connection.createChannel();
  }

  async disconnect() {
    await this.connection.close();
  }

  async executeRPC({ message, queue, replyQueue, correlationId }) {
    // Cria um canal apartado para executar a RPC
    const channel = await this.connection.createChannel();

    // Cria a fila de reply
    await channel.assertQueue(replyQueue, { durable: true });

    // Envia a mensagem para o servidor
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
      replyTo: replyQueue,
      correlationId: correlationId,
    });

    // Recebe a resposta do servidor
    const reply = await replyConsumer(channel, {
      replyQueue: replyQueue,
      correlationId: correlationId,
    });

    // Fecha o canal apartado
    await channel.close();

    // Processa a mensagem recebida
    if (reply.error) {
      throw new Object(reply);
    } else {
      return reply.message;
    }
  }
}

function replyConsumer(channel, { replyQueue, correlationId }) {
  return new Promise(resolve => {
    channel.consume(
      replyQueue,
      message => {
        if (message.properties.correlationId === correlationId) {
          const reply = JSON.parse(message.content.toString());
          channel.ack(message);
          resolve(reply);
        }
      },
      { noAck: true },
    );
  });
}

const rmqServer = new RmqServer();

module.exports = { rmqServer };
