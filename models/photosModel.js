const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    image: {type: String, required: false},
    caption: {type: String, required: true},
    type: {type: String, required: true},
    altText: {type:String, required: false},
    date: {type: Date, required: true}
}
)

const photoModel = mongoose.model('Photo', photoSchema)

module.exports = photoModel;