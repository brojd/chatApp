'use strict';
let express = require('express');
let bodyParser = require('body-parser');
let config = require('./config');
let authRoutes = require('./routes/auth');
let roomRoutes = require('./routes/room');

let app = express();

app.use(express.static(config.staticPath));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', authRoutes);
app.use('/room', roomRoutes);

app.listen(config.port);
console.log(`Listening on port ${config.port}`);
