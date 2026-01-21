
//data types and variables
//undefined, null, boolean, string, symbol, number, object
//running it in vs code terminal is node index.js

//var, let, const
var x = 5; //can be redeclared later, can be used throughout the program

let y = 10; //can be redeclared later and cannot be redeclared in the same scope, it can only be used in the scope it is declared in

const z = 15; //cannot be redeclared later, the value cannot be changed

//variables declared outside of a function are global

//variables declared inside of a function are local


console.log(x, y, z);

//variables and  words are case sensitive
//use camelCase for variable names
//properCamelCase


//basic math

var sum = 2 + 2;
console.log(sum);

//increment and decrement
var a = 5;
a++;
console.log(a);
a--;
console.log(a);

//escaping strings
var string = "hello \"world\"";
console.log(string);

//using single quotes
var string2 = 'hello "world"';x
console.log(string2);

//accessing multidimensional arrays
var array = [1, 2, 3, [4, 5, 6]];
console.log(array[3][1]);

//array.push() - adds to the end
array.push(7);
console.log(array);

//array.unshift() - adds to the beginning
array.unshift(0);
console.log(array);

//array.pop() - removes from the end
array.pop();
console.log(array);
 
//array.shift() - removes from the beginning
array.shift();
console.log(array);

//function 
function add(x, y) {
    return x + y;
}
console.log(add(2, 3));


//how to get a random whole number between 0 and 9
const min = 1;
const max = 100;
const randomNumber = Math.random() * (max - min) + min;
