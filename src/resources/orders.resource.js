const associatesResource = require('./associates.resource')
const customersResource = require('./customers.resource')
const motoboysResource = require('./motoboys.resource')

function ordersResource(order) {
  if (Array.isArray(order)) {
    return order.map(ordersResource)
  }

  return {
    id: order.id,
    description: order.description,
    status: order.status,
    value: order.value ? `R$ ${order.value.toFixed(2)}` : 'PENDING',
    associate: order.associate && associatesResource(order.associate),
    customer: order.customer && customersResource(order.customer),
    motoboy: order.motoboy && motoboysResource(order.motoboy),
    created_at: order.createdAt,
    updated_at: order.updatedAt,
  }
}

module.exports = ordersResource
