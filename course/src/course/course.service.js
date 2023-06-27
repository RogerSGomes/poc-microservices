const { CourseRepository } = require('./course.repository');
const { NotFoundException } = require('../exceptions');

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
}

module.exports = { CourseService };
