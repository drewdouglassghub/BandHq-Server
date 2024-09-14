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

const Data = mongoose.model("Data", User)

module.exports = Data