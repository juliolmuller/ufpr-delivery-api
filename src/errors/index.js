const { StatusCodes } = require('http-status-codes')
const AuthenticationError = require('./AuthenticationError')
const AuthorizationError = require('./AuthorizationError')
const ValidationError = require('./ValidationError')

// eslint-disable-next-line no-unused-vars
function errorHandler(error, _request, response, _next) {
  if (error instanceof AuthenticationError) {
    return AuthenticationError.handleResponse(error, response)
  }
  if (error instanceof AuthorizationError) {
    return AuthorizationError.handleResponse(error, response)
  }
  if (error instanceof ValidationError) {
    return ValidationError.handleResponse(error, response)
  }

  console.log(error)

  return response
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: 'Erro interno da aplicação.' })
}

module.exports = errorHandler

module.exports.AuthenticationError = AuthenticationError
module.exports.AuthorizationError = AuthorizationError
module.exports.ValidationError = ValidationError
