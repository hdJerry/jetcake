

var approot = require('app-root-path');

let jwt = require('jsonwebtoken');

const base64_to_img = require('base64-img');

let code = require(approot + '/config/secret.js');


randomString = function(length) {
    if (!length) {
        length = 5;
    }
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
}


//Generate Random Numbers
randomNumbers = function (length) {
	return Math.floor(Math.pow(10, length - 1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1));
}




authenticateJWT = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    // console.log( req.headers);

    if (authHeader) {
      const token = authHeader;
        // const token = authHeader.split(' ')[1]

        jwt.verify(token, `${code.secret}`, async (err, user) => {

          // console.log(user);
            if (err) {
                return res.sendStatus(403);
            }

            let id = await findUser(user);

              req.user = id;

              next();

        });
      } else {
        res.sendStatus(401);
     }
};

findUser = async (data) =>{
  
  let userid = await dbUSERS.findOne({
    'email' : data.email,
    status : 1
  })


  if(userid){

    return {
      status : 1,
      user : userid['_id']
    }
  }else {
    return {
      status : 0,
      message : 'Contact the admin'
    }
  }

}




save_image = async (image,target)=>{

  // console.log(image);
  // console.log(target);


  if(image){

      let result = await process_image(image,target);

    if(result.isSaved){

      return {
        status : 1,
        message : "Saved",
        data : result.data
      }

    }else {
      return {
         status : 0,
        message : "Failed"
      }
    }

  }else {

    return {
      status : 0,
      message : "Image does not have valid format",
    }

  }




}


process_image = async (image,target) =>{

  let date = new Date().valueOf()

  let userx = randomNumbers(5) + randomString(10) + date;

  let format = await get_base64_format(image);


  let photo = `${target.split(" ").join("_")}${userx}.${format}`;
 let savephoto = `${target.split(" ").join("_")}${userx}`;

 await base64_to_img.imgSync(image, approot + '/client/public/uploads/', savephoto);

  return {
    data: photo,
    isSaved : true
  }

}


//Get base64 format
get_base64_format = async function (data) {
	// console.log(data);
	var codec = data.split(';');
	var format = codec[0].split('/')[1];

	if (format == 'jpeg') {
		format = 'jpg';
	}

	return format;
}
