"use strict";

module.exports = function (app) {

      var rootpath = require('app-root-path');
      var express = require('express');
      var bodyparser = require('body-parser');

      app
            .use(bodyparser.json({
                  limit: '10mb'
            }))
            .use(bodyparser.urlencoded({
                  extended: true,
                  limit: '10mb'
            }))


            .use(function ( request, response, next ) {

              // console.log();

                  // Website you wish to allow to connect
                  var allowedOrigins = [
                  'http://127.0.0.1:8000',
                  'http://127.0.0.1:3000',
                  'http://localhost:8080'
                ];
                  var origin = request.headers.origin;
                  // console.log(origin);
                  if ( allowedOrigins.indexOf(origin) > -1 ) {
                        response.setHeader('Access-Control-Allow-Origin', origin);
                        request.headers.authorization = request.body.token || ""

                        // return false;
                  }

                  response.setHeader('Access-Control-Allow-Methods', 'GET');
                  response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
                  next();
            })


            require('./helper.js');
            require(rootpath + '/app/core.js')(app);

}
