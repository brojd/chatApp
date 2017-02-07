let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken');
let config = require('../config');
let User = require('../models/user.model');

router.post('/login', (req, res) => {
  let result = { success: false };
  User.findOne({ 'email': req.body.Email }, (err, user) => {
    if (err) throw err;
    if (user && (user.password === req.body.Password)) {
      result.success = true;
      result.nickname = user.nickname;
      result.avatarUrl = user.avatarUrl;
      result.userId = user._id;
      result.token = jwt.sign({ login: req.body.Login }, config.jwt_secret);
    } else if (user) {
      result.message = 'Password is not correct';
    } else if (!user) {
      result.message = 'User does not exist';
    }
    res.send(result);
  });
  
});

router.post('/signup', (req, res) => {
  User.find({ $or: [{'email': req.body.Email}, {'nickname': req.body.Nickname}] }, (err, users) => {
    if (err) throw err;
    if (users.length) {
      res.send({ success: false, message: 'Nickname or email has been already chosen' });
    } else {
      let newUser = new User({
        nickname: req.body.Nickname,
        email: req.body.Email,
        password: req.body.Password,
        avatarUrl: req.body.AvatarURL
      });
      newUser.save((err, room) => {
        if (err) throw err;
        res.send({ success: true, room: room });
      });
    }
  });
});

module.exports = router;
