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
  //:TODO validaçoes
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
    const {name,cnpj,password,address} = request.body
    const associate = await Associate.findByPk(
      id,
      { include: {
        model: Address,
        as: 'address'
      }
      }
    )
    if (name) associate.name = name
    if (cnpj) associate.cnpj = cnpj
    if (password) associate.password = passwordUtils.hash(password)
    await associate.save()

    if (address) {
      if (associate.address) {
        const newAddress = await Address.findByPk(associate.address.id)
        const { street, number, complement, city, state, cep } = address
        newAddress.street = street
        newAddress.number = number
        newAddress.complement = complement
        newAddress.city = city
        newAddress.state = state
        newAddress.cep = cep
        newAddress.associateId = associate.id
        await newAddress.save()
      }
      else {

        const newAdress = new Address({
          ...address,
          associateId: associate.id
        })
        await newAdress.save()
      }
    }
    response.status(StatusCodes.CREATED).send({msg:"Associação salva com sucesso."})

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
