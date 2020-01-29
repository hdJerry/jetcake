var mongoose = require('mongoose');

// var db_jetcake = mongoose.createConnection('mongodb+srv://storm:storm@stomweed-wtaxd.mongodb.net/test?retryWrites=true&w=majority', {
//   useCreateIndex: true,
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })mongodb://localhost:27017/shockbasedbv2_code

// mongoose.connect('mongodb://storm:storm@stomweed-wtaxd.mongodb.net/test?retryWrites=true&w=majority', {
 // mongoose.connect('mongodb://localhost:27017/jetcakedb_code', {
 mongoose.connect('mongodb+srv://storm:storm@stomweed-wtaxd.mongodb.net/test?retryWrites=true&w=majority', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(()=>console.log("DB server connect"))
    .catch(e => console.log("DB error", e));



var db_jetcake = mongoose.connection;


if(!db_jetcake)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")


let Schema = mongoose.Schema;
let objectId = mongoose.objectId;


let db_USERS = new Schema({

  email : {
    type: String,
     index: {
        unique: true
   }
 },
 password : String,
 phone : String,
 dob : String,
 secret : Object,
 address : String,
 photo : String,
 status : {
   type : Number,
   default : 1
 }

});

db_USERS.set('strict');

dbUSERS = db_jetcake.model('jc_users', db_USERS);
