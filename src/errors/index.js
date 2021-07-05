const AuthenticationError = require('./AuthenticationError')
const ValidationError = require('./ValidationError')

// eslint-disable-next-line no-unused-vars
function errorHandler(error, _request, _response, _next) {
  throw error
}

module.exports = errorHandler

module.exports.AuthenticationError = AuthenticationError
module.exports.ValidationError = ValidationError
