var mongoose = require("mongoose")
var Schema = mongoose.Schema

var User = new Schema({
    appleId: String,
    firstName: String,
    lastName: String,
    email: String,
    },{collection:'User',
        versionKey: false //here
})

const userData = mongoose.model("userData", User)

module.exports = userData