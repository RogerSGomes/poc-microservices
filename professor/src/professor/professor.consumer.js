const { ProfessorService } = require('./professor.service');
const { UpdateProfessorDTO } = require('./dtos');

const { rmqServer } = require('../servers/rmq.server');

class ProfessorConsumer {
  constructor() {
    this.professorService = new ProfessorService();
  }

  async execute() {}

  async updateProfessorConsumer() {
    await rmqServer.channel.assertQueue('update_professor_queue');
    await rmqServer.channel.consume('update_professor_queue', async message => {
      try {
        const messageObject = JSON.parse(message.content.toString());
        const updateProfessorDTO = new UpdateProfessorDTO(messageObject.dto);

        await this.professorService.updateProfessor(messageObject.professor_id, updateProfessorDTO);
      } catch (error) {
        console.log(error);
      } finally {
        rmqServer.channel.ack(message);
      }
    });
  }
}

module.exports = { ProfessorConsumer };
