const { authPolicy } = require('../security')

function checkToken() {
  return (req, res, next) => {
    const normalizedHeaders = Object.fromEntries(
      Object.entries(req.headers).map(([key, value]) => {
        return [key.toLowerCase(), value]
      }),
    )
    const token = normalizedHeaders['x-access-token']

    if (!token) {
      return res
        .status(401)
        .json({ msg: 'Área restrita.' })
    }

    try {
      const user = authPolicy.validateToken(token)
      req.auth = { user }
      return next()
    } catch (error) {
      return res
        .status(403)
        .json({ msg: 'Token de acesso inválido.' })
    }
  }
}

module.exports = checkToken
