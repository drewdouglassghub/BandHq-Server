var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const Band = require("./Band");

var listSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    }, 
    refId: {
        type: String,
        required: true
    },
    bands: [{ type: Schema.Types.ObjectId, 
                ref: 'Band', 
                required: false 
            }]
});

const listData = mongoose.model('BandList', listSchema);

module.exports = listData;