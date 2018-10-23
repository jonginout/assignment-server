const router = require('express').Router()
const controller = require('./user.controller')

router.post('/register.json', controller.register)
router.get('/:id/stats', controller.stats)
router.get('/:id', controller.redirecter)

module.exports = router