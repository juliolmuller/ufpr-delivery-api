const { StatusCodes } = require('http-status-codes');
const { ResourceNotFound } = require('../errors');
const { Order } = require('../models');

async function index(request, response) {
  const orders = await Order.findAll()

  response
    .status(StatusCodes.ACCEPTED).send(orders)
}

async function listOrderByStatus(request, response) {
  const { status, motoboy } = request.params

  console.log(request.params)
  const queryFilter =  {
    where : {
      status: status.toUpperCase(),
      id: motoboy
    }}

  const orders = await Order.findAll(queryFilter)

  response
    .status(StatusCodes.ACCEPTED).send(orders)
}

async function listOrderByMotoboy(request, response) {
  const { id } = request.params
  const queryFilter = {
    where : {
      motoboyId: id
    }
  }

  const orders = await Order.findAll(queryFilter)

  response
    .status(StatusCodes.ACCEPTED).send(orders)
}
async function show(request, response) {
  const { id } = request.params
  const queryFilter = {
      where: { id },
    }

  const Order = await Order.findOne(queryFilter)

  if (!customer) {
    throw new ResourceNotFound(`Pedido com id ${id} não encontrado`)
  }

  response
    .status(StatusCodes.ACCEPTED).send(customer)
}

async function store(request, response) {
  const { description, customerId, motoboyId } = request.body
  const status = 'PENDING'

  if (!description || !customerId || !motoboyId) {
    throw new ValidationError('Preencha os dados obrigatórios: descrição, cliente ou motoboy')
  }
  const associateId = request.auth.id
  const order = new Order({
    description,
    status,
    associateId,
    customerId,
    motoboyId

  })
  await order.save()

  response
    .status(StatusCodes.CREATED).send({ msg: "entrega criada com sucesso" })
}

async function update(request, response) {
  const { description, status, value } = request.body
  const { id } = request.params
  const queryFilter = {
    where: { id }
  }

  const order = await Order.findOne(queryFilter)

  if (!order) {
    throw new ResourceNotFound(`Pedido com ID '${id}' não encontrado.`)
  }

  if (description) order.description = description
  if (status) order.status = status.toUpperCase()
  if (value) order.value = value

  response
    .status(StatusCodes.CREATED).send(order)
}

async function destroy(request, response) {
  const { id } = request.params
  const queryFilter = {
    where: { id }
  }

  const result = await Order.destroy(queryFilter)
  let msg = ''

  if (result > 0)
    msg = `Pedido número ${id} removido`
  else msg = `Nenhum pedido com o número ${id} foi encontrado`

  response.status(StatusCodes.ACCEPTED).send({msg})
}

module.exports = { index, listOrderByStatus, show, store, update, destroy, listOrderByMotoboy }
