const CustomError = require('../addons/customError')

const requireUrl = (req, res, next)=>{
    if(!req.query.url) return next(new CustomError('Please send URL data.', 400))
    else return next()
}

const requireId = (req, res, next)=>{
    if(!req.params.id) return next(new CustomError('Please send record id.', 400))
    else return next()
}

module.exports = {
    requireUrl,
    requireId
}