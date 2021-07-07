const { StatusCodes } = require('http-status-codes')
const { ResourceNotFound } = require('../errors')
const { Motoboy } = require('../models')
const { motoboysResource } = require('../resources')

/**
 * Lista todos os registros de motoboys.Caso o usuário esteja autenticado com
 * perfil "ASSOC", apenas os registros associados a ele estarão disponíveis.
 *
 * @middleware
 */
async function index(request, response) {
  const queryFilter = request.auth.role === 'ASSOC'
    ? { include: { association: 'associates', where: { id: request.auth.id } } }
    : {}
  const motoboys = await Motoboy.findAll(queryFilter)

  response
    .status(StatusCodes.OK)
    .json(motoboys)
    // .json(motoboysResource(motoboys))
}

/**
 * Retorna os registros para o motoboy com CPF passado como parâmetro. Caso o
 * usuário esteja autenticado com perfil "ASSOC" ou "mMOTOBOY", apenas os
 * registros associados a ele estarão disponíveis.
 *
 * @middleware
 */
async function show(request, response) {
  const { cpf } = request.params
  const queryFilter = (() => {
    switch (request.auth.role) {
      case 'ASSOC':
        return { where: { cpf }, include: { association: 'associates', where: { id: request.auth.id } } }
      case 'MOTOBOY':
        return { where: { cpf, id: request.auth.id } }
      default:
        return {}
    }
  })()
  const motoboy = await Motoboy.findOne(queryFilter)

  if (!motoboy) {
    throw new ResourceNotFound(`Motoboy com CPF '${cpf}' não encontrado.`)
  }

  response
    .status(StatusCodes.OK)
    .json(motoboysResource(motoboy))
}

/**
 * Salva os dados de um novo motoboy.
 *
 * @middleware
 */
function store(request, response) {
  // TODO: implement
  response.send()
}

/**
 * Altera os dados de um motoboy com o ID passado como parâmetro.
 *
 * @middleware
 */
function update(request, response) {
  // TODO: implement
  response.send()
}

/**
 * Exclui o registro de um motoboy com o ID passado como parâmetro.
 *
 * @middleware
 */
async function destroy(request, response) {
  const motoboyId = request.params.id
  const queryFilter = {
    where: { id: motoboyId },
    include: { association: 'associates', where: { id: request.auth.id } },
  }
  const recordsCount = await Motoboy.destroy(queryFilter)

  console.log(recordsCount)
  if (recordsCount === 0) {
    throw new ResourceNotFound(`Motoboy com ID '${motoboyId}' não encontrado.`)
  }

  response
    .status(StatusCodes.OK)
    .json({ message: 'Motoboy excluído com sucesso.' })
}

module.exports = { index, show, store, update, destroy }
