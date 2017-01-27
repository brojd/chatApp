'use strict';
let express = require('express');
let bodyParser = require('body-parser');
let config = require('./config');
let jwt = require('jsonwebtoken');

let app = express();

app.use(express.static(config.staticPath));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/login', (req, res) => {
  
  let result = { success: false };
  
  if (req.body.Login === 'admin@admin.com' && req.body.Password === '111') {
    result.success = true;
    result.token = jwt.sign({ login: req.body.Login }, config.jwt_secret);
  }
  
  res.send(result);
  
});

app.listen(config.port);
console.log(`Listening on port ${config.port}`);
