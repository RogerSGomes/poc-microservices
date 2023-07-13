const { StudentService } = require('./student.service');
const { UpdateStudentDTO } = require('./dtos');

const { rmqServer } = require('../servers/rmq.server');

class StudentConsumer {
  constructor() {
    this.studentService = new StudentService();
  }

  async execute() {
    await this.authStudentConsumer();
    await this.updateStudentConsumer();
  }

  async authStudentConsumer() {
    await rmqServer.channel.assertQueue('auth_student_queue');
    await rmqServer.channel.consume('auth_student_queue', async message => {
      try {
        const messageObject = JSON.parse(message.content.toString());
        const student = await this.studentService.getByLogin(messageObject.login);

        rmqServer.channel.sendToQueue(message.properties.replyTo, Buffer.from(JSON.stringify(student)), {
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

  async updateStudentConsumer() {
    await rmqServer.channel.assertQueue('update_student_queue');
    await rmqServer.channel.consume('update_student_queue', async message => {
      try {
        const messageObject = JSON.parse(message.content.toString());
        const updateStudentDTO = new UpdateStudentDTO(messageObject.dto);

        await this.studentService.updateStudent(messageObject.student_id, updateStudentDTO);
      } catch (error) {
        console.log(error);
      } finally {
        rmqServer.channel.ack(message);
      }
    });
  }
}

module.exports = { StudentConsumer };
