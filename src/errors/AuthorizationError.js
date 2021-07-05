const { StatusCodes } = require('http-status-codes')

const DEFAULT_MESSAGE = 'Autorização ao recurso negada.'

class AuthorizationError extends Error {
  constructor(message = DEFAULT_MESSAGE) {
    super(message)
  }

  static handleResponse(error, response) {
    response
      .status(StatusCodes.FORBIDDEN)
      .json({ message: error.message })
  }
}

module.exports = AuthorizationError
