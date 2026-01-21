

function identifyingNum(num, word){
   let results = {};
   let specialChars = ["@", "#", "%"]
   let characters = []

   num % 2 == 0 ? results["Parity"] = "Even" : results["Parity"] = "Odd"

   num > 0 ? results["Sign"] = "Positive" : results["Sign"] = "Negative"

   for (let i of word){
         if(specialChars.includes(i)){
             characters.push(i)   
         }
      }

      characters.length ? results["Special Characters"] = characters : results["Special Characters"] = "No special charactcers"
      
   

   return results
  
}

let result = identifyingNum(11, "i a%m @ 3 and i have #6");
console.log(result);