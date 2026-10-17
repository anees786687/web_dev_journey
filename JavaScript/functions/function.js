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
 * Why use one?
 *   - Scope:      variables inside it stay private and don't leak out.
 *   - Expression: compute a value in one go (like `result` below).
 *   - Async:      quickly run code inside an async function (covered later).
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
