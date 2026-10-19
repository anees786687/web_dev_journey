# 7. The call stack and debugging

When something breaks, the browser tells you **where** it broke and **how the code got
there**. That information comes from the **call stack**. This folder shows how to read it, and
how to pause your code with the debugger instead of guessing with `console.log`.

## Files

| File | What it is |
|------|------------|
| [call_stacks.js](call_stacks.js) | A coffee-order example of functions being pushed onto and popped off the stack, reading a stack trace, `console.trace()`, and the `debugger` statement |
| [index.html](index.html) | Loads the script. Open it with DevTools open to pause on `debugger;` |

## How to run

1. Open `index.html` in a browser and press `F12` to open DevTools.
2. **Refresh** the page with DevTools still open. The code pauses on the `debugger;` line in the
   *Sources* tab (Chrome) or *Debugger* tab (Firefox).
3. Use the step buttons, then press *Resume* (`F8`) and check the *Console* for the `console.trace()` output.

Node.js also works (`node call_stacks.js`), but it ignores `debugger;`.

## Key ideas

- Calling a function **pushes** it onto the stack. Returning **pops** it off. The last function in is the first one out.
- A **stack trace** is printed with every uncaught error. Read it **top to bottom**: the top line is where it broke, and each line below is the caller of the line above.
- `console.trace('msg')` prints the current stack **without** throwing an error.
- `debugger;` pauses the code **only while DevTools is open**. Clicking a line number in the *Sources* tab (a breakpoint) does the same without editing the file.
- While paused, you can hover over variables, read the *Scope* and *Call Stack* panels, and step through the code:
  **Step over** (`F10`) runs a call without entering it, **Step into** (`F11`) goes inside it, and **Step out** (`Shift + F11`) finishes the current function.

The full step-by-step guide, with a table of what each button does, is in the
[JavaScript README](../README.md#debugging-with-the-call-stack-and-the-debugger).

## ⚠️ Common mistakes

- Leaving `debugger;` in finished code. Anyone who opens DevTools on your page will be paused.
- Reading a stack trace from the bottom up. The **top** line is the one that broke.

## Try it

1. Uncomment the `makeCappuccino` block in `call_stacks.js`, reload, and click each `file:line` link in the error.
2. Remove the `debugger;` line and set a breakpoint inside `grindBeans` by clicking its line number instead.
3. Add a `heatWater()` function and call it from `brewCoffee`. Predict the order in which the four functions are popped off the stack, then check with `console.trace()`.

---

[← 6. Nullish coalescing](../nullish_coalescing/) · **Next:** [8. The `this` keyword →](../this_keyword/)
