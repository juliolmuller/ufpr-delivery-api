const { StatusCodes } = require('http-status-codes')

const DEFAULT_MESSAGE = 'Credenciais inválidas.'

class AuthenticationError extends Error {
  constructor(message = DEFAULT_MESSAGE) {
    super(message)
  }

  static handleResponse(error, response) {
    response
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: error.message })
  }
}

module.exports = AuthenticationError
