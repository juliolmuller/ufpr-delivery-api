const { AuthorizationError } = require('../errors')

function authorize(...roles) {
  return (request, _response, next) => {
    const userRole = request.auth ? request.auth.role : ''
    const isAuthorized = roles.some((role) => {
      return role.toUpperCase() === userRole.toUpperCase()
    })

    if (!isAuthorized) {
      throw new AuthorizationError()
    }

    next()
  }
}

module.exports = authorize
