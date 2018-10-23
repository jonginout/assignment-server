const CustomError = require('../../../addons/customError')
const User = require('../../../models/user')

const register = (req, res, next) => {
    const reqUrl = req.query.url
    User
    .findOneByUrl(reqUrl)
    .then(result=>{
        if(!result){
            User
            .create(reqUrl)
            .then(result=>{
                return res.status(201).json({url:`http://localhost:3000/${result._id}`});
            })
            .catch(err=>{ next(err) })
        }else{
            return res.json({url:`http://localhost:3000/${result._id}`})
        }
    })
    .catch(err=>{ next(err) })
}


module.exports = {
    register,
}