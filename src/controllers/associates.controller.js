const { StatusCodes } = require('http-status-codes')
const { ResourceNotFound } = require('../errors')
const { Associate, Address, Customer, Motoboy } = require('../models')
const { associatesResource } = require('../resources')
const { passwordUtils } = require('../utils')

/**
 * Lista todos os registros de associadoss.
 *
 * @middleware
 */
async function index(request, response) {
  const associates = await Associate.findAll({
    include: [
      { model: Address, as: 'address' },
      { model: Customer, as: 'customers' },
      { model: Motoboy, as: 'motoboys' },
    ],
  })

  response
    .status(StatusCodes.OK)
    .json(associatesResource(associates))
}

/**
 * Retorna o registro para o associado com CNPJ passado como parâmetro.
 *
 * @middleware
 */
async function show(request, response) {
  const { cnpj } = request.params
  const associate = await Associate.findOne({
    where: { cnpj },
    include: [
      { model: Address, as: 'address' },
      { model: Customer, as: 'customers' },
      { model: Motoboy, as: 'motoboys' },
    ],
  })

  if (!associate) {
    throw new ResourceNotFound(`Associado com CNPJ '${cnpj}' não encontrado.`)
  }

  response
    .status(StatusCodes.OK)
    .json(associatesResource(associate))
}

/**
 * Salva os dados de um novo associado.
 *
 * @middleware
 */
async function store(request, response) {
  const associate = new Associate({
    password: passwordUtils.hash(request.body.password),
    name: request.body.name,
    cnpj: request.body.cnpj,
  })

  await associate.save()
  associate.motoboys = []
  associate.customers = []
  associate.address = request.body.address
    ? await associate.setAddress(new Address({
      ...request.body.address,
      associateId: associate.id }))
    : null

  response
    .status(StatusCodes.CREATED)
    .json(associatesResource(associate))
}

/**
 * Altera os dados de um associado com o ID passado como parâmetro.
 *
 * @middleware
 */
async function update(request, response) {
  const { id } = request.params
  const associate = await Associate.findOne({
    where: { id },
    include: {
      model: Address,
      as: 'address',
    },
  })

  if (!associate) {
    throw new ResourceNotFound(`Associado com ID '${id}' não encontrado.`)
  }

  associate.password = passwordUtils.hash(request.body.new_password)
  associate.name = request.body.name
  await associate.save()

  if (request.body.address) {
    const [address] = await Address.findOrCreate({
      where: { id: associate.address && associate.address.id },
      defaults: { associateId: associate.id },
    })

    address.street = request.body.address.street
    address.number = request.body.address.number
    address.complement = request.body.address.complement
    address.city = request.body.address.city
    address.state = request.body.address.state
    address.cep = request.body.address.cep
    address.associateId = associate.id
    associate.address = await address.save()
  }

  response
    .status(StatusCodes.OK)
    .json(associatesResource(associate))
}

/**
 * Exclui o registro de um associado com o ID passado como parâmetro.
 *
 * @middleware
 */
async function destroy(request, response) {
  const { id } = request.params
  const associate = await Associate.findOne({
    where: { id },
    include: {
      model: Address,
      as: 'address',
    },
  })

  if (!associate) {
    throw new ResourceNotFound(`Associado com ID '${id}' não encontrado.`)
  }

  await associate.destroy()

  response
    .status(StatusCodes.OK)
    .json(associate)
}

module.exports = { index, show, store, update, destroy }
