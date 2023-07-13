const { AuthRouter } = require('./auth.router');

class AuthModule {
  constructor(app) {
    this.app = app;
  }

  execute() {
    this.app.register(
      (router, options, done) => {
        new AuthRouter(router).execute();

        done();
      },
      { prefix: '/auth' },
    );
  }
}

module.exports = { AuthModule };
