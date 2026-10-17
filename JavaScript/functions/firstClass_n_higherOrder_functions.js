/**
 * TOPIC: First-class and higher-order functions
 * ---------------------------------------------
 * FIRST-CLASS FUNCTIONS: JavaScript treats functions as values. You can
 *   - assign a function to a variable
 *   - store it in an object or array
 *   - pass it as an argument to another function
 *   - return it from another function
 *
 * HIGHER-ORDER FUNCTIONS: functions that TAKE a function as a parameter
 * and/or RETURN a function.
 *
 * Read firstClass_n_higherOrder_functions.md for the full explanation.
 *
 * HOW TO RUN: in index.html, switch the <script> tag to this file, or run
 * `node firstClass_n_higherOrder_functions.js`.
 */


// ============================================================
// 1. ASSIGNING A FUNCTION TO A VARIABLE
// ============================================================
// An arrow function stored in a constant. `greet` holds the function itself.
const greet = (name) => `Hello ${name}`;

console.log(greet('Anees'));   // Hello Anees


// ============================================================
// 2. FUNCTIONS INSIDE AN OBJECT
// ============================================================
// Each property's value is a function. A function stored on an object
// is called a METHOD.
const calc = {
    add: (a, b) => a + b,
    sub: (a, b) => a - b,
    mul: (a, b) => a * b,

    // An arrow function needs { } and an explicit `return` when its body
    // has more than one statement.
    div: (a, b) => {
        // JS already returns Infinity for x / 0. We check it here anyway
        // to make the special case visible.
        if (b === 0) {
            return Infinity;
        }
        return a / b;
    },

    mod: (a, b) => {
        // x % 0 is NaN in JS. Returning NaN keeps that behaviour explicit.
        if (b === 0) {
            return NaN;
        }
        return a % b;
    },
};

console.log(`add: ${calc.add(5, 5)}`);   // 10
console.log(`sub: ${calc.sub(5, 5)}`);   // 0
console.log(`mul: ${calc.mul(5, 5)}`);   // 25
console.log(`div: ${calc.div(5, 5)}`);   // 1
console.log(`mod: ${calc.mod(5, 5)}`);   // 0
// TRY IT: call calc.div(5, 0) and calc.mod(5, 0).


// ============================================================
// 3. PASSING A FUNCTION AS AN ARGUMENT (a "callback")
// ============================================================
// `run` is a higher-order function: it receives a function and calls it.
function run(task) {
    task();
}

run(() => console.log('funception'));   // we pass the function, run() calls it


// ============================================================
// 4. RETURNING A FUNCTION (and closures)
// ============================================================
// makeMultiplier returns a NEW function. That inner function still
// remembers `factor` after makeMultiplier has finished running.
// This "remembering" is called a CLOSURE.
function makeMultiplier(factor) {
    return (n) => n * factor;
}

const double = makeMultiplier(2);   // a function that multiplies by 2
const triple = makeMultiplier(3);   // a function that multiplies by 3

console.log(double(5));   // 10
console.log(triple(5));   // 15


// ============================================================
// 5. A COUNTER BUILT WITH A CLOSURE
// ============================================================
// `count` lives inside makeCounter, so nothing outside can change it
// directly. Only the returned function can read and update it.
function makeCounter() {
    let count = 0;
    return () => {
        count += 1;
        return count;
    };
}

const counter = makeCounter();
console.log(`Counter 1: ${counter()}`);   // 1
console.log(`Counter 1: ${counter()}`);   // 2
console.log(`Counter 1: ${counter()}`);   // 3
console.log(`Counter 1: ${counter()}`);   // 4

// Every call to makeCounter() creates a brand-new `count`,
// so counter2 starts again from 0 and doesn't affect counter.
const counter2 = makeCounter();
console.log(`Counter 2: ${counter2()}`);  // 1
console.log(`Counter 2: ${counter2()}`);  // 2
