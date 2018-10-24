const CustomError = require('../../../addons/customError')
const User = require('../../../models/user')
const config = require('../../../config')
const url = require('url')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

const register = (req, res, next) => {
    const reqUrl = req.query.url
    User
    .findOneByUrl(reqUrl)
    .then(result=>{
        if(!result){
            User
            .create(reqUrl)
            .then(result=>{
                return res.status(201).json({
                    id:result._id,
                    url:url.resolve(config.host,result._id.toString())
                });
            })
            .catch(err=>{ next(err) })
        }else{
            return res.json({
                id:result._id,
                url:url.resolve(config.host,result._id.toString())
            })
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

const stats = (req, res, next) => {
    User.aggregate([
        {
            $match: { _id: ObjectId(req.params.id) }
        },
        {
            $unwind: "$visits" 
        },
        {
            $project: {
                visit_date: "$visits",
            } 
        },
        { 
            $group:{ 
                _id: {
                    visit_date: { $dateToString: { format: "%Y-%m-%d %H:00:00", date: "$visit_date" } },
                },
                visits:{ "$sum": 1}
            }
        },
        {
            $project: {
                _id: 0,
                at: "$_id.visit_date",
                visits: "$visits"
            } 
        },
        { $sort : { at : 1} },
    ]).exec((err, result) => {
        if(err) return next(err)
        res.json({Stats:result})
    });
}


module.exports = {
    register,
    redirecter,
    stats
}