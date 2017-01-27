var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roomSchema = new Schema({
  name: String
});

var Room = mongoose.model('Room', roomSchema);

module.exports = Room;
