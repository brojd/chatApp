let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let roomSchema = new Schema({
  name: String,
  messages: [{
    nickname: String,
    date: Date,
    text: String,
    hasFile: Boolean,
    file: Object
  }],
  feed: [{
    nickname: String,
    date: Date,
    info: String
  }]
});

let Room = mongoose.model('Room', roomSchema);

module.exports = Room;
