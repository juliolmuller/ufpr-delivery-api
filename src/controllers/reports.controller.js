const sequelize = require('sequelize')

const { Motoboy, Customer, Order } = require('../models')
async function administrative(request, response) {
  const concluidos = (accumulator, currentValue) => {
    if (currentValue.status == "COMPLETE")
      return accumulator+1
    return accumulator
};
  const pendentes  = (accumulator, currentValue) => {
    if (currentValue.status == "PENDING")
      return accumulator+1
    return accumulator
};
  console.log("order")
  const order = await Order.findAll({include: [{
      association: 'associate',
    where: { id: request.auth.id }
  }, {
        association: 'motoboy',
    }]
  })
  console.log("motoboy")

  const motoboy = await Motoboy.findAll({include: {
      association: 'associates',
    where: { id: request.auth.id }
  }
  })
  console.log("customers")

  const customers = await Customer.findAll({include: {
      association: 'associates',
      where: { id: request.auth.id } }})
  console.log("----------------top5motoboy")

  const top5motoboy = await Motoboy.findAll({
    include: [ {
      association: 'orders',
      attributes:['id'],

    }, {
      association: 'associates',
      attributes:['id'],
      where: { id: request.auth.id } }],

  })

  let totalDePedidosConcluidos = order.reduce(concluidos,0)
  let totalDePedidosPendentes = order.reduce(pendentes,0)
  const report = {
    totalDePedidos: order.length,
    totalDePedidosConcluidos,
    totalDePedidosPendentes,
    totalDePedidos: order.length,
    totalDeMotoboy: motoboy.length,
    totalDeClientes: customers.length,
    top5motoboy,

  }
  response.send({report})
}

async function financial(request, response) {
  const queryFilter =  { where: { associateId: request.auth.id } }

  const order = await Order.findAll(queryFilter)
  let total = 0
  order.forEach((order) => {
    total =  Number.parseInt(order.value) + Number.parseInt(total)
  })
  const report = {}
  report.totalDeOrders = order.length
  report.montanteTotal = total

  response.send({report})
}

function orders(request, response) {
     switch (request.auth.role) {
      case 'ASSOC':
        return {
          where: { id },
          include: {
            association: 'associates',
            where: { id: request.auth.id } } }
      case 'MOTOBOY':
        return {
          where: { id: request.auth.id },
        }
      default:
        return {}
    }
  response.send()
}

module.exports = { administrative, financial, orders }
