const { authPolicy } = require('../security')

function validatePassword(isOptional = false) {
  return (req, res, next) => {
    const { password } = req.body

    if (isOptional && !password) {
      return next()
    }

    if (!isOptional && !password) {
      return res
        .status(422)
        .json({ msg: 'Dados obrigatórios não preenchidos.' })
    }

    if (!authPolicy.isPasswordValid(password)) {
      return res
        .status(422)
        .json({ msg: 'Senha deve ter no mínimo 8 caracteres e conter pelo menos 1 letra e 1 número.' })
    }

    return next()
  }
}

module.exports = validatePassword
