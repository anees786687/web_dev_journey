# Scope in JavaScript

## What scope is

MDN describes **scope** as the current execution context in which values and expressions are visible and can be referenced. A variable that isn't in the current scope simply can't be used there.

Scopes are **nested**: child scopes can reach their parents' variables, but parents can't reach into their children. Lookup only goes one way: from the inside out.

## The four kinds of scope

| Scope | Created by | What lives there |
|---|---|---|
| **Global** | Code running as a classic script | Anything declared at the top level of a `<script>` |
| **Module** | Code running as an ES module | Top-level declarations in that module file |
| **Function** | Every function | Parameters and anything declared inside it |
| **Block** | A pair of curly braces `{ }` | Only `let`, `const`, `class` (and, in strict mode, `function` declarations) |

The first three come from the context your code runs in. Block scope is different: it only exists for certain kinds of declarations, which is where most confusion comes from.

### Global scope

```js
const appName = "LMS";        // global (in a classic script)

function show() {
  console.log(appName);       // child scope can see the parent: works
}
```

### Module scope

In an ES module (`<script type="module">`, or a file using `import`/`export`), top-level variables are **private to that file** rather than global. Other files can only reach them through `export`. This is one reason modern code rarely pollutes the global scope.

### Function scope

```js
function makeToken() {
  const secret = "abc123";    // lives only inside makeToken
  return secret.length;
}
console.log(secret);          // ReferenceError: outer code can't look in
```

### Block scope

```js
if (true) {
  var a = 1;      // var ignores the block, so a belongs to the outer scope
  let b = 2;      // b belongs to this block only
}
console.log(a);   // 1
console.log(b);   // ReferenceError
```

## Block scoping rules in detail

### `var` and sloppy-mode function declarations: no block scope

A `var` (or a function declaration in non-strict code) declared inside a block belongs to the enclosing function or script, and changes to it persist after the block ends:

```js
var level = 1;
{
  var level = 2;     // same variable as the outer one, not a new one
}
console.log(level);  // 2 (the outer value was overwritten)
```

### `let`, `const`, and `class`: real block scope

```js
let level = 1;
{
  let level = 2;     // a separate variable that exists only in this block
}
console.log(level);  // 1 (the outer one is untouched)
```

Note that declaring `let level` again inside the block is **not** a redeclaration error, because the inner variable lives in its own block, a different scope. The `SyntaxError` only happens when you redeclare in the **same** scope.

This is called **shadowing**: the inner variable hides the outer one within the block.

### Function declarations inside blocks: depends on strict mode

In **strict mode**, a function declared inside a block is scoped to that block and hoisted to the top of it:

```js
"use strict";
{
  greet();               // works: hoisted to the top of the block
  function greet() { console.log("hi"); }
}
greet();                 // ReferenceError: not visible outside the block
```

In **sloppy (non-strict) mode**, function declarations inside blocks behave inconsistently, and MDN's advice is simply not to use them.

You can sidestep the issue entirely: if you need a function inside a block, use `const greet = () => {...}`, which follows the normal `const` block rules in every mode. Also note that ES modules and classes are automatically in strict mode.

### Using a bare block to hide temporary variables

`let` and `const` let you keep helper variables out of the outer scope **without** wrapping them in a function:

```js
let receipt;
{
  const price = 500;
  const taxRate = 0.18;
  receipt = { price, tax: price * taxRate };
}
console.log(receipt);        // { price: 500, tax: 90 }
console.log(typeof price);   // "undefined" (price stayed inside the block)
```

Before ES6, the only way to do this was an IIFE (an immediately invoked function). Blocks with `let`/`const` now serve the same purpose.

## The scope chain and lexical scoping

When JavaScript looks up a variable, it searches:

1. The current scope
2. Then the scope that encloses it
3. Then the next one out, and so on, up to global (or module) scope
4. If the variable isn't found anywhere: `ReferenceError: x is not defined`

This chain is **lexical**: it's determined by **where the code is written**, not where it's called from.

```js
const label = "global";

function outer() {
  const label = "outer";
  return function inner() {
    return label;          // finds outer's label: one level up where it was written
  };
}

const fn = outer();
fn();                      // "outer", even though fn is called from global code
```

This is exactly why `makeCounter()` in [functions/](../functions/firstClass_n_higherOrder_functions.js) works: the returned arrow function was **written inside** `makeCounter`, so its scope chain permanently includes that `count`, wherever the function is called from later. That retained scope is a **closure**.

## How this ties together the earlier topics

| Concept | How scope explains it |
|---|---|
| `var` vs `let`/`const` | They differ in **which** scope they belong to (function vs block) |
| Hoisting | Declarations are registered at the top of **their own scope** |
| TDZ | A `let`/`const` exists in its block's scope from the start but is locked until its line runs |
| Shadowing | An inner scope's variable hides an outer one with the same name |
| Closures | A function keeps access to the scope it was **written** in |
| Loop bug with `var` | One function-scoped `i` is shared, while `let` gives each iteration its own block-scoped `i` |

## Best practices

1. **Declare variables in the narrowest scope that works.** If something is only needed inside an `if` or a loop, declare it there with `let`/`const`.
2. **Avoid globals.** Use ES modules so top-level variables stay private to each file.
3. **Avoid confusing shadowing.** Reusing the same name in nested scopes is legal but makes code hard to follow; pick distinct names unless the shadowing is deliberate.
4. **Don't declare functions inside blocks in sloppy mode.** Use `const fn = () => {}` instead, or make sure you're in strict mode or a module.
5. **Use closures deliberately** for private state, as in `makeCounter`, rather than relying on shared outer variables.

## Check your understanding

1. Predict both outputs:
   ```js
   var x = 1;
   let y = 1;
   if (true) {
     var x = 2;
     let y = 2;
   }
   console.log(x, y);
   ```
2. Why doesn't `const c = 2` inside a block throw "already declared," even when `const c = 1` exists outside it?
3. In the `outer`/`inner` example, if you moved `inner` *outside* `outer` (defined it at the top level) but still called it from inside `outer`, which `label` would it return? Why?

Sources:
- [Scope - Glossary | MDN](https://developer.mozilla.org/en-US/docs/Glossary/Scope)
- [Block statement - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/block)