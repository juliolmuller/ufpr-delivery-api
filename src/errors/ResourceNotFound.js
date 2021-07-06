const { StatusCodes } = require('http-status-codes')

class ResourceNotFound extends Error {
  static handleResponse(error, response) {
    response
      .status(StatusCodes.NOT_FOUND)
      .json({ message: error.message })
  }
}

module.exports = ResourceNotFound
