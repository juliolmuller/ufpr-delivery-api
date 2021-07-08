/* eslint-disable no-template-curly-in-string */
const yup = require('yup')
const numOnly = require('./num-only')
const cpfUtils = require('./cpf-utils')
const cnpjUtils = require('./cnpj-utils')

yup.setLocale({
  mixed: {
    required: 'Preenchimento mandatório.',
  },
  string: {
    required: 'Preenchimento mandatório.',
    min: 'Deve ter no mínimo ${min} caracter(es).',
    max: 'Deve ter no máximo ${max} caracter(es).',
    length: 'Deve ter exatamente ${length} caracter(es).',
  },
})

yup.addMethod(yup.string, 'name', function () {
  return this.ensure().min(3).max(120).trim()
})

yup.addMethod(yup.string, 'phone', function () {
  return this
    .transform(numOnly)
    .transform((value) => value.replace(/^(\d{2})(\d{4,5})(\d{4})$/, '($1) $2-$3'))
    .test({
      name: 'phone',
      exclusive: true,
      message: 'Telefone deve ter 10 ou 11 dígitos (incluindo 2 dígitos para DDD).',
      test: (value) => !value || numOnly(value).match(/(.*){10,11}/),
    })
})

yup.addMethod(yup.string, 'cpf', function () {
  return this
    .transform(numOnly)
    .test({
      name: 'cpf',
      exclusive: true,
      message: "'${value}' não corresponde a um CPF válido.",
      test: (value) => !value || cpfUtils.isValid(value),
    })
})

yup.addMethod(yup.string, 'cnpj', function () {
  return this
    .transform(numOnly)
    .test({
      name: 'cnpj',
      exclusive: true,
      message: "'${value}' não corresponde a um CNPJ válido.",
      test: (value) => !value || cnpjUtils.isValid(value),
    })
})

yup.addMethod(yup.string, 'password', function () {
  return this
    .min(8)
    .test({
      name: 'password',
      exclusive: true,
      message: 'Senha deve ter pelo menos 1 letra, 1 número e 1 caracter especial.',
      test: (value) => (
        value
        && value.match(/[a-z]/i)
        && value.match(/[0-9]/)
        && value.match(/["'!#$%&*()/[\]{}<>,.;:?_=-]/)
      ),
    })
})

module.exports = yup
