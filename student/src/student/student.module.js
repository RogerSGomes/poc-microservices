const { StudentRouter } = require('./student.router');

class StudentModule {
  constructor(app) {
    this.app = app;
  }

  execute() {
    this.app.register(
      (router, options, done) => {
        new StudentRouter(router).execute();

        done();
      },
      { prefix: '/alunos' },
    );
  }
}

module.exports = { StudentModule };
