const bcrypt = require('bcrypt')

function hashPassword(password) {
  if (password.startsWith('hashed::')) {
    return password
  }

  const salt = bcrypt.genSaltSync()
  const hashedPassword = bcrypt.hashSync(password, salt)

  return hashedPassword
}

module.exports = hashPassword
