const mongoose = require('mongoose'); 
// ODM

// https://jasonwatmore.com/fix-for-mongooseserverselectionerror-connect-econnrefused-1-27017

mongoose.connect("mongodb://127.0.0.1/fruitsDB"); // <- name of db
// then we specify the name of the database we want to create or connect to

// creating a structure, a blueprint for our database
const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: [true, "please enter name"]
  },
  rating: { // data validation to the structure of database.
    type: Number,
    min: 1,
    max: 10,
  },
  review: String,
});

// creating a mongoose model
const Fruit = mongoose.model("Fruit", fruitSchema); // creating a collection

const fruit = new Fruit ({ // an entry on the collection of fruits.
  // name: "peompom", // name is not provided here so, we use update method
  rating: 7,
  review: "pretty nasty, doctor likey yeyy."
});

// fruit.save(); // saving the entries (used to enter single entry)
// this will save the same fruit every single time we use fruit.save()

const personsSchema = new mongoose.Schema ({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personsSchema);

const pineapple = new Fruit({
  name: "pineapple",
  rating: 9,
  review: "pine in my dime."
})

const bombogranade = new Fruit({
  name: "redGranade(?)",
  rating: 8,
  review: "looking like a wow"
})

// pineapple.save();
bombogranade.save();

const person = new Person ({
  name: "james",
  age: 37,
});

Person.updateOne({name: "james"}, {favouriteFruit: bombogranade}).then (function(){
  console.log("updated successfully.");
}).catch(function(err){
  console.log(err);
});

// const person = new Person({
//   name: "amylodigo",
//   age: 23,
//   favouriteFruit: pineapple // connecting a collection to another in a db.
// });

// person.save();

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
// Fruit.insertMany([kiwi, orange, banana]).then (function(){
//   console.log("Succesfully saved items in the db");
//   }).catch(function(err){
//     console.log(err);
//   });

async function myfruits() { // cresting a getallfruits func
  const fruits = await Fruit.find({}); // accessing the db
  fruits.forEach(function (fruit) { // for each fruit 
    console.log(fruit.name); // print fruit name
    
  setTimeout(() => {
    mongoose.connection.close(); // after 5 units, close the connection to the database.
    }, 5);
  });
}
myfruits(); // calling the function

Fruit.updateOne({ _id: "655afc8be4fec0bffba71858" }, {name: "peach"}).then (function(){
  console.log("updated successfully.");
}).catch(function(err){
  console.log(err);
});

Fruit.deleteOne({ _id: "655afeb50f5db249fe60b025" })
  .then(function () {
    console.log("deleted successfully.");
  })
  .catch(function (err) {
    console.log(err);
  });

  Person.deleteMany({ name: "james"}).then (function(){
  console.log("deleted successfully.");
}).catch(function(err){
  console.log(err);
});

// adding relationships between the two collections:
// first add parameter to the personsSchema


// will do next module as a revision later