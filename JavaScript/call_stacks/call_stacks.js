/**
 * call stack represents all the functions that are running at the moment 
 * understanding call stacks helps us understand how the code runs and this is first thing in the browser when anything goes wrong
 * 
 * Suppose we have three functions, 
 *   function multiply(x, y) {
        return x * y;
    }

    function square(n) {
        return multiply(n, n);
    }

    function printSquare(n) {
        const squared = square(n);
        console.log(squared);
    }

    printSquare(5);
 * 
 * 
 * 
 * the following occurs when they are run
 * - `printSquare` is added to the call stack, and the engine goes inside its body. Stack: `printSquare`.
 * - To evaluate `square(5)`, `square` is added and the engine goes inside it. Stack: `printSquare`, `square`.
 * - To evaluate `multiply(5, 5)`, `multiply` is added. Stack: `printSquare`, `square`, `multiply`.
 * - `multiply` returns `25` and is removed. Stack: `printSquare`, `square`.
 * - `square` returns that `25` and is removed. Stack: `printSquare`.
 * - `console.log(25)` is added, prints, and is removed.
 * - `printSquare` finishes and is removed. The stack is empty again.
 * 
 * Notice the shape of that: functions come off in the opposite order from how they went on. `multiply` was added last and removed first. At the deepest moment, the stack held all three, and it was the engine's record of what still had to be finished.
 */



/**
 * Suppose some thing goes wrong with a function. We get the following error
 * 
 * call_stacks.js:42 Uncaught ReferenceError: doesNotExist is not defined
 * at multiply (call_stacks.js:42:17)
 * at square (call_stacks.js:47:12)
 * at printSquare (call_stacks.js:51:21)
 * at call_stacks.js:55:1
 * 
 * The console shows the error and the stack as well. it tells us what broke and how the engine got to the broken line.
 * The call stack shown reflects which function called which. 
 */

// function multiply(x, y) {
//     console.log(doesNotExist);
//     return x * y;
// }

// function square(n) {
//     return multiply(n, n);
// }

// function printSquare(n) {
//     const squared = square(n);
//     console.log(squared);
// }

// printSquare(5);


/**
 * console.trace() works similar to a console.log(), it prints whatever you pass to it and additionally prints the current call stack
 * 
 * call_stacks.js:71 trace!
 * multiply	@	call_stacks.js:71
 * square	@	call_stacks.js:76
 * printSquare	@	call_stacks.js:80
 * (anonymous)	@	call_stacks.js:83
 */
function multiply(x, y) {
  console.trace('trace!');
  return x * y;
}

// debugger; // add this to enable debugger in development tools
function square(n) {
  return multiply(n, n);
}

function printSquare(n) {
  console.log(square(n));
}
debugger;
printSquare(6);