# 6. Nullish coalescing (`??`) and optional chaining (`?.`)

Real data is often incomplete: an API may leave out a field or send `null`. These operators
let you read deeply nested values safely and fall back to a sensible default.

| Operator | Meaning |
|----------|---------|
| `a ?? b` | Use `b` only if `a` is `null` or `undefined` |
| `obj?.prop` | Read `prop`, but return `undefined` instead of crashing if `obj` is `null`/`undefined` |
| `fn?.()` | Call `fn` only if it exists |
| `a ??= b` | Assign `b` to `a` only if `a` is `null` or `undefined` |

## Files

| File | What it is |
|------|------------|
| [nullish_coalescing.js](nullish_coalescing.js) | Runnable examples: chaining `??`, `?.` with a fallback, `?.()` on methods, `??=`, and default parameters vs `??` |
| [index.html](index.html) | Loads the script so you can run it in the browser |
| [nullish_coalescing.md](nullish_coalescing.md) | Full notes: `??` vs `\|\|`, a step-by-step explanation of `?.`, the precedence gotcha, use cases |

## How to run

- **Browser:** open `index.html`, then press `F12` and go to the *Console* tab.
- **Node.js:** `node nullish_coalescing.js`

## Key ideas

- `||` replaces **any falsy** value (`0`, `""`, `false`...). `??` only replaces **missing** values (`null`, `undefined`).
  Use `??` when `0` or `""` are valid answers.
- `?.` must go on **every** step that might be missing: `user?.address?.city`, not `user?.address.city`.
- A default parameter (`name = 'Guest'`) only kicks in for `undefined`, not for `null`.
- You can't mix `??` with `||` or `&&` without parentheses. That's a `SyntaxError`.

## Try it

1. In the `.js` file, give `user` an `address` with a `city` and check that the fallback is no longer used.
2. Predict the result of `0 || 5` and `0 ?? 5`, then check them in the console.
3. Answer the *Check your understanding* questions at the end of the `.md` file.

---

[← 5. Objects, the DOM and events](../JS_and_DOM/) · **Next:** [7. The call stack →](../call_stacks/)
