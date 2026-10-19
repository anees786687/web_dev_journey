/**
 * TOPIC: The call stack, stack traces and the debugger
 * ----------------------------------------------------
 * The CALL STACK is how the JS engine keeps track of which function is
 * running and which functions are waiting for it to finish.
 *
 *   - Calling a function PUSHES it onto the top of the stack.
 *   - Returning from a function POPS it off the top.
 *   - Last in, first out: the newest call always finishes first, like a
 *     stack of plates.
 *
 * Example: placing a coffee order (the functions are defined in section 2)
 *
 *     placeOrder('latte')
 *       -> calls brewCoffee('latte')
 *            -> calls grindBeans(18)
 *
 *   What happens                                   Stack (bottom -> top)
 *   placeOrder('latte') starts                     placeOrder
 *   it calls brewCoffee                            placeOrder, brewCoffee
 *   brewCoffee calls grindBeans                    placeOrder, brewCoffee, grindBeans
 *   grindBeans returns 'ground beans' -> popped    placeOrder, brewCoffee
 *   brewCoffee returns 'a hot latte'  -> popped    placeOrder
 *   placeOrder logs the result, then finishes      (empty)
 *
 * placeOrder went on FIRST but came off LAST. While grindBeans runs, the
 * other two are paused, waiting for the value they asked for.
 *
 * HOW TO RUN: open index.html, then open DevTools (F12). Keep DevTools open
 * and refresh: the `debugger;` statement at the bottom pauses the code.
 * (Node.js also works: `node call_stacks.js`. It ignores `debugger;`.)
 */


// ============================================================
// 1. READING A STACK TRACE
// ============================================================
// When an error is thrown and not caught, the console prints the error
// AND the call stack at that moment. This is called a STACK TRACE:
//
//     Uncaught ReferenceError: milk is not defined
//         at addMilk (call_stacks.js:LINE:COL)      <- the line that broke
//         at makeCappuccino (call_stacks.js:LINE:COL) <- the function that called addMilk
//         at call_stacks.js:LINE:COL                <- the top level of the file
//
// Read it TOP to BOTTOM: the top line is where the error happened, and each
// line below it is the caller of the line above. In DevTools, click a
// file:line link to jump to that line.
//
// TRY IT: uncomment the block below and reload. It throws on purpose, because
// `milk` was never declared. The error stops the rest of the file, so comment
// it out again afterwards.

// function addMilk(drink) {
//     return `${drink} with ${milk}`;   // ReferenceError: milk is not defined
// }
// function makeCappuccino() {
//     return addMilk('espresso');
// }
// makeCappuccino();


// ============================================================
// 2. console.trace(): PRINT THE STACK WITHOUT AN ERROR
// ============================================================
// console.trace(message) prints the message like console.log, followed by
// the current call stack. The program keeps running. In the browser you see:
//
//     Grinding now
//     grindBeans    @ call_stacks.js:LINE
//     brewCoffee    @ call_stacks.js:LINE
//     placeOrder    @ call_stacks.js:LINE
//     (anonymous)   @ call_stacks.js:LINE     <- the top level of the file

function grindBeans(grams) {
    console.trace('Grinding now');
    return `${grams}g of ground beans`;
}

function brewCoffee(drink) {
    const beans = grindBeans(18);
    return `a hot ${drink} made from ${beans}`;
}

function placeOrder(drink) {
    const coffee = brewCoffee(drink);
    console.log(`Order ready: ${coffee}`);
}


// ============================================================
// 3. THE debugger STATEMENT
// ============================================================
// `debugger;` is a breakpoint written into the code. While DevTools is OPEN,
// the browser pauses on this line so you can:
//   - hover over variables to see their values
//   - read the Scope and Call Stack panels
//   - step through the code one line at a time (see README.md)
// When DevTools is closed, the statement does nothing.
// ⚠️ Delete `debugger;` statements before you share your code.
debugger;
placeOrder('latte');   // Order ready: a hot latte made from 18g of ground beans

// TRY IT: while paused, press "Step into" (F11) until you reach grindBeans,
// and watch the Call Stack panel grow to three functions.
