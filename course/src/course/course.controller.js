const { CourseService } = require('./course.service');
const {
  CreateCourseDTO,
  AsignCoordinationDTO,
  AsignUnicampDTO,
  AsignAttachedDTO,
  AsignUnattachedDTO,
  AsignSpeakerDTO,
  CreateOfferingDTO,
} = require('./dtos');

class CourseController {
  constructor() {
    this.courseService = new CourseService();
  }

  handleGetAll = async (req, res) => {
    const { courses, coursesAmount } = await this.courseService.getAll();

    res.status(200).send({
      result: courses,
      total: coursesAmount,
    });
  };

  handleGetById = async (req, res) => {
    const course = await this.courseService.getById(req.params.curso_id);

    res.status(200).send({
      result: course,
    });
  };

  handleCreateCourse = async (req, res) => {
    const professor = req.profile;

    const createCourseDto = new CreateCourseDTO(req.body);
    const createdCourse = await this.courseService.createCourse({
      created_by: professor.sub,
      ...createCourseDto,
    });

    return res.status(201).send({
      result: createdCourse,
    });
  };

  handleCreateOffering = async (req, res) => {
    const { curso_id } = req.params;
    const { inscricao, ...createOfferingDTO } = new CreateOfferingDTO(req.body);

    const createdOffering = await this.courseService.createOffering(curso_id, createOfferingDTO);
    const createdSubscription = await this.courseService.createSubscription(createdOffering.id, inscricao);

    res.status(201).send({
      createdOffering,
      createdSubscription,
    });
  };

  handleAsignCoordination = async (req, res) => {
    const asignCoordinationDTO = new AsignCoordinationDTO(req.body);
    const updatedCourse = await this.courseService.asignCoordination(req.params.curso_id, asignCoordinationDTO);

    return res.status(200).send({
      result: updatedCourse,
    });
  };

  handleAsignUnicamp = async (req, res) => {
    const asignUnicampDTO = new AsignUnicampDTO(req.body);
    const updatedCourse = await this.courseService.asignUnicamp(req.params.curso_id, asignUnicampDTO);

    return res.status(200).send({
      result: updatedCourse,
    });
  };

  handleAsignAttached = async (req, res) => {
    const asignAttachedDTO = new AsignAttachedDTO(req.body);
    const updatedCourse = await this.courseService.asignAttached(req.params.curso_id, asignAttachedDTO);

    return res.status(200).send({
      result: updatedCourse,
    });
  };

  handleAsignUnattached = async (req, res) => {
    const asignUnattachedDTO = new AsignUnattachedDTO(req.body);
    const updatedCourse = await this.courseService.asignUnattached(req.params.curso_id, asignUnattachedDTO);

    return res.status(200).send({
      result: updatedCourse,
    });
  };

  handleAsignSpeaker = async (req, res) => {
    const asignSpeakerDTO = new AsignSpeakerDTO(req.body);
    const updatedCourse = await this.courseService.asignSpeaker(req.params.curso_id, asignSpeakerDTO);

    return res.status(200).send({
      result: updatedCourse,
    });
  };
}

module.exports = { CourseController };
