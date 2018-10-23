const router = require('express').Router()
const controller = require('./user.controller')

router.post('/register.json', controller.register)
// router.post('/decode', middle.invalidToken, controller.decode)
// router.delete('/destroy', middle.invalidToken, controller.destroy)

module.exports = router