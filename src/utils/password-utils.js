const bcrypt = require('bcrypt')

/**
 * Prefix to the password hash to avoid new hashing.
 *
 * @const {string}
 */
const HASH_PREFIX = 'ACP_hash::'

/**
 * Obtain the hash for the given password.
 *
 * @param {string} plainPassword
 * @returns {string}
 */
function hash(plainPassword) {
  if (plainPassword.startsWith(HASH_PREFIX)) {
    return plainPassword
  }

  const salt = bcrypt.genSaltSync()
  const hashedPassword = bcrypt.hashSync(plainPassword, salt)

  return HASH_PREFIX + hashedPassword
}

/**
 * Check if given password matches with its hash.
 *
 * @param {string} plainPassword
 * @param {string} hashedPasswords
 * @returns {boolean}
 */
function compare(plainPassword, hashedPasswords) {
  const hashedPasswordOnly = hashedPasswords.slice(HASH_PREFIX.length)

  return bcrypt.compareSync(plainPassword, hashedPasswordOnly)
}

module.exports = { hash, compare }
