'use strict';
let path = require('path');
let environment = process.env.NODE_ENV || 'production';

let localStaticPath = environment == 'production' ? '../client' : '../dist/client';
module.exports = {
  env: environment,
  port: process.env.PORT || 9000,
  staticPath: path.resolve(__dirname, localStaticPath),
  jwt_secret: process.env.JWT_SECRET || 'angular2-secret',
  maxRequestSize: '5mb',
  mongoDB_URI: 'mongodb://admin:admin1!@ds161518.mlab.com:61518/chat'
};
