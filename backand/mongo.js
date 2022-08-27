const mongooes=require('mongoose');
const { json } = require('express');
const db_link="mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
mongooes.connect(db_link)
.then(function(db){
  console.log("database connected");
  // console.log(db);
})
.catch(function (err) {
  console.log(err)
})


const userschema=mongooes.Schema({
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true,
    unique:true,
  
  },
  Confirmpassword:{
    type:String,
    required:true
    
  
  }
})

const userModel=mongooes.model('userModel', userschema);
