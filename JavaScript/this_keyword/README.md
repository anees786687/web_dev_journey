# 8. The `this` keyword

`this` refers to "the object the code is running for". It's how a method reads the other
properties of its own object (`this.name`). The confusing part is that **regular functions and
arrow functions decide what `this` is in different ways**.

## Files

| File | What it is |
|------|------------|
| [script.js](script.js) | A regular method vs an arrow function on an object, why the arrow version loses `this`, and where arrows are the right choice (callbacks inside a method) |
| [index.html](index.html) | Loads the script so you can run it in the browser |

## How to run

- **Browser:** open `index.html`, then press `F12` and go to the *Console* tab.
- **Node.js:** `node script.js`

## Key ideas

| | Regular function / method | Arrow function |
|---|---|---|
| What is `this`? | Decided by **how it is called**: in `obj.method()`, `this` is `obj` | Taken from the code **around** it (where it was written) |
| As an object method | ✅ Use this | ⚠️ `this` is not the object |
| As a callback inside a method | ⚠️ `this` is lost | ✅ Keeps the method's `this` |

- An object literal `{ ... }` does **not** create its own `this`. An arrow function written directly inside one uses the `this` from outside the object.
- What `this` is at the top level of a file depends on how the file runs: `window` in a classic browser `<script>`, `{}` in a Node.js file, and `undefined` in an ES module.
- If you need to pass a regular method somewhere else, lock its `this` with `.bind(obj)` (see section 9 of [objects.js](../JS_and_DOM/objects.js)).

## Try it

1. Change `someFunc` in `script.js` into a regular method so it prints `Anees 34`.
2. Fix `listPlayersBroken` with `.bind(this)` instead of an arrow function.
3. Add `type="module"` to the `<script>` tag in `index.html` and reload. What changes, and why?

---

[← 7. The call stack](../call_stacks/) · **Next:** [Projects →](../projects/)
