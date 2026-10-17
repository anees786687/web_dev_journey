# Hoisting in JavaScript

## The short version

**Hoisting** is JavaScript's behavior of registering declarations at the **start of their scope**, before any code in that scope runs. That's why some variables and functions can be referenced *before* the line where you wrote them.

A common description is "declarations get moved to the top." Nothing is physically moved, but the code behaves *as if* they were.

## Why it happens: two phases

When JavaScript runs a scope (the global script, a function, or a block), it works in two passes:

1. **Creation phase.** The engine scans the scope for declarations (`var`, `let`, `const`, `function`, `class`) and sets up memory for each name.
2. **Execution phase.** The code runs line by line.

Since every name is registered in phase 1, the engine already "knows" about all of them when phase 2 starts. What differs between declaration types is **what value each name holds before its line executes**.

## What gets hoisted, and how

| Declaration | Hoisted? | Value before its line | Use before declaration gives |
|---|---|---|---|
| `var x` | Yes | `undefined` | `undefined` |
| `let x` / `const x` | Yes | Uninitialized (TDZ) | `ReferenceError` |
| `function f() {}` | Yes, **name and body** | The full function | Works normally |
| `class C {}` | Yes | Uninitialized (TDZ) | `ReferenceError` |
| `var f = function() {}` | Only the variable `f` | `undefined` | `TypeError: f is not a function` |
| `const f = () => {}` | Only the variable `f` | Uninitialized (TDZ) | `ReferenceError` |
| `import` | Yes | Ready before module code runs | Works |

## Each case in action

### `var`: hoisted and set to `undefined`

```js
console.log(a); // undefined
var a = 5;
console.log(a); // 5
```

The engine behaves as if you wrote this:

```js
var a;           // declaration hoisted, set to undefined
console.log(a);
a = 5;           // assignment stays where it was
console.log(a);
```

The key point is that **only the declaration is hoisted, not the assignment.**

### `let` / `const`: hoisted but locked (the TDZ)

```js
console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b = 5;
```

`b` *is* hoisted, since the engine knows it exists. But it stays in the **Temporal Dead Zone** until its line runs. Compare that with a name that was never declared at all:

```js
console.log(zzz); // ReferenceError: zzz is not defined
```

The two error messages differ: "before initialization" means the variable exists but is locked, while "not defined" means it doesn't exist anywhere.

This explains a classic surprise, where a block throws an error even though an outer `x` exists:

```js
let x = 1;
{
  console.log(x); // ReferenceError
  let x = 2;
}
```

The inner `let x` is hoisted to the top of the block, shadows the outer `x`, and is still in the TDZ when `console.log` runs.

### Function declarations: fully hoisted

```js
greet(); // "Hello!" (works before the definition)

function greet() {
  console.log("Hello!");
}
```

Both the name *and* the body are hoisted, which is why you can organize code with helper functions at the bottom of a file.

### Function expressions and arrow functions: hoisted like variables

These are variables that happen to hold functions, so they follow the variable rules:

```js
sayHi(); // TypeError: sayHi is not a function
var sayHi = function () { console.log("Hi"); };
```

`sayHi` is hoisted as `undefined`, and calling `undefined()` fails.

```js
sayBye(); // ReferenceError: Cannot access 'sayBye' before initialization
const sayBye = () => console.log("Bye");
```

### Classes: hoisted with a TDZ

```js
const p = new Person(); // ReferenceError
class Person {}
```

Unlike function declarations, classes must be defined before you use them.

## Hoisting is per scope

Hoisting happens at the top of **each** scope, not just the top of the file. This creates a classic `var` trap:

```js
var msg = "global";

function show() {
  console.log(msg); // undefined, not "global"!
  var msg = "local";
}
show();
```

The local `var msg` is hoisted to the top of `show()`, shadowing the global one, and it's `undefined` until its assignment runs. This is the same mechanism as the block example, except that `var` gives you a silent `undefined` where `let` gives you a loud error.

## Best practices

1. **Declare variables at the top of their scope**, or right before first use, so the code reads the way it actually behaves.
2. **Use `let`/`const` instead of `var`.** The TDZ turns hoisting surprises into clear errors.
3. **Don't rely on `var` hoisting.** Using a `var` before its declaration is almost always a bug.
4. **Calling function declarations before their definition is fine** and is a common style (main logic at the top, helpers below).
5. **Define function expressions, arrow functions, and classes before using them.**

