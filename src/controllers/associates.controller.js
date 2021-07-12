const { StatusCodes } = require("http-status-codes")
const { Associate, Address } = require("../models")
const { passwordUtils } = require("../utils")

async function index(request, response) {
  try {
    const associates = await Associate.findAll({ include: {
        model: Address,
        as: 'address'
      }})
    response.status(StatusCodes.ACCEPTED).send(associates)

  } catch (error) {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error})

  }
}

async function show(request, response) {
  try {
    const {cnpj} = request.params

    const associate = await Associate.findOne({ where: { cnpj }, include: {
        model: Address,
        as: 'address'
      }}  )
    response.status(StatusCodes.ACCEPTED).send(associate)

  } catch (error) {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error})

  }
}

async function store(request, response) {
  try {
    const { name, cnpj, password, address } = request.body

    const associate = new Associate({
      name,
      cnpj,
      password: passwordUtils.hash(password),
    })
    const doc = await associate.save()
    if (address) {
      const newAdress = new Address({
        ...address,
        associateId: doc.id
      })
      await newAdress.save()
    }
    response.status(StatusCodes.CREATED).send({msg: "Associado criado com sucesso"})
  } catch (error) {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: `Erro ao criar associado, msg: ${error}`})

  }
}

async function update(request, response) {
  try {
    const { id } = request.params
    const {name,cnpj,password} = request.body
    const associate = await Associate.findByPk(id)
    if (name) associate.name = name
    if (cnpj) associate.cnpj = cnpj
    if (password) associate.password = passwordUtils.hash(password)
    await associate.save()
    response.status(StatusCodes.CREATED).send(associate)

  } catch (error) {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: `Erro ao editar associado, msg: ${error}`})
  }
}

async function destroy(request, response) {
  try {
    const { id } = request.params
    const result = await Associate.destroy({ where: { id } })
    let msg = ''
    if(result>0)
      msg = `Associação numero ${id} removida`
    else msg = `Nenhuma associação com o numero ${id} foi encontrado`
    response.status(StatusCodes.ACCEPTED).send({msg})
  } catch (error) {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: `Erro ao remover associado, msg: ${error}`})
  }
}

module.exports = { index, show, store, update, destroy }
