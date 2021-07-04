require('./database')
require('express-async-errors')
const express = require('express')
const routes = require('./routes')
const errorHandler = require('./errors')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(routes)
app.use(errorHandler)

app.listen(process.env.PORT, () => {
  console.log(`Servidor executando em http://localhost:${process.env.PORT}`)
})
