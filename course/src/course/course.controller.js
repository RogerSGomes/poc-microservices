const { CourseService } = require('./course.service');
const { CreateCourseDTO, AsignCoordinationDTO } = require('./dtos');

class CourseController {
  constructor() {
    this.courseService = new CourseService();
  }

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

  handleAsignCoordination = async (req, res) => {
    const asignCoordinationDTO = new AsignCoordinationDTO(req.body);
    const updatedCourse = await this.courseService.asignCoordination(req.params.curso_id, asignCoordinationDTO);

    return res.status(201).send({
      result: updatedCourse,
    });
  };

  handleGetAll = async (req, res) => {
    const { courses, coursesAmount } = await this.courseService.getAll();

    res.status(200).send({
      result: courses,
      total: coursesAmount,
    });
  };
}

module.exports = { CourseController };
