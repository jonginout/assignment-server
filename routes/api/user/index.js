const router = require('express').Router()
const controller = require('./user.controller')

router.post('/register.json', controller.register)
router.get('/:id', controller.redirecter)
router.get('/:id/stats', controller.stats)

module.exports = router