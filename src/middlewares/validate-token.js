const { AuthenticationError, AuthorizationError } = require('../errors')
const { jwtUtils } = require('../utils')

function validateToken() {
  return (request, _response, next) => {
    const normalizedHeaders = Object.fromEntries(
      Object.entries(request.headers).map(([key, value]) => {
        return [key.toLowerCase(), value]
      }),
    )
    const token = normalizedHeaders['x-access-token']

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
