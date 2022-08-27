/*
#1 Nodejs is a javascript runtime built on  Chrome V8 Javascript engine
#2 V8 engine + c++ programm
#3 Nodejs is Non-blocking (waiter->takes order->coustomer-1-->gives info to cook-->take another order from customer2->give order to
    customer1->gives info to cook of customer 2)
#4  NPM=node pakage manager

     to create Package.json 
               - npm init


#5 Package.json
  -having dependancy

#6 Module systems
  -encasulate code

#7 Core Module

  
*/

// const add = require("./module");

// const give = require("./module2");

// add();

// console.log(give("shreyash"));

// const path=require('path');

// console.log(path.dirname(__filename));
// console.log(path.dirname(__dirname));
// console.log(path.extname(__filename));
// console.log(path.parse(__filename));
// console.log(path.join(__dirname,'order1','order2'));

const fs=require('fs');

const path=require('path');

const cookies=require('cookies');


//Make a directory

// fs.mkdir(path.join(__dirname,'/file'),(err)=>{
//     console.log(err);
// })

// //create a file

// fs.writeFile(path.join(__dirname,'file','file.txt'),"Hello,world",(err)=>{
//     console.log(err);
// })

// //append data

// fs.appendFile(path.join(__dirname,'file','file.txt'),"Hello,world",(err)=>{
//     console.log(err);
// })
//read file

// fs.readFileSync(path.join(__dirname,'file','file.txt'),'utf-8',(err,data)=>{
//      if(err)
//      {
//         console.log("error");
//      }
//     console.log(data);
// })

//operating system module

// const os=require('os');
// console.log(os.type());
// console.log(os.release());
// console.log(os.endianness());
// console.log(os.cpus());
// console.log(os.freemem());
// console.log(os.totalmem());
// console.log(os.platform());
// console.log(os.uptime());

//return class
// const even= require('events'); 
// const { error, Console } = require('console');
// //makes object
// const myemmiter=new even();

// //listner
// myemmiter.on('somename',(data)=>{
//     console.log(data);
// })


// myemmiter.emit('somename',{
//     name:'Shreyash'
// })

//http module


// const http=require('http');

// http.createServer((req,res)=>{
//    console.log(req.url);
//     console.log("start....")
   
//   fs.readFile(path.join(__dirname,'file','file.html'),(err,content)=>{
//     if(err)
//     {
//      console.log("err");
//     }
//     res.end(content);
//    })
// }).listen(3000);


const express=require('express');

const bodyparser=require('body-parser');
const cors=require('cors');
const cookieParser=require('cookie-parser');
const jwt=require('jsonwebtoken');
const nodemailer=require('nodemailer');
var app=express();
const multer=require('multer');

app.use(cookieParser());
app.use(express.json());
app.use(cors({origin:'http://localhost:4200'}));

//app.use(bodyparser.json());
// app.get('/',(req,res)=>{



//     console.log("Server started");
//     res.end("Home,page");
// });

// app.get('/about',(req,res)=>{
  

//     res.send("about page")
// })


//set interval

// //to start excution after some time
// var id=setInterval(() => {
//   console.log("Helolo,world");
// }, 1000);

// //to stop interval
// clearInterval(id)

//DNS
//is a method to get information of hostname

// const dns=require('dns');

// dns.lookup('www.javapoint.com',(err,address,family)=>{
//   console.log('Adresss',address);
//   console.log('family',family)
// })

//Crypto
//support cryptography
//include the set of wrapper
//Hash->fixed lenght string of bits
//HMAC->hash base message authentication code
// const crypto=require('crypto');
// const secret='bnsihndd';
// const hash=crypto.createHash('shreyash@21',secret).update("pawar");

// console.log(hash);

// app.listen(3000);

//Express js

//is the middleware use in post requst to convert the data come from fronted to json
// app.use(express.json());

// let user=[
//   {
//     'id':1,
//     'name':"shreyash"
//   },
//   {
//     'id':2,
//     'name':"shreya"
//   },
//   {
//     'id':3,
//     'name':"sejal"
//   },
//   {
//     'id':4,
//     'name':"virat"
//   }



// ];

// //  app.get('/user/:id',(req,res)=>{
// //   console.log(req.query);
// //   console.log(req.params.id);
// //   res.send("successful");


// // })
const user=express.Router();
const auth=express.Router();

app.use('/user',user);
app.use('/auth',auth);




user
.route('/')

.get(gettuser)
.post(postuser)
//.patch(update)


// user
// .route('/getcook')
// .get(getcook)

user
.route('/search')
.post(search)
.get(setcook)

// user
// .route('/signup')
// .get(middeleware1,getsign,miidleware2)

// user
// .route('/login')
// .post(loginuser)

user
.route('/delete:id')
.delete(deletedata)

user
.route('/update:id')
.patch(updatedata)

user
.route('/mailme:id')
.get(mailme)
 

// function middelware(req,res,next){
//   console.log("Midleware Encounter-1")
//   next();
// }

// function middelware2(req,res,next){
//   console.log("Midleware Encounter-2")
  
//   next();
// }
const mongooes=require('mongoose');
const { json } = require('express');
const bcrypt=require('bcrypt');
const { Module } = require('module');
const { Http2ServerRequest } = require('http2');
const { createSecretKey } = require('crypto');
const Cookies = require('cookies');
const { Console, error } = require('console');
const db_link="mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
mongooes.connect(db_link)
.then(function(db){
  console.log("database connected");
  // console.log(db);
})
.catch(function (err) {
  console.log(err)
})


