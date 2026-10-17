# 1. Basics: variables, scope and hoisting

Before writing any logic, you need to know how JavaScript **stores names**: which keyword to
use, where a variable can be seen, and what happens if you use it too early.

This folder is all reading. Each note has code you can paste into the browser console
(`F12` → *Console*) to try.

## Read in this order

| # | File | What you'll learn |
|---|------|-------------------|
| 1 | [var_n_let.md](var_n_let.md) | `var` vs `let` vs `const`: scope, redeclaring, reassigning, the "`const` isn't immutable" trap, and the classic loop bug |
| 2 | [scope.md](scope.md) | Global, module, function and block scope; the scope chain; shadowing; a first look at closures |
| 3 | [hoisting.md](hoisting.md) | Why some names work before their line runs, and the Temporal Dead Zone (TDZ) |

## Key ideas

- **Use `const` by default, `let` when the value must change, and never `var`.**
- `let` and `const` live inside the nearest `{ }` block. `var` ignores blocks and only respects functions.
- Inner scopes can see outer variables, but outer scopes can't see inner ones.
- Using a `let`/`const` before its line throws a `ReferenceError` (the TDZ). Using a `var` early quietly gives you `undefined`.
- Function declarations are fully hoisted, so you can call them above where they're written.

## Try it

Paste this into the console and predict the output before pressing Enter:

```js
var a = 1;
let b = 1;
if (true) {
  var a = 2;
  let b = 2;
}
console.log(a, b);
```

<details>
<summary>Answer</summary>

`2 1`. The `var a` inside the block is the **same** variable as the outer one. The `let b`
inside the block is a **new** variable that only exists in that block.
</details>

---

**Next:** [2. Conditionals →](../if_else/)
