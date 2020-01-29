'use strict';


var approot = require('app-root-path');
var md5 = require('md5');
let ObjectId = require('mongoose').Types.ObjectId;
let jwt = require('jsonwebtoken');

let code = require(approot + '/config/secret.js');


async function loginUser(data){

  let res = await dbUSERS.find({
    email : data.email,
    password : md5(data.password)
  });

  if(res){
    if(res.length > 0){

    if(res[0].status === 1){
      let user = await loguser();

      return {
        status : 1,
        message : "User found, You will be logged in in few seconds",
        data : user
      }
    }else{
      return{
        status : 0,
        message : "User has been blocked, Please comtact the admin for help"
      }
    }
  }else{
    return {
      status : 2,
      message : "User not found"
    }
  }


  }else{
    return {
      status : 0,
      message : "Error Finding user"
    }
  }

  async function loguser(){
     let token = jwt.sign({email : res[0].email, password :  md5(data.password)}, `${code.secret}`, {expiresIn : '1h'});



     return {
       email : res[0].email,
       phone : res[0].phone,
       photo: res[0].photo,
       address : res[0].address,
       secret : res[0].secret,
       token : token
     };


  }

}


async function regUser(data){

  // console.log(data);

  let img = await save_image(data.photo,"profile");

  console.log(img);

  if(img.status === 1){

    data.photo = img.data

  }else{
    data.photo = "";
  }


  let user = await findUser({email:data.email})

  if(user.status == 1){

    return {
      status : 2,
      message : "User already exist"
    }

  }

  data.password = md5(data.password);


  let succ = await new dbUSERS(data).save()

  if(succ){

    return {
      status : 1,
      message : "User saved"
    }

  }else{
    return {
      status : 0,
      message : "Error Saving users details"
    }
  }

  // console.log(data);



}


async function editUser(data,request){

  let user = request.user.user;
  // console.log(user);


  let datas = JSON.parse(JSON.stringify(data));

  delete datas.token;
  
  let res = await dbUSERS.updateOne({
    "_id" : ObjectId(user)
  },{
     $set : datas
  });


  if(res){
    if(res.nModified > 0){

      return {
        status : 1,
        message : "Updated",
        data : datas
      }

    }else {
      return {
        status : 2,
        message : "Failed to update info"
      }
    }

  }else {
    return {
      status : 0,
      message : "Error Occured while updating Info"
    }
  }


}


async function userPhoto(data,request){

  let user = request.user.user;

  // console.log(user);

  let img = await save_image(data.photo,"profile");

  // console.log(img);

  if(img.status === 1){

    data.photo = img.data

    let res = await dbUSERS.updateOne({

      "_id" : ObjectId(user)

    },{
      $set:{
        photo : img.data
      }
    });

    if(res){
      if(res.nModified > 0){

        return{
          status : 1,
          message : "Saved",
          data : img.data
        }

      }else{
        return {
          status : 2,
          message : "Failed to save picture in db"
        }
      }
    }else{
      return {
        status : 0,
        message : "Failed to save picture"
      }

    }

  }else{
    return {
      status : 0,
      message : "Failed to save picture"
    }

  }





}

module.exports = {
  loginUser,
  regUser,
  editUser,
  userPhoto
}
