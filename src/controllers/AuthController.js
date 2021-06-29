const Doctor = require('../models/doctors')
const { authPolicy } = require('../security')

async function signIn(req, res) {
  const { email, password } = req.body

  if (!email || !password) {
    return res
      .status(422)
      .json({ msg: 'Dados obrigatórios não preenchidos.' })
  }

  try {
    const user = await Doctor.findOne({
      where: { email },
    })

    if (!user || !authPolicy.comparePasswords(password, user.password)) {
      return res
        .status(401)
        .json({ msg: 'Credenciais inválidas.' })
    }

    return res
      .status(200)
      .json({
        msg: 'Sucesso.',
        token: authPolicy.generateToken({ user: user.id }),
      })
  } catch (error) {
    console.warn(error)

    return res.status(500).send()
  }
}

function signOut(req, res) { // eslint-disable-line no-unused-vars
  // TODO: pending implementation
}

module.exports = {
  signIn,
  signOut,
}
