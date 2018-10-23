const CustomError = require('../../../addons/customError')
const User = require('../../../models/user')
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
                _id: 0,
                visit_date: "$visits",
                y: { $year: "$visits" },
                m: { $month: "$visits" },
                d: { $dayOfMonth: "$visits" },
                h: { $hour: "$visits" },
            } 
        },
        { $sort : { visit_date : 1} },
        { 
            $group:{ 
                _id: {
                        year: "$y",
                        month: "$m",
                        day: "$d",
                        hour: "$h",
                    },
                visits:{ "$sum": 1}
            }
        }
    ]).exec((err, result) => {
        if(err) return next(err)
        result.map(v=>{
            v.at = `${v._id.year}-${v._id.month}-${v._id.day} ${v._id.hour}:00:00`
            delete v._id
            return v
        })
        res.json({Stats:result})
    });
}


module.exports = {
    register,
    redirecter,
    stats
}