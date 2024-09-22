var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const User = require("./User");

var bandSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    }, 
    bandName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    members: [{ type: Schema.Types.ObjectId, ref: 'User', required: false }]
});


const bandData = mongoose.model('Band', bandSchema);

module.exports = bandData