const  usermanagerschema=mongooes.Schema({
  AccountName:{
   type:String,
   required:true,
   unique:true
   
  },
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


usermanagerschema.pre('save',async function(){
  let sautlt =await bcrypt.genSalt();
  let hash= await bcrypt.hash(this.password,sautlt);
 this.password=hash;
  console.log(hash);
});



const userModel=mongooes.model('usermanagerschema', usermanagerschema);
 

//to send data from frontend to bamckand
async function gettuser(req,res){
  res.setHeader("Access-Control-Allow-Origin","*")
  res.setHeader("Access-Control-Allow-Headers",
     "Origin,X-Requested-With,Content-Type,Accept");
     res.setHeader("Access-Control-Allow-Methods","GET")
   //  res.setHeader('set-cookie','islogin=true');

    //  res.cookie('isLoggeddIn',false,{maxAge:1000*60*60*40});
    //  console.log(req.cookies.islogin);
    //  res.clearCookie('islogin');
    //  console.log(req.cookies.islogin);
  let data=await userModel.find();
  console.log(data);
   res.send(data);
  

    
}

 
 function setcook(req,res){
  res.setHeader('set-cookie','islogin=true');
  res.send("cookis send");}



async function postuser(req,res){
  // res.setHeader("Access-Control-Allow-Origin","*")
  // res.setHeader(
  //   "Access-Control-Allow-Headers",
  //    "Origin,X-Requested-With,Content-Type,Accept"
  //    );
  //    res.setHeader("Access-Control-Allow-Methods",
  //    "GET","POST","PATCH","DELETE","OPTIONS");
  let real=req.body;
  //res.json(req.body);
  console.log(real);
  console.log(req.body.Confirmpassword);
  if(req.body.password==req.body.Confirmpassword){
  // let data1=await userModel.create(real);
  // console.log(data1);
    var emp=await userModel.create({
      AccountName:req.body.AccountName,
      email:req.body.email,
      password:req.body.password,
      Confirmpassword:req.body.Confirmpassword
    });
    emp.save((err,doc)=>{
       if(!err){res.send(doc);}
       else(console.log("error"))
    })
   // res.send(202).send("succe");

  console.log("thanks for login");
  // res.send(202,{
  //    message:"succes"
  // })
 // res.end();
   
  }
  else{
    console.log("password and confirm password is not same !! try again");
    
  }
  

}

async function search(req,res){
  let data6= await userModel.findOne({AccountName:req.body.AccountName})
   res.send(data6);

  console.log(data6);
}


async function loginuser(req,res) {
    let data1=req.body.email;
    console.log(req.body.email)
    let data=await userModel.findOne(req.body);
    console.log(data);

  if(data)
  {
    console.log("Valid user !!");
    res.sendFile(path.join(__dirname,'file','file.html'));


  }else{
    console.log(" not Valid user !!")
    res.redirect('/user');
    
  }

  

  
}




async function updatedata(req,res)
{

//    let email =req.body.email;

  
  let new_data={
    AccountName:req.body.AccountName,
    email:req.body.email,
    password:req.body.password,
    Confirmpassword:req.body.Confirmpassword
  }

//   let data5=await userModel.findOneAndUpdate({email:email}, new_data)
//     res.send(data5);

//   console.log(data4);
   let newdata=await userModel.findByIdAndUpdate({_id:req.params.id},new_data);
   newdata.save((err,doc)=>{
    if(!err){res.send(doc);}
    else(console.log("error"))
 })
}

 async function mailme(req,res){

    let data =await userModel.findById({_id:req.params.id});
    
   let testaccount= await nodemailer.createTestAccount();

   var transporter=nodemailer.createTransport({
   service:'Gmail',
    port:465,
    secure:false,
    auth:{
    user:'shreyashsunilpawar21@gmail.com',
    pass:'gxfqkbodnmkuwzcb',
    },
  
   });
     await transporter.sendMail({
    from:' "UserManage"<shreayshsunilpawar21@gmail.com>',
    to:"pawarshreyash208@gmail.com",
    subject:"Here is Your password !! ",
    text:  "HEllow",
    html:`   <h2 style="color:black;background-color:red;">User Manager</h2><br><br><br>
  
           <b> App</b>- ${data.AccountName}<br><br><br>
           <b>User_Name</b>- ${data.email}</td><br><br><br>
           <b> Password</b>- ${data.Confirmpassword}</td><br><br><br>
           <hr><hr><br><br><br><br>
           if you have any,question ,<span style="background-color:yellow;">please</span> reach out to <br>
            <a href="/">shreyashsunilpawar21@gmail.com</a>
            
                        `
                  
   },function (error,info) {
    if(error){console.log(error)}
    else{
      console.log("succes")

    }
    
   })
   

 }



//delete
async function  deletedata(req,res) {
   let data4=await userModel.findByIdAndDelete({_id:req.params.id})
   
   console.log(data4);
  
}

//post hooks
// userschema.pre('save',function(doc){
//   console.log("befor");
// });
 
async function loginme(req,res){

  
  let new_data={
    email:req.body.email,
    password:req.body.password,
    Confirmpassword:req.body.Confirmpassword
  }


  


}

function getid(req,res)
{
console.log(req.params);
res.send("successful !");
  
}

function getsignup(req,res){

  res.sendFile(path.join(__dirname,'file','file.html'));
  
}

function postdata(req,res)
{
  console.log(req.params.first_name);
  var data=req.body.first_name;
  res.json({
    message:"Data receive succesfully",
    data:data
  })
}

app.listen(process.env.PORT|| 3000);


