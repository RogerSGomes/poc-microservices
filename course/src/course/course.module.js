const { CourseRouter } = require('./course.router');

class CourseModule {
  constructor(app) {
    this.app = app;
  }

  execute() {
    this.app.register(
      (router, options, done) => {
        new CourseRouter(router).execute();

        done();
      },
      { prefix: '/courses' },
    );
  }
}

module.exports = { CourseModule };
