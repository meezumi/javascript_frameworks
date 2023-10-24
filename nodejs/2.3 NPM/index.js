// USING COMMOMJS

// var generate_name = require("sillyname");
// var sillyName = generate_name();

// console.log(`my name is ${sillyName}`);
// to add a variable in a string we use ${var} inside ``

// USING MODULE

// import genarateName from "sillyname"
// var silly_name = genarateName();

// console.log(`my name is ${silly_name}`)

// ========================================================================== //

// const superheroes = require("superheroes");

// superheroes.all;

// var super_name = superheroes.random()

// console.log(`my name is ${super_name}`)

import superheroes from "superheroes"

var name = superheroes.random()
console.log(`${name}, here for the rescue.`)