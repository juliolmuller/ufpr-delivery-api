const { StatusCodes } = require('http-status-codes')
const { AuthenticationError, ValidationError } = require('../errors')
const { Associate, Motoboy } = require('../models')
const { jwtUtils, passwordUtils } = require('../utils')

const AUTH_ROLES = ['ADMIN', 'ASSOC', 'MOTOBOY']

async function signIn(request, response) {
  const role = request.params.role.toUpperCase()
  const { login, password } = request.body

  if (role === 'ADMIN') {
    return response
      .status(StatusCodes.OK)
      .json({
        message: 'Usuário autenticado com sucesso.',
        token: process.env.ADMIN_TOKEN,
      })
  }

  if (!login || !password) {
    throw new ValidationError('Dados de autenticação faltando: CPF/CNPJ ou senha.')
  }
  if (!AUTH_ROLES.includes(role)) {
    throw new ValidationError(`Perfil de acesso "${role}" não suportado.`)
  }

  const user = role === 'ASSOC'
    ? await Associate.findOne({ where: { cnpj: login } })
    : await Motoboy.findOne({ where: { cpf: login } })

  if (!user || !passwordUtils.compare(password, user.password)) {
    throw new AuthenticationError()
  }

  return response
    .status(StatusCodes.OK)
    .json({
      message: 'Usuário autenticado com sucesso.',
      token: jwtUtils.generate({
        user: {
          id: user.id,
          role,
        },
      }),
    })
}

module.exports = { signIn }
