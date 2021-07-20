const { StatusCodes } = require('http-status-codes')
const { ResourceNotFound } = require('../errors')
const { customersResource } = require('../resources')
const { Customer, Address } = require('../models')

/**
 * Lista todos os registros de clientes.
 *
 * @middleware
 */
async function index(request, response) {
  const queryFilter = request.auth.role === 'ASSOC'
    ? { include: {
      association: 'associates',
      where: { id: request.auth.id } } }
    : {}

  const customers = await Customer.findAll(queryFilter)

  response
    .status(StatusCodes.OK)
    .json(customersResource(customers))
}

/**
 * Retorna o registro para o cliente com CNPJ passado como parâmetro.
 *
 * @middleware
 */
async function show(request, response) {
  const { cnpj } = request.params
  const queryFilter = {
    where: { cnpj },
    include: [
      { association: 'associates', where: { id: request.auth.id } },
      { model: Address, as: 'address' },
    ],
  }

  const customer = await Customer.findOne(queryFilter)

  if (!customer) {
    throw new ResourceNotFound(`Customer com cnpj ${cnpj} não encontrado`)
  }

  response
    .status(StatusCodes.OK)
    .json(customersResource(customer))
}

async function store(request, response) {
  const { name, cnpj, address } = request.body

  const customer = new Customer({
    name,
    cnpj,
  })
  const doc = await customer.save()
  if (address) {
    const newAdress = new Address({
      ...address,
      customerId: doc.id,
    })
    await newAdress.save()
  }

  await customer.addAssociate(request.auth.id)

  response
    .status(StatusCodes.CREATED).send({ msg: 'Cliente criado com sucesso' })
}

async function update(request, response) {
  const { id } = request.params
  const { name, cnpj, address } = request.body
  const queryFilter = {
    where: { id },
    include: [
      { association: 'associates', where: { id: request.auth.id } },
      { model: Address, as: 'address' },
    ],
  }
  const customer = await Customer.findOne(queryFilter)

  if (!customer) {
    throw new ResourceNotFound(`Customer com ID '${id}' não encontrado.`)
  }
  if (name) { customer.name = name }
  if (cnpj) { customer.cnpj = cnpj }

  await customer.save()

  if (address) {
    const newAddress = await Address.findByPk(customer.address.id)
    const { street, number, complement, city, state, cep } = address

    newAddress.street = street
    newAddress.number = number
    newAddress.complement = complement
    newAddress.city = city
    newAddress.state = state
    newAddress.cep = cep
    newAddress.customer = customer.id

    await newAddress.save()
  }

  response
    .status(StatusCodes.CREATED).send({ msg: 'Cliente salvo com sucesso.' })
}

async function destroy(request, response) {
  const { id } = request.params
  const queryFilter = {
    where: { id },
    include: {
      association: 'associates',
      where: { id: request.auth.id },
    },
  }
  const result = await Customer.destroy(queryFilter)
  let msg = ''
  if (result > 0) { msg = `Cliente número ${id} removido` } else { msg = `Nenhum cliente com o número ${id} foi encontrado` }

  response.status(StatusCodes.ACCEPTED).send({ msg })
}

module.exports = { index, show, store, update, destroy }
