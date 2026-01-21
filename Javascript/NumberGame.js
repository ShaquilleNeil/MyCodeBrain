let guesses = 0; //number of guesses
let min = 1;
let max = 20
let randomNumber = Math.floor(Math.random() * max) + 1; //random number between 1 and 20
let remark = "";

let playerguess = 0



while(playerguess != randomNumber){
   playerguess= parseInt( prompt("Guess a number between 1 and 20;"))

   if(playerguess > randomNumber){
      remark = "Too High";
      console.log(remark)
      guesses++
   }
   else if (playerguess < randomNumber) {
    remark = "Too Low";
    console.log(remark)
    guesses++
   }
   else {
    remark = "Correct!";
    console.log(remark)
    guesses++
    console.log(`It took you ${guesses} guesses`)

   }
}