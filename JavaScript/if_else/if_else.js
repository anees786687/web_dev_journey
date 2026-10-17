/**
 * TOPIC: Conditionals (if / else if / else)
 * -----------------------------------------
 * An `if` statement runs a block of code only when its condition is truthy.
 *
 *     if (condition) {
 *         // runs when condition is truthy
 *     } else if (otherCondition) {
 *         // runs when the first is falsy and this one is truthy
 *     } else {
 *         // runs when none of the above matched
 *     }
 *
 * The conditions are checked TOP to BOTTOM and only the FIRST matching
 * block runs, so the order of your conditions matters.
 *
 * Logical operators used below:
 *   &&  AND -> true only if BOTH sides are true
 *   ||  OR  -> true if AT LEAST ONE side is true
 *   !   NOT -> flips true/false
 *
 * Read truthy_falsy.md to learn what counts as "true" in a condition.
 *
 * HOW TO RUN: open index.html in a browser and open the Console (F12),
 * or run `node if_else.js`.
 */


// ============================================================
// EXAMPLE 1: grade calculator (if / else if / else chain)
// ============================================================
const marks = 85;
// TRY IT (browser only): ask the user instead. prompt() returns a STRING,
// so turn it into a number first:
// const marks = Number(prompt('Enter your marks!'));

let grade;

// Checked top to bottom: 85 is not > 90, but it IS > 80, so grade = 'A'.
// If the order were reversed (> 60 first), everyone above 60 would get 'C'.
if (marks > 90) {
    grade = 'O';
} else if (marks > 80) {
    grade = 'A';
} else if (marks > 70) {
    grade = 'B';
} else if (marks > 60) {
    grade = 'C';
} else {
    grade = 'D';
}
console.log(`Marks: ${marks} Grade: ${grade}`);


// ============================================================
// EXAMPLE 2: combining conditions with || and &&
// ============================================================
// Returns a random whole number between min and max (both included).
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const score = getRandomNumber(0, 100);
const bonusPoints = getRandomNumber(0, 10);
let message;

if (score > 80 || bonusPoints > 5) {
    message = 'High score!';
} else {
    // We only reach here if BOTH score <= 80 AND bonusPoints <= 5,
    // so a plain `else` is enough. Writing that condition again
    // as `else if (score <= 80 && bonusPoints <= 5)` would be redundant.
    message = 'Keep trying';
}
console.log(`Score: ${score} Bonus Points: ${bonusPoints} Result: ${message}`);


// ============================================================
// EXAMPLE 3: what can I cook? (most specific condition first)
// ============================================================
const flour = true;
const egg = true;
const sugar = false;

// Cake needs all three ingredients, so it is checked FIRST.
// If `flour` alone were checked first, we'd always stop at bread.
if (flour && egg && sugar) {
    console.log('Can make cake!');
} else if (flour && egg) {
    console.log('Can make pasta!');
} else if (flour) {
    console.log('Can make bread!');
} else {
    console.log('Cannot make anything!');
}
// TRY IT: set sugar = true, then egg = false, then flour = false.


// ============================================================
// QUICK NOTE: truthy and falsy values
// ============================================================
/**
 * A condition doesn't have to be an actual boolean. JS converts it:
 *
 *   FALSY (behaves like false): false, 0, -0, 0n, "", null, undefined, NaN
 *   TRUTHY: everything else, including "0", "false", [], {} and function(){}
 *
 * See truthy_falsy.md for the details and common traps.
 */
const username = '';
if (username) {
    console.log(`Welcome, ${username}`);
} else {
    console.log('Empty string is falsy, so this branch runs.');
}
