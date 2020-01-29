const express = require('express');
const app = express();


const appRoot = require('app-root-path');

//Include Model
require(appRoot+'/config/model.js');
//Include Config
require(appRoot+'/config/config.js')(app);




//Start Server
app.listen(4004, function(){
    console.log(new Date()+' App Started...');
});
