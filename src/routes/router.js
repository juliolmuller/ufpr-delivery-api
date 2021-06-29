const express = require('express')
const AuthRouter = require('./AuthRouter')
const { checkToken } = require('../middlewares')

const router = express.Router()

router.get('/', (req, res) => {
  res.send("It's working")
})

router.use(AuthRouter)

module.exports = router
