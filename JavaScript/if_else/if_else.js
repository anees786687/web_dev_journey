// // Program to check grade based on marks
// marks = prompt('Enter your marks!');
// grade = 'Grade:'

// if (marks > 90){
//     console.log(grade + 'O');
// }
// else if(marks > 80){
//     console.log(grade + 'A');
// }
// else if(marks > 70){
//     console.log(grade + 'B');
// }
// else if(marks > 60){
//     console.log(grade + 'C');
// }
// else{
//     console.log(grade + 'D');
// }

// function getRandomNumber(min, max){
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }
// let score = getRandomNumber(0,100);
// let bonusPoints = getRandomNumber(0,10);
// let message = "";

// if (score > 80 || bonusPoints > 5) {
//   message = "High score!";
// }
// else if (score <= 80 && bonusPoints <= 5) {
//   message = "Keep trying";
// }

// console.log(`Score: ${score} Bonus Points: ${bonusPoints} Result: ${message}`);


let flour = true, egg = true, sugar = false;
let canMakeBread = false, canMakePasta = false, canMakeCake = false;

if(flour && egg && sugar){
    canMakeCake = true;
    console.log("Can make cake!");
}
else if (flour && egg) {
    canMakePasta = true;
    console.log("Can make pasta!");
}
else if (flour) {
    canMakeBread = true;
    console.log("Can make bread!");
}
else {
    console.log("Cannot make anything!");
}

/**
 * A "truthy" value is a value that is considered true when encountered in a Boolean context. 
 * In JavaScript, you don't need to explicitly convert a value to a Boolean before using it in a conditional.
 * 
 * Common truthy values include:

    true
    42 (any number that isn't 0)
    "hello" (any non-empty string)
    [] (an empty array)
    {} (an empty object)
    function() {} (an empty function)

* A "falsy" value works the same way, but for values that evaluate to false.

* Common falsy values include:

    false
    0
    "" (an empty string)
    null
    undefined
    NaN (Not a Number)

 */