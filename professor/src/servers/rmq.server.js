const amqp = require('amqplib');

class RmqServer {
  async connect(uri) {
    this.connection = await amqp.connect(uri);
    this.channel = await this.connection.createChannel();
  }

  async disconnect() {
    await this.connection.close();
  }

  async executeRPC({ message, queue, correlationId }) {
    // Cria um canal apartado para executar a RPC
    const channel = await this.connection.createChannel();

    // Cria a fila de reply
    const replyQueue = (await channel.assertQueue('', { durable: false })).queue;

    // Envia a mensagem para o servidor
    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
      replyTo: replyQueue,
      correlationId: correlationId,
      persistent: true,
    });

    // Recebe a resposta do servidor
    const reply = await replyConsumer(channel, {
      replyQueue: replyQueue,
      correlationId: correlationId,
    });

    // Fecha o canal apartado
    await channel.close();

    // Deleta a fila de reply
    await this.channel.deleteQueue(replyQueue);

    // Processa a mensagem recebida
    if (reply.error) {
      throw reply;
    } else {
      return reply;
    }
  }
}

function replyConsumer(channel, { replyQueue, correlationId }) {
  return new Promise((resolve, reject) => {
    channel.consume(replyQueue, message => {
      if (message.properties.correlationId === correlationId) {
        const reply = JSON.parse(message.content.toString());
        channel.ack(message);
        resolve(reply);
      }
    });
  });
}

const rmqServer = new RmqServer();

module.exports = { rmqServer };
