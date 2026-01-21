// The core task

// Write a function that takes one number and returns:

// "Fizz" if divisible by 3

// "Buzz" if divisible by 5

// "FizzBuzz" if divisible by both

// Otherwise, return the number as a string

// Same logic as your Swift FizzBuzz. Same rules of the universe.

// The constraint (this is the point)

// You must follow all of these:

// ❌ No if

// ❌ No else

// ❌ No loops

// ✅ Use ternary operators

// ✅ Return a value (do not console.log inside the function)

// This forces you into expression-based reasoning, which is where JavaScript quietly differs from Java and Swift.

function fizzbuzz(num){

    //check if input is a number
    let check = Number(num);

  return Number.isNaN(check) ? `Please enter a valid number` : check % 3 === 0 && check % 5 == 0 ? "fizzbuzz" : check % 3 == 0 ? "fizz" : check % 5 == 0 ? "buzz" : String(check) ;
    



}

let answer = fizzbuzz("12a")
console.log(answer)