require('./database/config')
const express = require('express')
const router = require('./routes/router')
require('./database/index')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(router)

app.listen(port, () => {
  console.log(`Servidor executando em http://localhost:${port}`)
})

module.exports = app
