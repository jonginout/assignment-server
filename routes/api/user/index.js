const router = require('express').Router()
const controller = require('./user.controller')
const middle = require('../../middleware')

router.post('/register.json', middle.requireUrl, controller.register)
router.get('/:id/stats', middle.requireId, controller.stats)
router.get('/:id', middle.requireId, controller.redirecter)

module.exports = router