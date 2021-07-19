const sequelize = require('sequelize')

const { Motoboy, Customer, Order } = require('../models')

const ordena = (parametro) => Object.entries(parametro)
    .sort(([,a],[,b]) => b-a)
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
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
  const orders = await Order.findAll({
    include: [{
      association: 'associate', attributes: [],
    where: { id: request.auth.id }
    }, { association: 'motoboy', attributes: ['id','name'],}
      ,{association:'customer', attributes: ['id','name'],}
    ]
  })

  const motoboy = await Motoboy.findAll({include: {
      association: 'associates',
    where: { id: request.auth.id }
  }
  })

  const customers = await Customer.findAll({include: {
      association: 'associates',
      where: { id: request.auth.id } }})

  let top5Motoboys = {}
  let top5Clientes = {}
  motoboy.forEach(m => {
    top5Motoboys[m.name] =  0
  })
  customers.forEach(customer => {
    top5Clientes[customer.name] =  0
  })

    orders.forEach(order => {
    top5Motoboys[order.motoboy.name] += 1
    top5Clientes[order.customer.name] += 1
    })

  top5Motoboys = ordena(top5Motoboys)
   top5Motoboys = Object.entries(top5Motoboys)
  top5Motoboys = top5Motoboys.splice(0, 5)
  top5Motoboys = top5Motoboys.reduce((r, [k, v]) => ({ ...r, [k]: v }), {})
  top5Clientes = ordena(top5Clientes)
  top5Clientes = Object.entries(top5Motoboys)
  top5Clientes = top5Clientes.splice(0, 5)
  top5Clientes = top5Clientes.reduce((r, [k, v]) => ({ ...r, [k]: v }), {})

  let porcentagemDePedidosConcluidos = orders.reduce(concluidos,0)
  porcentagemDePedidosConcluidos = porcentagemDePedidosConcluidos / orders.length * 100
  porcentagemDePedidosConcluidos = parseFloat(porcentagemDePedidosConcluidos.toFixed(2))
  let porcentagemDePedidosPendentes = orders.reduce(pendentes, 0)
  porcentagemDePedidosPendentes = porcentagemDePedidosPendentes / orders.length * 100
  porcentagemDePedidosPendentes = parseFloat(porcentagemDePedidosPendentes.toFixed(2))
  const report = {
    totalDePedidos: orders.length,
    porcentagemDePedidosConcluidos,
    porcentagemDePedidosPendentes,
    totalDePedidos: orders.length,
    totalDeMotoboys: motoboy.length,
    totalDeClientes: customers.length,
    top5Motoboys,
    top5Clientes,


  }
  response.send({report})
}

async function financial(request, response) {
  switch (request.auth.role) {
    case 'ASSOC':
      const queryFilter =  { where: { associateId: request.auth.id } }
      const orders = await Order.findAll(queryFilter)
      let total = 0
      orders.forEach((order) => {
        total =  Number.parseFloat(order.value) + Number.parseFloat(total)
      })
      const report = {}
      report.montanteTotal =`R$ ${total.toFixed(2)}`
      report.montanteMotoboys = `R$ ${(total * 0.7).toFixed(2)}`
      report.montanteAssociado = `R$ ${(total * 0.3).toFixed(2)}`
      report.valorMedioEntrega = orders.length ? `R$ ${(total / orders.length).toFixed(2)}` : 'R$ 0.00'
      report.totalDeEntregas = orders.length

      response.send({report})
      break;
    case 'MOTOBOY':
      const queryMotoboy =  { where: { motoboyId: request.auth.id } }
      const ordersMotoboy = await Order.findAll(queryMotoboy)
      let totalMotoboy = 0
      ordersMotoboy.forEach((order) => {
        totalMotoboy =  Number.parseFloat(order.value) + Number.parseFloat(totalMotoboy)
      })
      const reportMotoboy = {}
      reportMotoboy.montanteTotalMotoboy =`R$ ${totalMotoboy.toFixed(2)}`
      reportMotoboy.montanteMotoboys = `R$ ${(totalMotoboy * 0.7).toFixed(2)}`
      reportMotoboy.totalDeEntregas = ordersMotoboy.length
      reportMotoboy.valorMedioEntrega = ordersMotoboy.length ? `R$ ${(totalMotoboy/ordersMotoboy.length).toFixed(2)}` : 'R$ 0.00'
      response.send({reportMotoboy})
      break;
    }

}

module.exports = { administrative, financial }
