let mongoose = require('mongoose');
let fs = require('fs');
let mkdirp = require('mkdirp');
let Room = require('./models/room.model');
let User = require('./models/user.model');
let chatConfig = require('./chat-config');
let loggedUsers = require('./usersInRooms');

module.exports = (io, socket) => {
  
  // user connected
  const roomId = socket.handshake.query.roomId;
  const userId = socket.handshake.query.userId;
  const socketId = socket.id;
  socket.room = roomId;
  socket.join(roomId);
  loggedUsers.addUserToRoom(roomId, userId);
  Room.findOne({_id: roomId}, (err, room) => {
    if (err) throw err;
    let feed = room.feed.slice();
    feed.push({
      userId: userId,
      date: new Date(),
      info: ' has joined the chat'
    });
    if (feed.length > chatConfig.feedLimitPerRoom) {
      feed.shift();
    }
    room.feed = feed;
    room.save((err) => {
      if (err) throw err;
      const usersInRoom = loggedUsers.getRoom(roomId).users;
      User.find({ _id: { $in: usersInRoom } }, (err, users) => {
        if (err) throw err;
        io.to(roomId).emit('user-connected', { feed: feed, usersInRoom: users });
      });
    })
  });
  
  // user disconnected
  socket.on('disconnect', () => {
    loggedUsers.deleteUserFromRoom(roomId, userId);
    Room.findOne({_id: roomId}, (err, room) => {
      if (err) throw err;
      let feed = room.feed.slice();
      feed.push({
        userId: userId,
        date: new Date(),
        info: ' has left the chat'
      });
      if (feed.length > chatConfig.feedLimitPerRoom) {
        feed.shift();
      }
      room.feed = feed;
      room.save((err) => {
        if (err) throw err;
        const usersInRoom = loggedUsers.getRoom(roomId).users;
        console.log(usersInRoom);
        User.find({ _id: { $in: usersInRoom } }, (err, users) => {
          if (err) throw err;
          io.to(roomId).emit('user-disconnected', { feed: feed, usersInRoom: users });
          socket.leave(roomId);
        });
        
      });
    });
  });
  
  // user sends text message
  socket.on('add-message', (message) => {
    Room.findOne({_id: roomId}, (err, room) => {
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
  
  // user uploads file
  socket.on('fileUpload', (fileObj) => {
    let time = (new Date()).getTime();
    const pathToSave = `server/tmp/uploads/${roomId}/${time}-${fileObj.name}`;
    mkdirp(`server/tmp/uploads/${roomId}`, (err) => {
      if (err) throw err;
      fs.writeFile(pathToSave, fileObj.fileData, (err) => {
        if (err) throw err;
        io.to(roomId).emit('fileUploadFinish', {
          name: fileObj.name,
          size: fileObj.size,
          type: fileObj.type,
          date: time
        });
      });
    });
  });
  
  // user downloads file
  socket.on('fileDownload', (fileInfo) => {
    fs.readFile(`server/tmp/uploads/${roomId}/${fileInfo.date}-${fileInfo.name}`, (err, file) => {
      if (err) throw err;
      io.sockets.connected[socketId].emit('fileDownloadFinish', {file: file});
    })
  });
  
};
