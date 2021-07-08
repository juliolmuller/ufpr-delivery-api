const { StatusCodes } = require('http-status-codes')
const { ValidationError: YupError } = require('yup')
const { UniqueConstraintError } = require('sequelize')
const AuthenticationError = require('./AuthenticationError')
const AuthorizationError = require('./AuthorizationError')
const ResourceNotFound = require('./ResourceNotFound')
const ValidationError = require('./ValidationError')

// eslint-disable-next-line no-unused-vars
function errorHandler(error, _request, response, _next) {
  if (error instanceof AuthenticationError) {
    return AuthenticationError.handleResponse(error, response)
  }
  if (error instanceof AuthorizationError) {
    return AuthorizationError.handleResponse(error, response)
  }
  if (error instanceof ResourceNotFound) {
    return ResourceNotFound.handleResponse(error, response)
  }
  if (error instanceof UniqueConstraintError || error instanceof ValidationError || error instanceof YupError) {
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
module.exports.ResourceNotFound = ResourceNotFound
module.exports.ValidationError = ValidationError
