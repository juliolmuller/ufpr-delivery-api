
function addressesResource(address) {
  if (Array.isArray(address)) {
    return address.map(addressesResource)
  }

  return {
    id: address.id,
    street: address.street,
    number: address.number,
    complement: address.complement,
    city: address.city,
    state: address.state,
    cep: address.cep && address.cep.replace(/(\d{5})(\d{3})/, '$1-$2'),
  }
}

module.exports = addressesResource
