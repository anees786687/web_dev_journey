# JavaScript

HTML gives a page its structure and CSS gives it style. **JavaScript gives it behaviour.** This
folder goes from the very basics (variables) up to changing a web page with the DOM.

Every `.js` file starts with a **comment header** explaining the topic, is split into numbered
sections, and has inline comments showing the expected output (`// 10`). Look for:

- **TRY IT**: a small experiment to run
- **⚠️**: a common mistake, left in the code (commented out) so you can study it

The `.md` files are longer notes that go deeper into the theory and end with
*Check your understanding* questions.

---

## How to run the code

You only need a browser. [Node.js](https://nodejs.org/) is optional.

**Option A: the browser**
1. Open a folder's `index.html` (double-click it, or use the VS Code **Live Server** extension).
2. Open DevTools with `F12` (or right-click → *Inspect*) and go to the **Console** tab.
3. Edit the `.js` file, save it, and refresh the page.

**Option B: Node.js**
```bash
cd JavaScript/functions
node function.js
```
Everything except `JS_and_DOM/dom_basics.js` runs in Node, because `document` only exists in the browser.

**Option C: just experiment.** Type any snippet straight into the browser console and press Enter.

---

## Learning path

Follow the folders in this order. Each one only uses ideas from the folders before it.

| # | Folder | Topics | Start with |
|---|--------|--------|------------|
| 1 | [basics/](basics/) | `var` / `let` / `const`, scope, hoisting, the TDZ | [var_n_let.md](basics/var_n_let.md) |
| 2 | [if_else/](if_else/) | `if` / `else if` / `else`, `&&` `\|\|` `!`, truthy and falsy values | [if_else.js](if_else/if_else.js) |
| 3 | [seq_n_iterations/](seq_n_iterations/) | Arrays, `while`, `for`, `for...of`, `break` / `continue` | [seq_n_iteration.js](seq_n_iterations/seq_n_iteration.js) |
| 4 | [functions/](functions/) | Defining and calling functions, IIFEs, callbacks, higher-order functions, closures | [function.js](functions/function.js) |
| 5 | [JS_and_DOM/](JS_and_DOM/) | Objects, properties, methods, what the DOM is, `querySelector` | [dom_n_objs.js](JS_and_DOM/dom_n_objs.js) |
| 6 | [nullish_coalescing/](nullish_coalescing/) | `??`, `?.`, `??=`, default parameters | [nullish_coalescing.js](nullish_coalescing/nullish_coalescing.js) |

Each folder has its own `README.md` with the file list, key ideas and practice exercises.

---

## Quick reference cheat sheet

### Declaring variables
```js
const PI = 3.14;      // default choice: can't be reassigned
let count = 0;        // use when the value will change
count += 1;
// var x = 1;         // old style: avoid (function-scoped, hoisted as undefined)
```

### Conditionals
```js
if (score > 90) { ... } else if (score > 80) { ... } else { ... }
const label = isAdmin ? 'Admin' : 'User';   // ternary: a one-line if/else
```
Falsy values: `false` `0` `-0` `0n` `""` `null` `undefined` `NaN`. **Everything else is truthy.**

### Loops
```js
for (let i = 0; i < arr.length; i++) { ... }   // when you need the index
for (const item of arr) { ... }                // when you just need each item
while (condition) { ... }                      // when you don't know how many times
```

### Functions
```js
function add(a, b) { return a + b; }           // declaration (hoisted)
const add2 = function (a, b) { return a + b; } // expression
const add3 = (a, b) => a + b;                  // arrow function (implicit return)
```

### Objects
```js
const user = { name: 'Sam', age: 20 };
user.name;          // read  -> 'Sam'
user.city = 'Pune'; // add
delete user.age;    // remove
```

### Safe access and defaults
```js
const city  = user?.address?.city ?? 'Unknown';  // no crash if address is missing
const count = input ?? 0;                        // keeps 0 and "", unlike ||
```

### Comparing values
Use `===` and `!==` (strict). Avoid `==`: it converts types first, so `"0" == false` is `true`.

---

## Common mistakes covered in this folder

| Mistake | Where |
|---------|-------|
| Forgetting to update the counter, or using `continue` before the update, so the loop never ends | [seq_n_iterations/](seq_n_iterations/) |
| Counting down with `i++` instead of `i--` | [seq_n_iterations/](seq_n_iterations/) |
| Assigning to a variable you never declared, which creates an accidental global | [seq_n_iterations/](seq_n_iterations/), [var_n_let.md](basics/var_n_let.md) |
| Using `myFunc()` (calling it) when you meant `myFunc` (passing the function) | [firstClass_n_higherOrder_functions.md](functions/firstClass_n_higherOrder_functions.md) |
| Checking a broad condition before a specific one in an `if` chain | [if_else.js](if_else/if_else.js) |
| Using `\|\|` for defaults, which wipes out valid `0` or `""` values | [truthy_falsy.md](if_else/truthy_falsy.md) |
| Writing `user?.address.city`, which still crashes when `address` is missing | [nullish_coalescing.js](nullish_coalescing/nullish_coalescing.js) |
| Running DOM code in `<head>` before the elements exist | [JS_and_DOM/](JS_and_DOM/) |

---

## Useful resources

- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide): the official reference
- [javascript.info](https://javascript.info/): a free, beginner-friendly tutorial from start to finish
- [MDN: Introduction to the DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)

---

[← Back to the main README](../README.md)
