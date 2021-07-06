const { StatusCodes } = require('http-status-codes')
const { ResourceNotFound } = require('../errors')
const { motoboysResource } = require('../resources')
const { Motoboy } = require('../models')

async function index(request, response) {
  const queryFilter = request.auth.role === 'ASSOC'
    ? { where: { associate_id: request.auth.id } }
    : {}
  const motoboys = await Motoboy.findAll(queryFilter)

  response
    .status(StatusCodes.OK)
    .json(motoboysResource(motoboys))
}

async function show(request, response) {
  const { cpf } = request.params
  const queryFilter = (() => {
    switch (request.auth.role) {
      case 'ASSOC':
        return { where: { cpf, associate_id: request.auth.id } }
      case 'MOTOBOY':
        return { where: { cpf, id: request.auth.id } }
      default:
        return {}
    }
  })()
  const motoboy = await Motoboy.findOne(queryFilter)

  if (!motoboy) {
    throw new ResourceNotFound(`Motoboy com CPF "${cpf}" não encontrado.`)
  }

  response
    .status(StatusCodes.OK)
    .json(motoboysResource(motoboy))
}

function store(request, response) {
  // TODO: implement
  response.send()
}

function update(request, response) {
  // TODO: implement
  response.send()
}

function destroy(request, response) {
  // TODO: implement
  response.send()
}

module.exports = { index, show, store, update, destroy }
