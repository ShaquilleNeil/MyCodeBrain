function start() {
    for (var i = 0; i < 5; i++){
        if (true) {
            let color = "red";
            console.log(color);
        }

        let color = "blue";
        console.log(color);
    }
}

start();

console.log("---------------------------------------------------");
console.log();

//write a function that logs a greeting message as an arrow function

const greeting = (a = "Hello") => console.log(a);

greeting("Good Bye");
greeting();

console.log("---------------------------------------------------");
console.log();

const greetingNames = (a , b = "hello") => console.log(b + " " + a);

greetingNames("Adam");
greetingNames("Adam", "Good Bye");


//Write a function (arrow function) to receive main object and two more variables as a new property name and value.
// Then return the object plus provided property.



console.log("---------------------------------------------------");
console.log();


const propObject = (a, b, obj = {a, b}) => console.log("Object:", obj, "Values:", a, b);
propObject(1,2);

const propObject2 = (obj, pname, value) =>   Object.assign(obj, {[pname]: value });



const person = propObject2({Name: "Adam"}, "Age", 21);

console.log(person);

// Write a function to receive a user object with some properties including 'password' and returns a new user object without 'password' property.
 

const User = {
    email: "email@mail.com",
    userName: "Adam",
    Password: "junebug"

};


const { Password, ...newUser} = User;
console.log(newUser);


