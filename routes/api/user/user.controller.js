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

const redirecter = (req, res, next) => {
    const id = req.params.id
    User
    .findById(id)
    .then(result=>{
        if(!result) return next(new CustomError('The URL not registered.'), 401)
        User.pushVisit(id)
        return res.status(301).redirect(result.url)
    })
    .catch(err=>{
        return next(new CustomError('The URL not registered.'), 401)
    })
}

const stats = () => {

}


module.exports = {
    register,
    redirecter,
    stats
}