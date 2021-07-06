const { StatusCodes } = require('http-status-codes')
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

function show(request, response) {
  // TODO: implement
  response.send()
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
