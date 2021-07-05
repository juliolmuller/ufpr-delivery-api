const express = require('express')
const authRouter = require('./auth.router')
const { checkToken } = require('../middlewares')

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

module.exports = router
