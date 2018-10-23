const CustomError = require('../addons/customError')

const requireData = (req, res, next)=>{
    if(!Object.keys(req.body).length) return next(new CustomError('Please send any data that type is json.', 400))
    else return next()
}

const invalidToken = (req, res, next)=>{
    const token = req.body.token
    if(!token || !req.session[token]) return next(new CustomError('Invalid token.', 403))
    else return next()
}

module.exports = {
    requireData,
    invalidToken,
}