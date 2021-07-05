const express = require('express')
const authRouter = require('./auth.router')
const reportsRouter = require('./reports.router')
const associatesRouter = require('./associates.router')
const customersRouter = require('./customers.router')
const motoboysRouter = require('./motoboys.router')
const ordersRouter = require('./orders.router')
const { validateToken } = require('../middlewares')

const router = express.Router()

router.get('/', (_request, response) => {
  response.send(`
    <html style="width: 100vw; height: 100vh; overflow: hidden;">
      <body style="width: 100vw; height: 100vh; display: flex;">
        <h1 style="margin: auto;">Server is running!</h1>
      </body>
    </html>
  `)
})

router.use(authRouter)
router.use('/reports', validateToken(), reportsRouter)
router.use('/associates', validateToken(), associatesRouter)
router.use('/customers', validateToken(), customersRouter)
router.use('/motoboys', validateToken(), motoboysRouter)
router.use('/orders', validateToken(), ordersRouter)

module.exports = router
