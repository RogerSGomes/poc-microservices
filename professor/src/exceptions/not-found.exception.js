class NotFoundException {
  constructor(errorMessage) {
    this.status = 404;
    this.error = errorMessage;
  }
}

module.exports = { NotFoundException };
