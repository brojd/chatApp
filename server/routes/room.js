let express = require('express');
let Room = require('../models/room.model');

let router = express.Router();

router.get('/', (req, res) => {
  Room.find({}, (err, rooms) => {
    if (err) throw err;
    res.send(rooms);
  });
});

router.post('/', (req, res) => {
  let newRoom = new Room({
    name: req.body.name
  });
  newRoom.save((err, room) => {
    if (err) throw err;
    res.send({
      success: true,
      room: room
    });
  })
});

module.exports = router;
