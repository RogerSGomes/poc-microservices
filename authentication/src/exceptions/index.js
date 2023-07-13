const { BadRequestException } = require('./bad-request.exception');
const { NotFoundException } = require('./not-found.exception');
const { UnauthorizedException } = require('./unauthorized.exception');
const { InternalServerErrorException } = require('./internal-server-error.exception');

module.exports = {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
  InternalServerErrorException,
};
