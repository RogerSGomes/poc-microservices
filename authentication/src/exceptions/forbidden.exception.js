class ForbiddenException {
  constructor(errorMessage) {
    this.status = 403;
    this.error = errorMessage;
  }
}

module.exports = { ForbiddenException };
