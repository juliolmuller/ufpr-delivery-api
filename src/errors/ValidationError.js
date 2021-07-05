const { StatusCodes } = require('http-status-codes')

class ValidationError extends Error {
  static handleResponse(error, response) {
    response
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ message: error.message })
  }
}

module.exports = ValidationError
