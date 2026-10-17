# 5. Objects and the DOM

When a browser loads a page, it turns every HTML element into a **JavaScript object**. That
tree of objects is the **DOM** (Document Object Model). To change a page with JavaScript, you
first need to be comfortable with objects.

## Files (in order)

| # | File | What you'll learn |
|---|------|-------------------|
| 1 | [dom_n_objs.js](dom_n_objs.js) | What the DOM is; creating objects; reading, adding, editing and deleting properties; methods; nested objects; arrays of objects |
| 2 | [dom_basics.js](dom_basics.js) | A first DOM example: `document.querySelector`, changing `textContent` and `style` |
| | [index.html](index.html) | Loads both scripts with `defer` and has the elements that `dom_basics.js` changes |

## How to run

- **Browser:** open `index.html`. The heading and paragraph change as soon as the page loads.
  Press `F12` → *Console* to see the object examples.
- **Node.js:** `node dom_n_objs.js` works. `dom_basics.js` needs a browser, because `document` only exists there.

## Key ideas

- An object is a set of `key: value` **properties**. A property whose value is a function is a **method**.
- `obj.key` and `obj['key']` do the same thing. Use brackets when the key is stored in a variable.
- Reading a missing property gives `undefined`. Reading a property **of** `undefined` throws an error (see [6. Nullish coalescing](../nullish_coalescing/) for the fix).
- `const` stops you from replacing the object, but you can still change its properties.
- A script in `<head>` runs before `<body>` exists. Add `defer` (or put the `<script>` at the end of `<body>`) so the elements are there when it runs.
- Changing the DOM changes what's **on screen**, not the `.html` file on disk.

## Try it

1. In `dom_n_objs.js`, add a `hobbies` array to `person` and print the second hobby.
2. In `dom_basics.js`, make the heading's text colour blue and its font size `40px`.
   (Hint: `style.color`, `style.fontSize`.)
3. Remove `defer` from the `dom_basics.js` script tag, refresh, and read the error in the console.

---

[← 4. Functions](../functions/) · **Next:** [6. Nullish coalescing →](../nullish_coalescing/)
