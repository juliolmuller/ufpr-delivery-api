const { AuthenticationError, AuthorizationError } = require('../errors')
const { jwtUtils } = require('../utils')

function validateToken() {
  return (request, _response, next) => {
    const token = request.headers['x-access-token']

    if (!token) {
      throw new AuthenticationError('Área restrita.')
    }

    try {
      request.auth = jwtUtils.extractPayload(token).user
      next()
    } catch (error) {
      throw new AuthorizationError(error.message)
    }
  }
}

module.exports = validateToken
