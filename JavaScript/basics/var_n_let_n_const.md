# `var` vs `let` vs `const` in JavaScript

## Quick comparison

| Feature | `var` | `let` | `const` |
|---|---|---|---|
| Scope | Function (or global) | Block `{ }` | Block `{ }` |
| Hoisted? | Yes, initialized to `undefined` | Yes, but uninitialized (TDZ) | Yes, but uninitialized (TDZ) |
| Access before declaration | Returns `undefined` | `ReferenceError` | `ReferenceError` |
| Redeclare in same scope | Allowed | `SyntaxError` | `SyntaxError` |
| Reassign | Allowed | Allowed | `TypeError` |
| Must initialize at declaration | No | No | **Yes** |
| Top-level creates `window`/`globalThis` property | Yes (in scripts) | No | No |
| Introduced | ES1 (1997) | ES6 (2015) | ES6 (2015) |

## 1. Scope

`var` only respects **function** boundaries. `let` and `const` respect **any block**: `if`, `for`, `while`, `switch`, or a bare `{ }`.

```js
function demo() {
  if (true) {
    var a = 1;
    let b = 2;
    const c = 3;
  }
  console.log(a); // 1, because var leaks out of the if-block
  console.log(b); // ReferenceError
}
```

This is the root cause of most `var` bugs. A variable you meant to keep inside a block is visible across the whole function.

## 2. Hoisting and the Temporal Dead Zone (TDZ)

All three declarations are hoisted, meaning the engine registers them when it enters the scope. They differ in what happens next:

- `var` is initialized to `undefined` immediately, so early access quietly gives you `undefined`.
- `let` and `const` stay **uninitialized** until execution reaches the declaration line. The stretch between the start of the scope and that line is the **Temporal Dead Zone**. Touching the variable there throws.

```js
console.log(x); // undefined (silent bug)
var x = 5;

console.log(y); // ReferenceError: Cannot access 'y' before initialization
let y = 5;
```

The TDZ even affects `typeof`, which is normally "safe":

```js
typeof z; // ReferenceError if z is a let/const declared later in this scope
let z;
```

The TDZ is a feature. It turns a silent `undefined` into a loud, early error.

## 3. Redeclaration

```js
var name = "A";
var name = "B";   // fine, silently overwrites

let age = 1;
let age = 2;      // SyntaxError: Identifier 'age' has already been declared
```

With `var`, a large file or a merged script can clobber a variable without warning.

## 4. Reassignment and the `const` misconception

`const` stops you from **rebinding the name**. It does **not** make the value immutable.

```js
const PI = 3.14;
PI = 3;               // TypeError

const user = { name: "Anees" };
user.name = "Sam";    // allowed, because the object itself is mutable
user = {};            // TypeError, because the binding is being reassigned

const arr = [1, 2];
arr.push(3);          // allowed
```

For real immutability, use `Object.freeze()`. Note that it is **shallow**:

```js
const cfg = Object.freeze({ db: { host: "x" } });
cfg.db = null;        // ignored (throws in strict mode)
cfg.db.host = "y";    // works, because nested objects aren't frozen
```

`const` also requires an initializer: `const x;` is a `SyntaxError`.

## 5. Global object pollution

In a classic `<script>` (not a module), a top-level `var` becomes a property of `window`:

```js
var foo = 1;
let bar = 2;
window.foo; // 1
window.bar; // undefined
```

This can collide with built-ins or other scripts. ES modules never create these properties, whichever keyword you use.

## 6. The classic loop-closure bug

This one comes up in interviews constantly:

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// 3, 3, 3

for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// 0, 1, 2
```

With `var`, there is **one** `i` shared by every callback, and by the time they run it equals 3. With `let`, the spec creates a **fresh binding for each iteration**, so each closure captures its own `i`.

Before ES6, people fixed this with an IIFE: `(function(j){ setTimeout(() => console.log(j)) })(i)`.

For loops and `const`:

```js
for (const item of items) { }    // fine, new binding each iteration
for (const k in obj) { }         // fine
for (const i = 0; i < 3; i++) {} // TypeError on i++ (reassignment)
```

## 7. A `switch` gotcha

All `case` clauses share one block, so this fails:

```js
switch (x) {
  case 1: let msg = "one"; break;
  case 2: let msg = "two"; break; // SyntaxError: already declared
}
```

The fix is to wrap each case in braces: `case 1: { let msg = "one"; break; }`

## 8. Undeclared assignment

Separate from all three keywords: assigning to a name you never declared (`count = 5;`) creates an accidental global in sloppy mode and throws in strict mode. Always declare your variables, and prefer modules or `"use strict"`.

## Use cases

**`const` is your default.** Use it for:
- Imports, function expressions and arrow functions: `const add = (a, b) => a + b;`
- Objects and arrays you'll mutate but never replace
- Config values, DOM references, and the results of computations
- `for...of` and `for...in` loop variables

**`let` is for when the binding must change.** Use it for:
- Counters and accumulators: `let total = 0;`
- Classic `for (let i = 0; ...)` loops
- Values assigned conditionally or later: `let result; if (...) result = a; else result = b;`
  - Often a ternary lets you use `const` instead: `const result = cond ? a : b;`
- State that's reassigned in a loop, such as a retry count or a pointer in a linked list

**`var` is legacy only.** You'll run into it in:
- Pre-2015 codebases and old tutorials
- Rare deliberate tricks that rely on function-scope hoisting (almost always better written another way)

## Best practices

1. **`const` by default, `let` when you must reassign, never `var`.** This makes code self-documenting: seeing `let` tells the reader "this changes later, watch it."
2. **Enforce it with ESLint**, using `no-var` and `prefer-const`. Most style guides (Airbnb, Google, StandardJS) do this.
3. **Declare variables close to first use**, in the narrowest scope that works. Block scoping makes this natural.
4. **Don't mistake `const` for immutability.** If you need immutable data, reach for `Object.freeze`, immutable update patterns (spread, `map`/`filter`), or libraries like Immer.
5. **Naming convention:** use `UPPER_SNAKE_CASE` only for true, hard-coded constants (`const MAX_RETRIES = 3;`), and regular `camelCase` for everything else declared with `const`.
6. **When refactoring legacy `var` code**, don't blindly find-and-replace. Check for code that relies on function-scope leakage, hoisting-before-use, or redeclaration, because those spots will break with `let`/`const`.
7. **Performance isn't a factor.** Modern engines handle all three efficiently, so choose based on correctness and readability.

