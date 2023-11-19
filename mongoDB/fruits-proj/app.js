const mongoose = require('mongoose'); 
// ODM

// https://jasonwatmore.com/fix-for-mongooseserverselectionerror-connect-econnrefused-1-27017

mongoose.connect("mongodb://127.0.0.1/fruitsDB"); // <- name of db
// then we specify the name of the database we want to create or connect to


// creating a structure, a blueprint for our database
const fruitSchema = new mongoose.Schema ({
  name: String,
  rating: Number,
  review: String
});

// creating a mongoose model
const Fruit = mongoose.model("Fruit", fruitSchema); // creating a collection

const fruit = new Fruit ({ // an entry on the collection of fruits.
  name: "apple",
  rating: 7,
  review: "pretty nasty, doctor likey yeyy."
});

// fruit.save(); // saving the entries (used to enter single entry)
// this will save the same fruit every single time we use fruit.save()

const personsSchema = new mongoose.Schema ({
  name: String,
  age: Number
});

const Person = mongoose.model("Person", personsSchema);

const person = new Person ({
  name: "james",
  age: 37
});

person.save();

const kiwi = new Fruit ({
  name: "Kiwi",
  rating: 10,
  review: "awesomee"
})

const orange = new Fruit({
  name: "Oranze",
  rating: 9,
  review: "wakku waakk",
});

const banana = new Fruit({
  name: "Bonana",
  rating: 8,
  review: "huge",
});

// insertMany, used for multiple entries
Fruit.insertMany([kiwi, orange, banana]).then (function(){
  console.log("Succesfully saved items in the db");
  }).catch(function(err){
    console.log(err);
  });

