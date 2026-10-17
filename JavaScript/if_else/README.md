# 2. Conditionals: `if`, `else` and truthy/falsy

Programs make decisions with `if` / `else if` / `else`. To use them well you also need to know
what JavaScript treats as "true" when the condition isn't an actual boolean.

## Files

| File | What it is |
|------|------------|
| [if_else.js](if_else.js) | Three runnable examples: a grade calculator, `&&` / `\|\|` with random numbers, and a "what can I cook?" chain |
| [index.html](index.html) | Loads `if_else.js` so you can run it in the browser |
| [truthy_falsy.md](truthy_falsy.md) | The 8 falsy values, surprising truthy values, `&&`/`\|\|` short-circuiting, and common bugs |

## How to run

- **Browser:** open `index.html`, then press `F12` and go to the *Console* tab. Refresh to get new random numbers.
- **Node.js:** `node if_else.js`

## Key ideas

- Conditions are checked **top to bottom**, and only the **first** match runs. Put the most specific condition first.
- If the earlier branches already rule something out, a plain `else` is enough. You don't need to repeat the opposite condition.
- There are only 8 falsy values: `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, `NaN`. **Everything else is truthy**, including `"0"`, `"false"`, `[]` and `{}`.
- `a || b` and `a && b` return one of the original values, not necessarily `true` or `false`.
- Avoid `== true` and `== false`. Use `===` or just `if (x)`.

## Try it

1. In `if_else.js`, change `marks` to `95`, `61` and `30`. Which grade does each give?
2. Swap the order of the `marks > 90` and `marks > 60` checks. What breaks, and why?
3. Answer the *Check your understanding* questions at the end of [truthy_falsy.md](truthy_falsy.md).

---

[← 1. Basics](../basics/) · **Next:** [3. Arrays and loops →](../seq_n_iterations/)
