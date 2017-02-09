let express = require('express');
let Room = require('../models/room.model');
let loggedUsers = require('../usersInRooms');

let router = express.Router();

router.get('/', (req, res) => {
  Room.find({}, (err, rooms) => {
    if (err) throw err;
    res.send(rooms);
  });
});

router.get('/:id', (req, res) => {
  Room.findOne({ _id: req.params.id}, (err, room) => {
    if (err) throw err;
    res.send(room);
  });
});

router.post('/', (req, res) => {
  let newRoom = new Room({
    name: req.body.name,
    icon: req.body.icon
  });
  debugger;
  newRoom.save((err, room) => {
    if (err) throw err;
    loggedUsers.addRoom({ id: room.id, users: [] });
    res.send({
      success: true,
      room: room
    });
  })
});

router.delete('/:id', (req, res) => {
  let id = req.params.id;
  Room.remove({ _id: id}, err => {
    if (err) throw err;
    loggedUsers.deleteRoom(id);
    res.send({ success: true });
  });
});

module.exports = router;
