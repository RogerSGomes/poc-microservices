const { CourseRepository } = require('./course.repository');
const { NotFoundException, BadRequestException } = require('../exceptions');

class CourseService {
  constructor() {
    this.courseRepository = new CourseRepository();
  }

  async getAll() {
    const courses = await this.courseRepository.findAll();
    const coursesAmount = await this.courseRepository.count();

    return { courses, coursesAmount };
  }

  async getById(curso_id) {
    const course = await this.courseRepository.findById(curso_id);

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

    return await this.courseRepository.createOffering(course_id, createOfferingDTO).then(async createdOffering => {
      await this.courseRepository.createSubscription(createdOffering.id, inscricao);

      return await this.courseRepository.findOfferingById(createdOffering.id);
    });
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
      const updated_docentes_unicamp = [...docentes_unicamp, asignUnicampDTO];

      return await this.courseRepository.update(course_id, {
        docentes_unicamp: updated_docentes_unicamp,
      });
    }
  }

  async asignAttached(course_id, asignAttachedDTO) {
    const { docentes_vinculo } = await this.getById(course_id);

    if (docentes_vinculo.find(docente => asignAttachedDTO.id === docente.id)) {
      throw new BadRequestException('Este professor já está vinculado a este curso.');
    } else {
      const updated_docentes_vinculo = [...docentes_vinculo, asignAttachedDTO];

      return await this.courseRepository.update(course_id, {
        docentes_vinculo: updated_docentes_vinculo,
      });
    }
  }

  async asignUnattached(course_id, asignUnattachedDTO) {
    const { docentes_sem_vinculo } = await this.getById(course_id);

    if (docentes_sem_vinculo.find(docente => asignUnattachedDTO.nome === docente.nome)) {
      throw new BadRequestException('Este professor já está vinculado a este curso.');
    } else {
      const updated_docentes_sem_vinculo = [...docentes_sem_vinculo, asignUnattachedDTO];

      return await this.courseRepository.update(course_id, {
        docentes_sem_vinculo: updated_docentes_sem_vinculo,
      });
    }
  }

  async asignSpeaker(course_id, asignSpeakerDTO) {
    const { palestrantes } = await this.getById(course_id);

    if (palestrantes.find(palestrante => asignSpeakerDTO.nome === palestrante.nome)) {
      throw new BadRequestException('Este palestrante já está vinculado a este curso.');
    } else {
      const updated_palestrantes = [...palestrantes, asignSpeakerDTO];

      return await this.courseRepository.update(course_id, {
        palestrantes: updated_palestrantes,
      });
    }
  }

  async subscribeStudent(course_id, student_id) {
    const { alunos } = await this.getById(course_id);

    if (alunos.find(aluno_id => aluno_id === student_id)) {
      throw new BadRequestException('Este aluno já está inscrito neste curso.');
    } else {
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
