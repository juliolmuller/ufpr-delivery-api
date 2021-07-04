const jwt = require('jsonwebtoken')

/**
 * Generate a JWT to be sent with the response.
 *
 * @param {string | jwt.JwtPayload} embeddedData
 * @returns {string}
 */
function generate(embeddedData = {}) {
  return jwt.sign(embeddedData, process.env.JWT_SECRET)
}

/**
 * Validate if given token is still valid.
 * @param {string} token
 * @returns {string | jwt.JwtPayload}
 */
function extractPayload(token) {
  return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = { generate, extractPayload }
