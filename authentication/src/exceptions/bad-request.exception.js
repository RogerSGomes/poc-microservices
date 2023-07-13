class BadRequestException {
  constructor(errorMessage) {
    this.status = 400;
    this.error = errorMessage;
  }
}

module.exports = { BadRequestException };
