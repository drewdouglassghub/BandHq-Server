var mongoose = require("mongoose")
var Schema = mongoose.Schema
const Band = require("./Band");
const Image = require("./Image");

var userSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    }, 
    appleId: {
        type: String,
        required: true,
        unique: true 
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    bands: [{ type: Schema.Types.ObjectId, ref: 'Band', required: false}]
})

const userData = mongoose.model("User", userSchema)
module.exports = userData