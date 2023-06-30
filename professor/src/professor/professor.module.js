const { ProfessorRouter } = require('./professor.router');

class ProfessorModule {
  constructor(app) {
    this.app = app;
  }

  execute() {
    this.app.register(
      (router, options, done) => {
        new ProfessorRouter(router).execute();

        done();
      },
      { prefix: '/professores' },
    );
  }
}

module.exports = { ProfessorModule };
