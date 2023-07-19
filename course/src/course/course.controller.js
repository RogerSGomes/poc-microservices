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
  UpdateCourseDTO,
  UpdateOfferingDTO,
  UpdateOfferingCostsDTO,
  UpdateOfferingCostsTaxDTO,
  UpdateOfferingCostsConditionsDTO,
  UpdateUnicampDTO,
  UpdateAttachedDTO,
  UpdateUnattachedDTO,
  UpdateSpeakerDTO,
  UpdateCoordinationDTO,
  SubscribeStudentDTO,
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

  handleCreateCourse = async (req, res) => {
    const professor = await req.profile;
    const createCourseDto = new CreateCourseDTO(req.body);

    const createdCourse = await this.courseService.createCourse({
      ...createCourseDto,
      created_by: professor.sub,
    });

    return res.status(201).send(createdCourse);
  };

  handleUpdateCourse = async (req, res) => {
    const { course_id } = req.params;
    const updateCourseDTO = new UpdateCourseDTO(req.body);

    const updatedCourse = await this.courseService.updateCourse(course_id, updateCourseDTO);
    return res.status(200).send(updatedCourse);
  };

  handleDeleteCourse = async (req, res) => {
    const { course_id } = req.params;

    const deletedCourse = await this.courseService.deleteCourse(course_id);
    return res.status(200).send(deletedCourse);
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

  handleUpdateOffering = async (req, res) => {
    const { course_id } = req.params;
    const updateOfferingDTO = new UpdateOfferingDTO(req.body);

    const updatedOfferingAndSubscription = await this.courseService.updateOfferingAndSubscription(
      course_id,
      updateOfferingDTO,
    );
    return res.status(200).send(updatedOfferingAndSubscription);
  };

  handleCreateOfferingCosts = async (req, res) => {
    const { course_id } = req.params;
    const createOfferingCostsDTO = new CreateOfferingCostsDTO(req.body);

    const createdOfferingCosts = await this.courseService.createOfferingCosts(course_id, createOfferingCostsDTO);
    return res.status(201).send(createdOfferingCosts);
  };

  handleUpdateOfferingCosts = async (req, res) => {
    const { course_id } = req.params;
    const updateOfferingCostsDTO = new UpdateOfferingCostsDTO(req.body);

    const updatedOfferingCosts = await this.courseService.updateOfferingCosts(course_id, updateOfferingCostsDTO);
    return res.status(200).send(updatedOfferingCosts);
  };

  handleCreateOfferingCostsTax = async (req, res) => {
    const { course_id } = req.params;
    const createOfferingCostsTaxDTO = new CreateOfferingCostsTaxDTO(req.body);

    const createdOfferingCostsTax = await this.courseService.createOfferingCostsTax(
      course_id,
      createOfferingCostsTaxDTO,
    );
    return res.status(201).send(createdOfferingCostsTax);
  };

  handleUpdateOfferingCostsTax = async (req, res) => {
    const { course_id } = req.params;
    const updateOfferingCostsTaxDTO = new UpdateOfferingCostsTaxDTO(req.body);

    const updatedOfferingCostsTax = await this.courseService.updateOfferingCostsTax(
      course_id,
      updateOfferingCostsTaxDTO,
    );
    return res.status(200).send(updatedOfferingCostsTax);
  };

  handleCreateOfferingCostsConditions = async (req, res) => {
    const { course_id } = req.params;
    const createOfferingCostsConditionsDTO = new CreateOfferingCostsConditionsDTO(req.body);

    const createdOfferingCostsConditions = await this.courseService.createOfferingCostsConditions(
      course_id,
      createOfferingCostsConditionsDTO,
    );
    return res.status(201).send(createdOfferingCostsConditions);
  };

  handleUpdateOfferingCostsConditions = async (req, res) => {
    const { course_id } = req.params;
    const updateOfferingCostsConditionsDTO = new UpdateOfferingCostsConditionsDTO(req.body);

    const updatedOfferingCostsConditions = await this.courseService.updateOfferingCostsConditions(
      course_id,
      updateOfferingCostsConditionsDTO,
    );
    return res.status(200).send(updatedOfferingCostsConditions);
  };

  handleAsignCoordination = async (req, res) => {
    const { course_id } = req.params;
    const asignCoordinationDTO = new AsignCoordinationDTO(req.body);

    const updatedCourse = await this.courseService.asignCoordination(course_id, asignCoordinationDTO);
    return res.status(201).send(updatedCourse);
  };

  handleUpdateCoordination = async (req, res) => {
    const { course_id } = req.params;
    const updateCoordinationDTO = new UpdateCoordinationDTO(req.body);

    const updatedCourse = await this.courseService.updateCoordination(course_id, updateCoordinationDTO);
    return res.status(200).send(updatedCourse);
  };

  handleAsignUnicamp = async (req, res) => {
    const { course_id } = req.params;
    const asignUnicampDTO = new AsignUnicampDTO(req.body);

    const updatedCourse = await this.courseService.asignUnicamp(course_id, asignUnicampDTO);
    return res.status(201).send(updatedCourse);
  };

  handleUpdateUnicamp = async (req, res) => {
    const { course_id, unicamp_id } = req.params;
    const updateUnicampDTO = new UpdateUnicampDTO(req.body);

    const updatedCourse = await this.courseService.updateUnicamp(course_id, unicamp_id, updateUnicampDTO);
    return res.status(200).send(updatedCourse);
  };

  handleDeleteUnicamp = async (req, res) => {
    const { course_id, unicamp_id } = req.params;

    const deletedResult = await this.courseService.deleteUnicamp(course_id, unicamp_id);
    return res.status(200).send(deletedResult);
  };

  handleAsignAttached = async (req, res) => {
    const { course_id } = req.params;
    const asignAttachedDTO = new AsignAttachedDTO(req.body);

    const updatedCourse = await this.courseService.asignAttached(course_id, asignAttachedDTO);
    return res.status(201).send(updatedCourse);
  };

  handleUpdateAttached = async (req, res) => {
    const { course_id, attached_id } = req.params;
    const updateAttachedDTO = new UpdateAttachedDTO(req.body);

    const updatedCourse = await this.courseService.updateAttached(course_id, attached_id, updateAttachedDTO);
    return res.status(200).send(updatedCourse);
  };

  handleDeleteAttached = async (req, res) => {
    const { course_id, attached_id } = req.params;

    const deletedResult = await this.courseService.deleteAttached(course_id, attached_id);
    return res.status(200).send(deletedResult);
  };

  handleAsignUnattached = async (req, res) => {
    const { course_id } = req.params;
    const asignUnattachedDTO = new AsignUnattachedDTO(req.body);

    const updatedCourse = await this.courseService.asignUnattached(course_id, asignUnattachedDTO);
    return res.status(201).send(updatedCourse);
  };

  handleUpdateUnattached = async (req, res) => {
    const { course_id, unattached_id } = req.params;
    const updateUnattachedDTO = new UpdateUnattachedDTO(req.body);

    const updatedCourse = await this.courseService.updateUnattached(course_id, unattached_id, updateUnattachedDTO);
    return res.status(200).send(updatedCourse);
  };

  handleDeleteUnattached = async (req, res) => {
    const { course_id, unattached_id } = req.params;

    const deletedResult = await this.courseService.deleteUnattached(course_id, unattached_id);
    return res.status(200).send(deletedResult);
  };

  handleAsignSpeaker = async (req, res) => {
    const { course_id } = req.params;
    const asignSpeakerDTO = new AsignSpeakerDTO(req.body);

    const updatedCourse = await this.courseService.asignSpeaker(course_id, asignSpeakerDTO);
    return res.status(201).send(updatedCourse);
  };

  handleUpdateSpeaker = async (req, res) => {
    const { course_id, speaker_id } = req.params;
    const updateSpeakerDTO = new UpdateSpeakerDTO(req.body);

    const updatedCourse = await this.courseService.updateSpeaker(course_id, speaker_id, updateSpeakerDTO);
    return res.status(200).send(updatedCourse);
  };

  handleDeleteSpeaker = async (req, res) => {
    const { course_id, speaker_id } = req.params;

    const deletedResult = await this.courseService.deleteSpeaker(course_id, speaker_id);
    return res.status(200).send(deletedResult);
  };

  handleSubscribeStudent = async (req, res) => {
    const { course_id } = req.params;
    const { termo_compromisso_assinado, documentos_upload, cpf_upload, declaracao_upload, ...updateStudentDTO } =
      req.body;

    const subscribeStudentDTO = new SubscribeStudentDTO({
      id: req.profile.sub,
      termo_compromisso_assinado,
      documentos_upload,
      cpf_upload,
      declaracao_upload,
    });

    const subscribedStudent = await this.courseService.subscribeStudent(
      course_id,
      subscribeStudentDTO,
      updateStudentDTO,
    );
    return res.status(201).send(subscribedStudent);
  };

  handleUnsubscribeStudent = async (req, res) => {
    const { course_id } = req.params;

    const unsubscribedStudent = await this.courseService.unsubscribeStudent(course_id, req.profile.sub);
    return res.status(200).send(unsubscribedStudent);
  };
}

module.exports = { CourseController };
