class InternalServerErrorException {
  constructor(errorMessage) {
    this.status = 500;
    this.error = errorMessage;
  }
}

module.exports = { InternalServerErrorException };
