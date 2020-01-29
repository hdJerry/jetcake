'use strict';

var approot = require('app-root-path');
var md5 = require('md5');
const path = require("path");
let rootpath = approot.toString();
const userfuncs = require(path.join(
  rootpath,
  "app",
  "user",
  "controller.js"
));


module.exports = function(app){
  app
  .post('/login',loginFunction)
  .post('/signup',regFunction)
  .post('/photo', authenticateJWT, photoFunction)
  .post('/edit', authenticateJWT, editFunction)
}


function loginFunction(request,response){

  let req = request.body;
  // console.log(req);

  userfuncs
        .loginUser(req,request)
        .then(login =>{

          response.send(login)
        })
        .catch(err =>
          response.send({
            status : 0,
            message : err
          })

        )
}



function regFunction(request,response){

  let req = request.body;


  userfuncs
        .regUser(req,request)
        .then(reg =>{

          response.send(reg)
        })
        .catch(err =>
          response.send({
            status : 0,
            message : err
          })

        )
}

function photoFunction(request,response){

  let req = request.body;


  userfuncs
        .userPhoto(req,request)
        .then(photo =>{

          response.send(photo)
        })
        .catch(err =>
          response.send({
            status : 0,
            message : err
          })

        )
}

function editFunction(request,response){

  let req = request.body;


  userfuncs
        .editUser(req,request)
        .then(edit =>{

          response.send(edit)
        })
        .catch(err =>
          response.send({
            status : 0,
            message : err
          })

        )
}
