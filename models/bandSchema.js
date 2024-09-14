var mongoose = require("mongoose")
var Schema = mongoose.Schema

var Band = new Schema({
    bandName: String,
    bandMates: String,
    email: String,
    },{collection:'Band',
        versionKey: false //here
})

const bandData = mongoose.model("bandData", Band)

module.exports = bandData