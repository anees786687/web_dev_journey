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