let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken');
let config = require('../config');

router.post('/login', (req, res) => {
  let result = { success: false };
  if (req.body.Login === 'admin@admin.com' && req.body.Password === '111') {
    result.success = true;
    result.token = jwt.sign({ login: req.body.Login }, config.jwt_secret);
  }
  res.send(result);
});

module.exports = router;
