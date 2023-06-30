const { CourseService } = require('./course.service');
const { CreateCourseDTO } = require('./dtos');

class CourseController {
  constructor() {
    this.courseService = new CourseService();
  }

  handleCreateCourse = async (req, res) => {
    const createCourseDto = new CreateCourseDTO(req.body);
    const createdCourse = await this.courseService.createCourse({
      created_by: req.profile.sub,
      ...createCourseDto,
    });

    return res.status(201).send({
      result: createdCourse,
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
