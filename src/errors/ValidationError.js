const { StatusCodes } = require('http-status-codes')
const { ValidationError: YupError } = require('yup')

class ValidationError extends Error {
  static handleResponse(error, response) {
    if (error instanceof YupError) {
      const errorMessages = {}

      error.inner.forEach((err) => {
        if (!errorMessages[err.path]) {
          errorMessages[err.path] = []
        }
        errorMessages[err.path].push(...err.errors)
      })

      response
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ message: errorMessages })
    } else {
      response
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ message: error.message })
    }
  }
}

module.exports = ValidationError
