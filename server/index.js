'use strict';
let express = require('express');
let bodyParser = require('body-parser');
let config = require('./config');
let chatConfig = require('./chat-config');
let authRoutes = require('./routes/auth');
let roomRoutes = require('./routes/room');
let mongoose = require('mongoose');
let Room = require('./models/room.model');

let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);

mongoose.connect('mongodb://admin:admin1!@ds161518.mlab.com:61518/chat');
mongoose.connection.once('open', () => {
  console.log('successfully connected to db');
});

app.use(express.static(config.staticPath));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', authRoutes);
app.use('/rooms', roomRoutes);


io.on('connection', (socket) => {
  
  const roomId = socket.handshake.query.roomId;
  const nickname = socket.handshake.query.nickname;
  socket.room = roomId;
  socket.join(roomId);
  Room.findOne({ _id: roomId }, (err, room) => {
    if (err) throw err;
    let feed = room.feed.slice();
    feed.push({
      nickname: nickname,
      date: new Date(),
      info: ' has joined the chat'
    });
    if (feed.length > chatConfig.feedLimitPerRoom) {
      feed.shift();
    }
    room.feed = feed;
    room.save((err) => {
      if (err) throw err;
      socket.to(roomId).emit('user-connected', { feed: feed });
    })
  });
  
  socket.on('disconnect', () => {
    Room.findOne({ _id: roomId }, (err, room) => {
      if (err) throw err;
      let feed = room.feed.slice();
      feed.push({
        nickname: nickname,
        date: new Date(),
        info: ' has left the chat'
      });
      if (feed.length > chatConfig.feedLimitPerRoom) {
        feed.shift();
      }
      room.feed = feed;
      console.log(room);
      room.save((err) => {
        if (err) throw err;
        socket.to(roomId).emit('user-disconnected', { feed: feed });
        socket.leave(roomId);
      });
    });
  });
  
  socket.on('add-message', (message) => {
    Room.findOne({ _id: roomId }, (err, room) => {
      if (err) throw err;
      let messages = room.messages.slice();
      messages.push(message);
      if (messages.length > chatConfig.messagesLimitPerRoom) {
        messages.shift();
      }
      room.messages = messages;
      room.save((err) => {
        if (err) throw err;
        io.to(roomId).emit('message', message);
      })
    });
  });
  
});


http.listen(config.port);
console.log(`Listening on port ${config.port}`);
