let express = require('express');
let Room = require('../models/room.model');

let router = express.Router();

router.post('/', (req, res) => {
  let newRoom = new Room({
    name: req.body.name
  });
  newRoom.save((err, room) => {
    if (err) throw err;
    console.log('Room saved successfully');
    res.send({
      success: true,
      room: room
    });
  })
  
});

module.exports = router;
