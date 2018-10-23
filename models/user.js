const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    url: String,
    visits: [Date],
})

User.statics.create = function(url) {
    const user = new this({
        url,
    })
    return user.save()
}

User.statics.pushVisit = function(_id) {
    this.update(
        { _id },
        { $push : {visits:Date.now()} }
    ).exec()
}

User.statics.findOneByUrl = function(url) {
    return this.findOne({
        url
    }).exec()
}

module.exports = mongoose.model('User', User)