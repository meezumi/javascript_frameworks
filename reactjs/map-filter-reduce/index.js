// MAP
var numbers = [3, 56, 2, 48, 5];

// console.log(numbers)

function double(x){
  return x*2;
}

const doubles = numbers.map(double)
console.log(doubles)

// map is just awesome, dont have to create a seperate list or iterate through, jus call the function you want.


// FILTER
var num  =[4,56,787,11,23];

const filtering = num.filter(function (num) {
  return num > 50;
})
// inside it expects a function, so we create a anonymous function
console.log(filtering)

// filter() replaces all of this ->

// var newNum = [];
// num.forEach(function (value){
//   if(value > 50){
//     newNum.push(value);
//   }
// })
// console.log(newNum);


// REDUCE 
sum = [45,22,77,88,101];

var total = sum.reduce(function (accumulator, currentNumber){
  return accumulator + currentNumber;
})
console.log(total);

// FIND - it starts and stops when it finds 1st number satisfying the function 

const neww = num.find(function(num){
  return num > 10;
})

// const neww = num.findIndex(function (num) {
//   return num > 10;
// });

console.log(neww);