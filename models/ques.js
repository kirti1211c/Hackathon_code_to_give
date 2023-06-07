const mongoose = require('mongoose');
const { boolean } = require('webidl-conversions');

const { Schema } = mongoose;

const QuesSchema = new Schema({
    ques_txt: String,
    options: [String],
    multi_correct: Boolean
});

module.exports = mongoose.model('ques', QuesSchema)