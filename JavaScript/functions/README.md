# 4. Functions

Functions let you name a piece of logic and reuse it. In JavaScript, functions are also
**values**, so you can store them, pass them around and return them. That one idea powers
callbacks, event handlers and closures.

## Files (in order)

| # | File | What you'll learn |
|---|------|-------------------|
| 1 | [function.js](function.js) | Defining and calling functions, parameters vs arguments, `return`, too few/too many arguments, calling vs referencing, IIFEs, rest parameters (`...args`) and spreading an array into a call, arrow functions, returning several values in an object |
| 2 | [firstClass_n_higherOrder_functions.js](firstClass_n_higherOrder_functions.js) | Functions stored in variables and objects, callbacks, functions that return functions, closures, a private counter |
| 3 | [firstClass_n_higherOrder_functions.md](firstClass_n_higherOrder_functions.md) | The theory behind file 2, built-in higher-order functions (`map`, `filter`, `reduce`...) and common pitfalls |
| | [index.html](index.html) | Runs one of the `.js` files in the browser |

## How to run

- **Browser:** open `index.html` and press `F12` → *Console*. It loads `function.js` by default.
  To run the other file, swap which `<script>` line is commented out. (Both files define
  `greet`, so they can't be loaded on the same page.)
- **Node.js:** `node function.js` or `node firstClass_n_higherOrder_functions.js`

## Key ideas

- `myFunc` **refers to** the function. `myFunc()` **runs** it.
- Missing arguments become `undefined`. Extra arguments are ignored. Neither one throws an error.
- A function with no `return` gives back `undefined`.
- `...` in a **definition** is a *rest parameter*: it gathers any number of arguments into an array, and must come last.
  `...` in a **call** is *spread*: it unpacks an array into separate arguments.
- **Arrow functions** (`(a, b) => a + b`) are a shorter syntax. They aren't hoisted, can't be used with `new`, and don't have their own `this` (see [8. The `this` keyword](../this_keyword/)).
  To return an object from the short form, wrap it in parentheses: `() => ({ x: 1 })`.
- A function returns **one** value. To return several, return an object (`return { a, b };`) and destructure it: `const { a, b } = fn();`.
- A **higher-order function** takes a function as an argument or returns one.
- A **closure** is a function that remembers the variables from the place where it was written, even after that outer function has finished.

## Try it

1. Write `makeGreeter(greeting)` that returns a function, so `makeGreeter('Hi')('Anees')` gives `"Hi, Anees!"`.
2. Use spread to find the largest number in an array with `Math.max(...)`.
3. Add a `reset()` to the counter: make `makeCounter()` return an object `{ next, reset }` instead of a single function.
4. Rewrite `addThree` from `function.js` as a one-line arrow function.
5. Answer the *Check your understanding* questions at the end of the `.md` file.

---

[← 3. Arrays and loops](../seq_n_iterations/) · **Next:** [5. Objects, the DOM and events →](../JS_and_DOM/)
