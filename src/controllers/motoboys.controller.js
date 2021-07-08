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
    ? { include: {
      association: 'associates',
      where: { id: request.auth.id } } }
    : {}
  const motoboys = await Motoboy.findAll(queryFilter)

  response
    .status(StatusCodes.OK)
    .json(motoboysResource(motoboys))
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
        return {
          where: { cpf },
          include: {
            association: 'associates',
            where: { id: request.auth.id } } }
      case 'MOTOBOY':
        return {
          where: { cpf, id: request.auth.id },
        }
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
async function store(request, response) {
  const motoboy = new Motoboy({
    password: passwordUtils.hash(request.body.password),
    phone: request.body.phone,
    name: request.body.name,
    cpf: request.body.cpf,
  })

  await motoboy.save()
  await motoboy.addAssociate(request.auth.id)

  response
    .status(StatusCodes.CREATED)
    .json(motoboysResource(motoboy))
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
  const { id } = request.params
  const queryFilter = {
    where: { id },
    include: {
      association: 'associates',
      where: { id: request.auth.id } } }
  const motoboy = await Motoboy.findOne(queryFilter)

  if (!motoboy) {
    throw new ResourceNotFound(`Motoboy com ID '${id}' não encontrado.`)
  }

  console.log(await motoboy.destroy())

  response
    .status(StatusCodes.OK)
    .json(motoboysResource(motoboy))
}

module.exports = { index, show, store, update, destroy }
