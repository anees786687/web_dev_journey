/**
 * TOPIC: Functions (the basics)
 * -----------------------------
 * A function is a reusable block of code. You DEFINE it once and then
 * CALL (invoke) it as many times as you like.
 *
 * This file covers:
 *   1. Defining functions (with and without parameters / return values)
 *   2. Calling a function
 *   3. Too few / too many arguments
 *   4. Calling a function vs. referencing it
 *   5. IIFE: Immediately Invoked Function Expression
 *   6. Rest parameters (...) and spread in function calls
 *   7. Arrow functions
 *   8. Returning multiple values in an object
 *
 * HOW TO RUN: open index.html in a browser and open the Console (F12),
 * or run `node function.js` in a terminal.
 */


// ============================================================
// 1. DEFINING FUNCTIONS
// ============================================================

// No parameters and no `return`.
// A function without a `return` statement gives back `undefined`.
function doGreet() {
    console.log("Hello");
    console.log("World!");
}

// Parameters let the caller customise what the function does.
// `return` sends a value back to whoever called the function.
function addThree(x, y, z) {
    return x + y + z;
}

function greet(name) {
    return `Hello ${name}`;   // template literal: ${...} inserts a value into the string
}


// ============================================================
// 2. CALLING (INVOKING) A FUNCTION
// ============================================================
// The name `doGreet` just identifies the function.
// The parentheses `()` are what actually run it.
doGreet();


// ============================================================
// 3. ARGUMENTS: TOO FEW OR TOO MANY
// ============================================================

// Call addThree and store the value it returns in `sum`.
const sum = addThree(1, 2, 3);
console.log(`sum: ${sum}`);                                   // sum: 6

// Too FEW arguments is not an error. Missing parameters become `undefined`.
// 1 + 2 + undefined -> NaN ("Not a Number")
const sumMissingArg = addThree(1, 2);
console.log(`sumMissingArg: ${sumMissingArg}`);               // NaN

console.log(`Passing no argument to greet: ${greet()}`);      // Hello undefined
console.log(`Passing an argument to greet: ${greet('Anees')}`);

// Too MANY arguments is not an error either. The extra ones are ignored.
console.log(`Passing extra args: ${greet('Sam', 'Bam')}`);    // Hello Sam


// ============================================================
// 4. CALLING A FUNCTION vs. REFERENCING IT
// ============================================================
// Without (), you are not calling the function. You are just referring to it.
// `sumFunc` now points to the same function as `addThree`.
const sumFunc = addThree;

console.log(`Calling through the reference: ${sumFunc(4, 5, 6)}`);  // 15
console.log(sumFunc);   // prints the function itself, not a result

// `sum` holds the RESULT of a call (a number); `sumFunc` holds the FUNCTION.
console.log(`sum: ${typeof sum}, sumFunc: ${typeof sumFunc}`);      // number, function

// TRY IT: change `const sumFunc = addThree;` to `const sumFunc = addThree();`
// and see what happens. (Hint: now you're storing a result, not a function.)


// ============================================================
// 5. IIFE: IMMEDIATELY INVOKED FUNCTION EXPRESSION
// ============================================================
/**
 * An IIFE is a function that runs as soon as it is defined:
 *
 *     (function name(a, b) {
 *         // body
 *     })(arg1, arg2);
 *
 * The first ( ) wraps the function so JS treats it as an expression.
 * The second ( ) calls it straight away.
 *
 * You'll mostly see IIFEs in older code. Before `let` and `const` had
 * block scope, wrapping code in an IIFE was the usual way to keep its
 * variables from becoming globals. A `{ }` block does that job today.
 */
const result = (function add(a, b) {
    return a + b;
})(1, 2);

console.log(`IIFE result: ${result}`);   // 3


// ============================================================
// 6. REST PARAMETERS (...) AND SPREAD IN FUNCTION CALLS
// ============================================================
// The same three dots do two OPPOSITE jobs depending on where they are:
//   in a function DEFINITION -> REST: gathers many arguments INTO one array
//   in a function CALL       -> SPREAD: unpacks one array OUT INTO arguments

// REST parameter: accepts any number of arguments.
// Inside the function, `nums` is a real array.
function printNums(...nums) {
    // typeof says "object" because arrays are objects in JS.
    // Array.isArray() is the reliable way to check for an array.
    console.log(`Nums: ${nums}, typeof: ${typeof nums}, isArray: ${Array.isArray(nums)}`);
}

printNums(1, 2, 3, 4, 5, 6);   // Nums: 1,2,3,4,5,6
printNums();                   // Nums: (an empty array, no error)

// SPREAD in a call: each item of the array becomes a separate argument.
const arr = [1, 2, 3, 4, 5];
printNums(...arr);             // same as printNums(1, 2, 3, 4, 5)

// A rest parameter can follow normal parameters, but it must come LAST.
function introduce(greeting, ...names) {
    console.log(`${greeting}, ${names.join(' and ')}!`);
}
introduce('Hello', 'Sam', 'Bam');   // Hello, Sam and Bam!
// ⚠️ function bad(...names, greeting) {} is a SyntaxError.

// TRY IT: Math.max(1, 5, 3) gives 5. How would you get the largest number
// in `arr` using spread?


// ============================================================
// 7. ARROW ("FAT ARROW") FUNCTIONS
// ============================================================
// `=>` gives a shorter way to write a function. Arrows are usually
// stored in a `const`. Things to know before swapping every function for one:
//   - Stored in a const, an arrow is NOT hoisted: you can't call it above
//     the line where it's defined (see basics/hoisting.md).
//   - An arrow has no `this` of its own (see the this_keyword folder).
//   - An arrow can't be called with `new` (covered later).

// The same function written three ways:
function addDeclared(x, y) {
    return x + y;
}
const addArrow = (x, y) => {
    return x + y;
};
const addShort = (x, y) => x + y;   // one expression: no { } and no `return` needed

console.log(addDeclared(2, 3), addArrow(2, 3), addShort(2, 3));   // 5 5 5

// One parameter: the parentheses are optional.  No parameters: () is required.
const square = n => n * n;
const sayHello = () => 'Hello!';
console.log(square(4), sayHello());   // 16 Hello!

// ⚠️ Returning an object in the short form needs ( ) around it, otherwise
// the { } are read as the function body:
//     const makePoint = () => { x: 1 };    // returns undefined
const makePoint = () => ({ x: 1, y: 2 });
console.log(makePoint());             // { x: 1, y: 2 }


// ============================================================
// 8. RETURNING MULTIPLE VALUES (using an object)
// ============================================================
// `return` can only hand back ONE value. To give back several, put them
// in an object (or an array) and return that.
function getScoreStats(scores) {
    const highest = Math.max(...scores);
    const lowest = Math.min(...scores);
    const average = scores.reduce((sum, s) => sum + s, 0) / scores.length;
    // Shorthand: { highest } is the same as { highest: highest }
    return { highest, lowest, average };
}

const stats = getScoreStats([72, 95, 88, 64]);
console.log(`Highest: ${stats.highest} Lowest: ${stats.lowest} Average: ${stats.average}`);
// Highest: 95 Lowest: 64 Average: 79.75

// Even neater: destructure the returned object straight into variables.
const { highest, average } = getScoreStats([50, 70, 90]);
console.log(`highest: ${highest}, average: ${average}`);   // 90, 70
// TRY IT: add a `range` property (highest - lowest) to the returned object.
