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
// A cinema gives a discount to children (under 12) OR seniors (60+),
// but only on weekdays.
// Returns a random whole number between min and max (both included).
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const age = getRandomNumber(5, 80);
const isWeekday = Math.random() < 0.5;   // true or false, at random
let ticket;

// ( ) group the || so it is checked first: (child OR senior) AND weekday.
if ((age < 12 || age >= 60) && isWeekday) {
    ticket = 'Discount ticket';
} else {
    // We only get here if the condition above is false, so a plain `else`
    // is enough. Repeating the opposite condition in an `else if` would be
    // redundant.
    ticket = 'Full-price ticket';
}
console.log(`Age: ${age} Weekday: ${isWeekday} Result: ${ticket}`);
// ⚠️ Without the brackets, `age < 12 || age >= 60 && isWeekday` means
// `age < 12 || (age >= 60 && isWeekday)`, because && is evaluated before ||.
// Children would then get the discount at weekends too.


// ============================================================
// EXAMPLE 3: what should I wear? (most specific condition first)
// ============================================================
const isCold = true;
const isRaining = true;
const isWindy = false;

// The case that needs ALL three conditions is checked FIRST.
// If `isCold` alone were checked first, we'd stop there every time it's cold.
if (isCold && isRaining && isWindy) {
    console.log('Wear a raincoat, a scarf and gloves!');
} else if (isCold && isRaining) {
    console.log('Wear a raincoat!');
} else if (isCold) {
    console.log('Wear a jumper!');
} else {
    console.log('A T-shirt is fine!');
}
// TRY IT: set isWindy = true, then isRaining = false, then isCold = false.


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
