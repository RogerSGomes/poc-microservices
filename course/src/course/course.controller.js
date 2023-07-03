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
  UpdateUnicampDTO,
  UpdateAttachedDTO,
  UpdateUnattachedDTO,
  UpdateSpeakerDTO,
} = require('./dtos');

class CourseController {
  constructor() {
    this.courseService = new CourseService();
  }

  handleGetAll = async (req, res) => {
    const { courses, coursesAmount } = await this.courseService.getAll();

    return res.status(200).send({
      result: courses,
      total: coursesAmount,
    });
  };

  handleGetById = async (req, res) => {
    const { course_id } = req.params;

    const course = await this.courseService.getById(course_id);
    return res.status(200).send(course);
  };

  handleGetCourseOffering = async (req, res) => {
    const { course_id } = req.params;

    const course = await this.courseService.getById(course_id);
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
    const { course_id } = req.params;
    const createOfferingDTO = new CreateOfferingDTO(req.body);

    const createdOfferingAndSubscription = await this.courseService.createOfferingAndSubscription(
      course_id,
      createOfferingDTO,
    );

    return res.status(201).send(createdOfferingAndSubscription);
  };

  handleCreateOfferingCosts = async (req, res) => {
    const { course_id } = req.params;
    const createOfferingCostsDTO = new CreateOfferingCostsDTO(req.body);

    const course = await this.courseService.getById(course_id);
    const createdOfferingCosts = await this.courseService.createOfferingCosts(
      course.oferecimento.id,
      createOfferingCostsDTO,
    );

    return res.status(201).send(createdOfferingCosts);
  };

  handleCreateOfferingCostsTax = async (req, res) => {
    const { course_id } = req.params;
    const createOfferingCostsTaxDTO = new CreateOfferingCostsTaxDTO(req.body);

    const course = await this.courseService.getById(course_id);
    const createdOfferingCostsTax = await this.courseService.createOfferingCostsTax(
      course.oferecimento.custos_oferecimento.id,
      createOfferingCostsTaxDTO,
    );

    return res.status(201).send(createdOfferingCostsTax);
  };

  handleCreateOfferingCostsConditions = async (req, res) => {
    const { course_id } = req.params;
    const createOfferingCostsConditionsDTO = new CreateOfferingCostsConditionsDTO(req.body);

    const course = await this.courseService.getById(course_id);
    const createdOfferingCostsConditions = await this.courseService.createOfferingCostsConditions(
      course.oferecimento.custos_oferecimento.id,
      createOfferingCostsConditionsDTO,
    );

    return res.status(201).send(createdOfferingCostsConditions);
  };

  handleAsignCoordination = async (req, res) => {
    const { course_id } = req.params;
    const asignCoordinationDTO = new AsignCoordinationDTO(req.body);

    const updatedCourse = await this.courseService.asignCoordination(course_id, asignCoordinationDTO);
    return res.status(200).send(updatedCourse);
  };

  handleAsignUnicamp = async (req, res) => {
    const { course_id } = req.params;
    const asignUnicampDTO = new AsignUnicampDTO(req.body);

    const updatedCourse = await this.courseService.asignUnicamp(course_id, asignUnicampDTO);
    return res.status(200).send(updatedCourse);
  };

  handleUpdateUnicamp = async (req, res) => {
    const { course_id, unicamp_id } = req.params;
    const updateUnicampDTO = new UpdateUnicampDTO(req.body);

    const updatedCourse = await this.courseService.updateUnicamp(course_id, unicamp_id, updateUnicampDTO);
    return res.status(200).send(updatedCourse);
  };

  handleAsignAttached = async (req, res) => {
    const { course_id } = req.params;
    const asignAttachedDTO = new AsignAttachedDTO(req.body);

    const updatedCourse = await this.courseService.asignAttached(course_id, asignAttachedDTO);
    return res.status(200).send(updatedCourse);
  };

  handleUpdateAttached = async (req, res) => {
    const { course_id, attached_id } = req.params;
    const updateAttachedDTO = new UpdateAttachedDTO(req.body);

    const updatedCourse = await this.courseService.updateAttached(course_id, attached_id, updateAttachedDTO);
    return res.status(200).send(updatedCourse);
  };

  handleAsignUnattached = async (req, res) => {
    const { course_id } = req.params;
    const asignUnattachedDTO = new AsignUnattachedDTO(req.body);

    const updatedCourse = await this.courseService.asignUnattached(course_id, asignUnattachedDTO);
    return res.status(200).send(updatedCourse);
  };

  handleUpdateUnattached = async (req, res) => {
    const { course_id, unattached_id } = req.params;
    const updateUnattachedDTO = new UpdateUnattachedDTO(req.body);

    const updatedCourse = await this.courseService.updateUnattached(course_id, unattached_id, updateUnattachedDTO);
    return res.status(200).send(updatedCourse);
  };

  handleAsignSpeaker = async (req, res) => {
    const { course_id } = req.params;
    const asignSpeakerDTO = new AsignSpeakerDTO(req.body);

    const updatedCourse = await this.courseService.asignSpeaker(course_id, asignSpeakerDTO);
    return res.status(200).send(updatedCourse);
  };

  handleUpdateSpeaker = async (req, res) => {
    const { course_id, speaker_id } = req.params;
    const updateSpeakerDTO = new UpdateSpeakerDTO(req.body);

    const updatedCourse = await this.courseService.updateSpeaker(course_id, speaker_id, updateSpeakerDTO);
    return res.status(200).send(updatedCourse);
  };

  handleSubscribeStudent = async (req, res) => {
    const { course_id } = req.params;

    const subscribedStudent = await this.courseService.subscribeStudent(course_id, req.profile.sub, req.body);
    return res.status(200).send(subscribedStudent);
  };

  handleUnsubscribeStudent = async (req, res) => {
    const { course_id } = req.params;

    const unsubscribedStudent = await this.courseService.unsubscribeStudent(course_id, req.profile.sub);
    return res.status(200).send(unsubscribedStudent);
  };
}

module.exports = { CourseController };
