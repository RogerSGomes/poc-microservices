const { CourseService } = require('./course.service');
const {
  CreateCourseDTO,
  CreateOfferingDTO,
  CreateOfferingCostsDTO,
  CreateOfferingCostsTaxDTO,
  CreateOfferingCostsConditionsDTO,
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

    const course = await this.courseService.getById(curso_id);

    return res.status(200).send(course.oferecimento);
  };

  handleCreateCourse = async (req, res) => {
    const professor = await req.profile;
    const createCourseDto = new CreateCourseDTO(req.body);

    const createdCourse = await this.courseService.createCourse({
      ...createCourseDto,
      created_by: professor.sub,
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

  handleCreateOfferingCosts = async (req, res) => {
    const { curso_id } = req.params;
    const createOfferingCostsDTO = new CreateOfferingCostsDTO(req.body);

    const course = await this.courseService.getById(curso_id);
    const createdOfferingCosts = await this.courseService.createOfferingCosts(
      course.oferecimento.id,
      createOfferingCostsDTO,
    );

    return res.status(201).send(createdOfferingCosts);
  };

  handleCreateOfferingCostsTax = async (req, res) => {
    const { curso_id } = req.params;
    const createOfferingCostsTaxDTO = new CreateOfferingCostsTaxDTO(req.body);

    const course = await this.courseService.getById(curso_id);
    const createdOfferingCostsTax = await this.courseService.createOfferingCostsTax(
      course.oferecimento.custos_oferecimento.id,
      createOfferingCostsTaxDTO,
    );

    return res.status(201).send(createdOfferingCostsTax);
  };

  handleCreateOfferingCostsConditions = async (req, res) => {
    const { curso_id } = req.params;
    const createOfferingCostsConditionsDTO = new CreateOfferingCostsConditionsDTO(req.body);

    const course = await this.courseService.getById(curso_id);
    const createdOfferingCostsConditions = await this.courseService.createOfferingCostsConditions(
      course.oferecimento.custos_oferecimento.id,
      createOfferingCostsConditionsDTO,
    );

    return res.status(201).send(createdOfferingCostsConditions);
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

  handleSubscribeStudent = async (req, res) => {
    const { curso_id } = req.params;

    const subscribedStudent = await this.courseService.subscribeStudent(curso_id, req.profile.sub);

    res.status(200).send(subscribedStudent);
  };

  handleUnsubscribeStudent = async (req, res) => {
    const { curso_id } = req.params;

    const unsubscribedStudent = await this.courseService.unsubscribeStudent(curso_id, req.profile.sub);

    res.status(200).send(unsubscribedStudent);
  };
}

module.exports = { CourseController };
