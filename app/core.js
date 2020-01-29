"use strict";
var rootpath = require('app-root-path');

module.exports = function(app){


  require('./user/service')(app)
}
