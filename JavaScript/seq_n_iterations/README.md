# 3. Arrays and loops

An **array** is an ordered list of values. A **loop** runs the same code once for each item
(or until a condition stops it). You'll use the two together constantly.

## Files

| File | What it is |
|------|------------|
| [seq_n_iteration.js](seq_n_iteration.js) | Array indexing and `.length`, `while`, `break` / `continue`, a backwards `for` loop, and `for...of` |
| [index.html](index.html) | Loads the script so you can run it in the browser |

## How to run

- **Browser:** open `index.html`, then press `F12` and go to the *Console* tab.
- **Node.js:** `node seq_n_iteration.js`

## Key ideas

- Indexes start at **0**, so the last item is at `arr.length - 1`. Reading past the end gives `undefined`, not an error.
- Every loop needs the same three parts: **start** a counter, **check** a condition, **update** the counter.
- `continue` skips to the next iteration. `break` exits the loop.
- Use `for...of` when you just need each item, and a classic `for` loop when you need the index or a custom order.

| Loop | Best for |
|------|----------|
| `while (cond) { }` | When you don't know in advance how many times to repeat |
| `for (let i = 0; i < n; i++) { }` | Counting, or when you need the index |
| `for (const item of arr) { }` | Visiting every item in an array |

## ⚠️ Common mistakes (in the file, commented out)

Each section of `seq_n_iteration.js` ends with a buggy version of the same loop. **Don't
uncomment the first two.** They are infinite loops and will freeze the tab.

1. Using `continue` before updating the counter, so the counter never changes.
2. Using `k++` instead of `k--` when counting down, so the condition is always true.
3. Writing `for (student of students)` without `const`, which creates an accidental global variable.

## Try it

1. Use a `for` loop to print only the students whose score is `100`.
2. Use a `while` loop to add up all the scores, then print the average.

---

[← 2. Conditionals](../if_else/) · **Next:** [4. Functions →](../functions/)
