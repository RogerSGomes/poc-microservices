const { CourseService } = require('./course.service');
const {
  CreateCourseDTO,
  CreateOfferingDTO,
  AsignCoordinationDTO,
  AsignUnicampDTO,
  AsignAttachedDTO,
  AsignUnattachedDTO,
  AsignSpeakerDTO,
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

    res.status(200).send(course);
  };

  handleGetCourseOffering = async (req, res) => {
    const { curso_id } = req.params;

    const { oferecimento } = await this.courseService.getById(curso_id);

    return res.status(200).send(oferecimento);
  };

  handleCreateCourse = async (req, res) => {
    const professor = await req.profile;
    const createCourseDto = new CreateCourseDTO(req.body);

    const createdCourse = await this.courseService.createCourse({
      created_by: professor.sub,
      ...createCourseDto,
    });

    return res.status(201).send(createdCourse);
  };

  handleCreateOffering = async (req, res) => {
    const { curso_id } = req.params;
    const createOfferingDTO = new CreateOfferingDTO(req.body);

    const createdOfferingAndSubscription = await this.courseService.createOfferingAndSubscription(
      curso_id,
      createOfferingDTO,
    );

    res.status(201).send(createdOfferingAndSubscription);
  };

  handleAsignCoordination = async (req, res) => {
    const asignCoordinationDTO = new AsignCoordinationDTO(req.body);
    const updatedCourse = await this.courseService.asignCoordination(req.params.curso_id, asignCoordinationDTO);

    return res.status(200).send(updatedCourse);
  };

  handleAsignUnicamp = async (req, res) => {
    const asignUnicampDTO = new AsignUnicampDTO(req.body);
    const updatedCourse = await this.courseService.asignUnicamp(req.params.curso_id, asignUnicampDTO);

    return res.status(200).send(updatedCourse);
  };

  handleAsignAttached = async (req, res) => {
    const asignAttachedDTO = new AsignAttachedDTO(req.body);
    const updatedCourse = await this.courseService.asignAttached(req.params.curso_id, asignAttachedDTO);

    return res.status(200).send(updatedCourse);
  };

  handleAsignUnattached = async (req, res) => {
    const asignUnattachedDTO = new AsignUnattachedDTO(req.body);
    const updatedCourse = await this.courseService.asignUnattached(req.params.curso_id, asignUnattachedDTO);

    return res.status(200).send(updatedCourse);
  };

  handleAsignSpeaker = async (req, res) => {
    const asignSpeakerDTO = new AsignSpeakerDTO(req.body);
    const updatedCourse = await this.courseService.asignSpeaker(req.params.curso_id, asignSpeakerDTO);

    return res.status(200).send(updatedCourse);
  };
}

module.exports = { CourseController };
