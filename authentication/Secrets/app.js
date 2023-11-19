//jshint esversion:6
// import express from "express";
// import bodyParser from "body-parser";
// import ejs from "ejs";
// import mongoose from "mongoose";
// import encrypt from "mongoose-encryption";
// type = module (using module)

// https://www.passportjs.org/tutorials/password/ documentation for passport.js

require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose"); // lvl1 - login
const encrypt = require("mongoose-encryption"); // lvl2 
const md5 = require("md5"); // lvl3
const bcrypt = require("bcrypt"); // lvl4
const saltRounds = 10; // setting the number of rounds for salting

// below three are used for lvl5 - passport.js (implementing cookie service)
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

// LEVELS OF AUTHENTICATION:

// LEVEL 1 - username and password to identify user
// LEVEL 2 - Database encrytion so the password or other details are not visible as plain site
// LEVEL 3 - hashing passwords 
// LEVEL 4 - hashing and salting, salting refers to adding a random set of characters, adding to the hash function and then puts through the hash function.
// LEVEL 5 - using the npm package passport

console.log(process.env.SECRET);

const app = express();
const port = 3000;

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser. urlencoded({
  extended: true
}));

 // ################### for lvl 5 ##########################
app.use(session({
  secret: "wewilllatersetthisin.env",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize()); // we using app to simply initialize passport //
app.use(passport.session()); // to tell the app to setup a session which we gave some intial configuration just above.
// ################## ----------- ###########################

// this is to connect to the server, so first we have to start the server.
// to start  the server we use: mongod in the terminal, then
mongoose.connect("mongodb://127.0.0.1/userDB"); 
mongoose.set("useCreateIndex", true); // deprecation error //
// const userSchema = ({
//   email: String,
//   password: String
// });  this is just the basic one(simple js object) for level 1, now we will upgrade it for level 2 auth. 

const userSchema = new mongoose.Schema ({
  email: String,
  password: String,
  // now its an object created from object schema class
});

userSchema.plugin(passportLocalMongoose); // to hash and salt our passwords into out db.

// const secret = "Thisisourlittlesecret."; 
// later we will use this as the environment variables 

// ############################################# //

// userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ["password"] });

// taking the Schema, add mongoose encrypt as a plugin to our schema and pass the secret as a js object
// encrytion is enabled before creating the database
// encryptedField just enables us to only encrypt a part of the database, here for example we have password
// ############################################# //

const User = new mongoose.model("User", userSchema);

passport.use(User.createStatergy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/", function(req, res){
    res.render("home");
});


app.get("/login", function (req, res) {
  res.render("login");
});

// // uncomment from here for lvl1-4 
// app.post("/login", function(req, res){
//   const username = req.body.username;
//   // const password = req.body.password; for lvl1, lvl2 and lvl4 
//   // const password = md5(req.body.password); for hashing (lvl3)
//   const password = req.body.password;

//   User.findOne({email: username}, function (err, foundUser){  
//     if(err){
//       console.log(err) 
//     } else {
//       if(foundUser) {
//         // if (foundUser.password === password){
//         //   res.render("secrets"); // used for lvl1-lvl3
//         // } // this means they enterd the correct password and logged in to the server, so we can render the secrets page.

//         // #################################### // using lvl4 bcrypt

//         bcrypt.compare(password, foundUser.password, function (err, result) {
//           if (result === true) {
//             res.render("secrets");
//           } else {
//             console.log(err);
//           }
//         });
//         // #################################### //
//       } 
//     }
//   });

// });

app.get("/register", function (req, res) {
  res.render("register");
});

// once the user enters the information in order to register, the post method gets called and so to catch the data from html(/ejs) we use an app.post route

// // uncomment from here for lvl1-4->
// app.post("/register", function(req, res){

//   bcrypt.hash(req.body.password, saltRounds, function(err, hash){
//     const newUser = new User({
//       email: req.body.username,
//       // password: req.body.password (for lvl1 and lvl2)
//       // password: md5(req.body.password) (for lvl3)
//       password: hash // (for lvl4)
//     });
//     newUser.save(function (err) {
//       if (err) {
//         console.log(err);
//       } else {
//         res.render("secrets"); // only render if the user is logged in
//       }
//     });
//   });

//   // used for the fisrt 3 levels of authentication

//   // const newUser = new User({
//   //   email: req.body.username,
//   //   // password: req.body.password for lvl1 and lvl2
//   //   password: md5(req.body.password)
//   // });
//   // newUser.save(function(err){
//   //   if (err) {
//   //     console.log(err);
//   //   } else {
//   //     res.render("secrets"); // only render if the user is logged in
//   //   }
//   // });

// });

app.get("/secrets", function(req, res){
  if (req.isAuthenticated()){
    req.render("secrets");
  } else {
    res.redirect("/login");
  }
});

app.get("/logout", function(req, res){
  req.logout();
  res.redirect("/");
});


app.post("/register", function(req, res) {
  User.register({username: req.body.username}, req.body.password, function(err, user){
    if (err) {
      console.log(err);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, function(){
        res.redirect("/secrets");
      })
    }
  })
});

app.post("/login", function(req, res){
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  req.login(user, function(err){
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function(){
        res.render("/secrets");
      });
    }
  });
});


app.listen(port, function(){
  console.log("server up and running at port: 3000" )
})