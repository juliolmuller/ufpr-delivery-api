const { StatusCodes } = require('http-status-codes')
const { UniqueConstraintError } = require('sequelize')
const { ValidationError: YupError } = require('yup')
const { cpfUtils, cnpjUtils } = require('../utils')

class ValidationError extends Error {
  static handleResponse(error, response) {
    if (error instanceof UniqueConstraintError) {
      const [innerError] = error.errors
      const errorMessages = {}

      if (innerError.path === 'cpf') {
        errorMessages.cpf = [`CPF '${cpfUtils.format(innerError.value)}' já está cadastrado.`]
      } else if (innerError.path === 'cnpj') {
        errorMessages.cnpj = [`CNPJ '${cnpjUtils.format(innerError.value)}' já está cadastrado.`]
      } else {
        errorMessages[innerError.path] = [innerError.message]
      }

      response
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ message: errorMessages })
    } else if (error instanceof YupError) {
      const errorMessages = {}

      if (error.inner.length) {
        error.inner.forEach((err) => {
          if (!errorMessages[err.path]) {
            errorMessages[err.path] = []
          }
          errorMessages[err.path].push(...err.errors)
        })
      } else {
        errorMessages[error.path] = error.errors
      }

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
