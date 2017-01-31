let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let roomSchema = new Schema({
  name: String,
  messages: []
});

let Room = mongoose.model('Room', roomSchema);

module.exports = Room;
