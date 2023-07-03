const { CourseRepository } = require('./course.repository');
const { NotFoundException, BadRequestException } = require('../exceptions');
const uuid = require('uuid');

const { rmqServer } = require('../servers/rmq.server');

class CourseService {
  constructor() {
    this.courseRepository = new CourseRepository();
  }

  async getAll() {
    const courses = await this.courseRepository.findAll();
    const coursesAmount = await this.courseRepository.count();

    return { courses, coursesAmount };
  }

  async getById(course_id) {
    const course = await this.courseRepository.findById(course_id);

    if (!course) {
      throw new NotFoundException('Curso não encontrado.');
    }

    return course;
  }

  async createCourse(createCourseDTO) {
    return await this.courseRepository.create(createCourseDTO);
  }

  async createOfferingAndSubscription(course_id, { inscricao, ...createOfferingDTO }) {
    await this.getById(course_id);

    const createdOffering = await this.courseRepository.createOffering(course_id, createOfferingDTO);
    await this.courseRepository.createSubscription(createdOffering.id, inscricao);

    return await this.courseRepository.findOfferingById(createdOffering.id);
  }

  async createOfferingCosts(offering_id, createOfferingCostsDTO) {
    return await this.courseRepository.createOfferingCosts(offering_id, createOfferingCostsDTO);
  }

  async createOfferingCostsTax(costs_id, createOfferingCostsTaxDTO) {
    return await this.courseRepository.createOfferingCostsTax(costs_id, createOfferingCostsTaxDTO);
  }

  async createOfferingCostsConditions(costs_id, createOfferingCostsConditionsDTO) {
    return await this.courseRepository.createOfferingCostsConditions(costs_id, createOfferingCostsConditionsDTO);
  }

  async asignCoordination(course_id, asignCoordinationDTO) {
    await this.getById(course_id);

    return await this.courseRepository.update(course_id, asignCoordinationDTO);
  }

  async asignUnicamp(course_id, asignUnicampDTO) {
    const { docentes_unicamp } = await this.getById(course_id);

    if (docentes_unicamp.find(docente => asignUnicampDTO.id === docente.id)) {
      throw new BadRequestException('Este professor já está vinculado a este curso.');
    } else {
      const updatedUnicamp = [...docentes_unicamp, asignUnicampDTO];

      await this.courseRepository.update(course_id, {
        docentes_unicamp: updatedUnicamp,
      });

      return updatedUnicamp;
    }
  }

  async asignAttached(course_id, asignAttachedDTO) {
    const { docentes_vinculo } = await this.getById(course_id);

    if (docentes_vinculo.find(docente => asignAttachedDTO.id === docente.id)) {
      throw new BadRequestException('Este professor já está vinculado a este curso.');
    } else {
      const updatedAttached = [...docentes_vinculo, asignAttachedDTO];

      await this.courseRepository.update(course_id, {
        docentes_vinculo: updatedAttached,
      });

      return updatedAttached;
    }
  }

  async asignUnattached(course_id, asignUnattachedDTO) {
    const { docentes_sem_vinculo } = await this.getById(course_id);

    if (docentes_sem_vinculo.find(docente => asignUnattachedDTO.nome === docente.nome)) {
      throw new BadRequestException('Este professor já está vinculado a este curso.');
    } else {
      const updatedUnattached = [...docentes_sem_vinculo, { id: uuid.v4(), ...asignUnattachedDTO }];

      await this.courseRepository.update(course_id, {
        docentes_sem_vinculo: updatedUnattached,
      });

      return updatedUnattached;
    }
  }

  async asignSpeaker(course_id, asignSpeakerDTO) {
    const { palestrantes } = await this.getById(course_id);

    if (palestrantes.find(palestrante => asignSpeakerDTO.nome === palestrante.nome)) {
      throw new BadRequestException('Este palestrante já está vinculado a este curso.');
    } else {
      const updatedSpeakers = [...palestrantes, { id: uuid.v4(), ...asignSpeakerDTO }];

      await this.courseRepository.update(course_id, {
        palestrantes: updatedSpeakers,
      });

      return updatedSpeakers;
    }
  }

  async subscribeStudent(course_id, student_id, studentDTO) {
    const { alunos } = await this.getById(course_id);

    if (alunos.find(aluno_id => aluno_id === student_id)) {
      throw new BadRequestException('Este aluno já está inscrito neste curso.');
    } else {
      // Envia à fila de atualização de alunos a DTO a ser atualizada para o aluno.
      rmqServer.channel.sendToQueue(
        'update_student_queue',
        Buffer.from(JSON.stringify({ student_id, dto: studentDTO })),
      );

      const updated_students = [...alunos, student_id];

      await this.courseRepository.update(course_id, {
        alunos: updated_students,
      });

      return updated_students;
    }
  }

  async unsubscribeStudent(course_id, student_id) {
    const { alunos } = await this.getById(course_id);
    const studentIndex = alunos.findIndex(aluno_id => aluno_id === student_id);

    if (studentIndex < 0) {
      throw new BadRequestException('Este aluno não está inscrito neste curso.');
    } else {
      alunos.splice(studentIndex, 1);

      await this.courseRepository.update(course_id, {
        alunos,
      });

      return alunos;
    }
  }
}

module.exports = { CourseService };
