const router = require('express').Router()
const controller = require('./user.controller')

router.post('/register.json', controller.register)
router.get('/:id', controller.redirecter)
// router.delete('/destroy', middle.invalidToken, controller.destroy)

module.exports = router