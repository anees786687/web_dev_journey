/**
 * The Event loop
 * 
 * - [MDN: The event loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model)
 * - [MDN: Call stack](https://developer.mozilla.org/en-US/docs/Glossary/Call_stack)
 * - [MDN: setTimeout()](https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout)
 * 
 * Consider the given code 
 * 
 *  function multiply(x, y) {
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
 * When the printSquare function is called it inturn calls square(), which calls multiply(). The call stack would be like
 * Global -> printSquare -> square() -> multiply (top of the stack)
 * Global represents all of the code written outside any of the function, it comes first and goes last.
 * JS is single-threaded so it will run one thing at time and call stack is the representation of that
 * 
 * Now consider the following code
 */

console.log('A');

setTimeout(()=>{
    console.log('B');
}, 0);


setTimeout(()=>{
    console.log('C');
}, 0);

console.log('D');

/**
 * The output would be
 * A
 * D
 * B
 * C
 * 
 * From the given the code the output should be
 * A
 * B
 * C
 * D
 * 
 * B and C are printed before D as the timeout time is 0 milliseconds, which means the callback must be called immediately. But this does not happen!
 * 
 * To understand this we have to understand about Queue data structure which lives alongside the call stack.
 * Queue holds all the functions waiting to be called. The only catch is that functions in the Queue wait for the call stack to be empty before \
 * they can be added to the call stack; only when Global leaves the call stack the functions in the Queue can enter the stack (this is why A and C
 * are printed first; the call stack would be Global-> console.log(A)-> console.log(D)).
 * 
 * THe machinery that moves functions from Queues to stack is called the event loop.
 * 
 * So when any event or a timer fires a callback, it is first put in the Queue and those callback wait in FIFO order to enter the call stack once it is
 * empty. Furthermore, the callbacks run in the order they are registered (this is why B gets printed before C).
 * 
 * So the final picture would be like
 * 
 * 1. `Global` goes on the stack.
 * 2. `console.log('A')` runs. `A` is logged.
 * 3. Both `setTimeout` runs in the order they are encountered. 
    Its delay is `0`, so the callback is ready essentially at once, and it joins the queue. It cannot run yet, because the stack is not empty: `Global` is still on it.
 * 4. `console.log('D')` runs. `D` is logged.
 * 5. `Global` finishes and comes off. The stack is now empty.
 * 6. The event loop sees something waiting, moves the callback onto the stack, and runs it. `B` is logged first as it joined the Queue first and then `C` is printed.
 */