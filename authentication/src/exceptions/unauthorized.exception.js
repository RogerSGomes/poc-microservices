class UnauthorizedException {
  constructor(errorMessage) {
    this.status = 401;
    this.error = errorMessage;
  }
}

module.exports = { UnauthorizedException };
