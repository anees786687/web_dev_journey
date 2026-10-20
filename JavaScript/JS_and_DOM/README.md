# 5. Objects, the DOM and events

When a browser loads a page, it turns every HTML element into a **JavaScript object**. That
tree of objects is the **DOM** (Document Object Model). To change a page with JavaScript, you
first need to be comfortable with objects. Once you can find and change elements, **events** let
your code react when the user does something, such as clicking a button.

## Files (in order)

| # | File | What you'll learn |
|---|------|-------------------|
| 1 | [objects.js](objects.js) | What the DOM is; creating objects; reading, adding, editing and deleting properties; methods; nested objects; arrays of objects; copying and updating with object spread `{...obj}`; object destructuring; `bind()` for methods used as callbacks |
| 2 | [dom_basics.js](dom_basics.js) | The `window` object (`innerWidth`, `location`, `prompt`, `alert`), the `document` object, changing elements with `textContent` and `style`, `querySelector` vs `querySelectorAll`, NodeLists, `innerHTML` / `innerText`, `setAttribute`, and `classList` (`add`, `remove`, `toggle`) |
| 3 | [click_events.js](click_events.js) | Making a button work with `addEventListener('click', callback)`, and why you pass `callback`, not `callback()` |
| 4 | [dom_intermediate/](dom_intermediate/) | A follow-up with its own page: the DOM vs your HTML, why script **timing** matters, guarding against `null`, `parentElement` and `children` |
| 5 | [changing_text_n_html_content/](changing_text_n_html_content/) | A follow-up with its own page: `textContent` vs `innerHTML` vs `innerText`, and why putting user input into `innerHTML` causes XSS |
| 6 | [modifying_classlist/](modifying_classlist/) | A follow-up with its own page: `classList.add` / `remove` / `contains` / `toggle`, and building a list where only one item can be selected with `toggle(class, force)` |
| 7 | [changing_attributes/](changing_attributes/) | A follow-up with its own page: `getAttribute` / `setAttribute` / `hasAttribute` / `removeAttribute`, why attribute values are strings, boolean attributes like `disabled`, and swapping an image's `src` and `alt` |
| | [index.html](index.html) | Loads all three scripts with `defer`, and has the elements and the `.red` / `.blue_text` classes they use |

## How to run

- **Browser:** open `index.html`. The first heading and paragraph change as soon as the page loads,
  and the **Click me** button at the bottom switches the paragraph between red and blue.
  Press `F12` → *Console* to see everything the scripts print.
- **Node.js:** `node objects.js` works. `dom_basics.js` and `click_events.js` need a browser, because `document` only exists there.

## Key ideas

- An object is a set of `key: value` **properties**. A property whose value is a function is a **method**.
- `obj.key` and `obj['key']` do the same thing. Use brackets when the key is stored in a variable.
- Reading a missing property gives `undefined`. Reading a property **of** `undefined` throws an error (see [6. Nullish coalescing](../nullish_coalescing/) for the fix).
- `const` stops you from replacing the object, but you can still change its properties.
- `const { title, pages } = book;` **destructures** an object by **key name**. Use `{ title: bookTitle }` to pick a different variable name.
- A method passed as a callback loses its `this`. Fix it with `obj.method.bind(obj)` or an arrow wrapper `() => obj.method()`.
- `{ ...obj, key: value }` makes a **new** object. Later properties override earlier ones. The copy is **shallow**: nested objects are still shared.
- `window` is the browser's **global object**. Globals like `alert`, `prompt`, `location` and `document` all live on it, so you can leave out the `window.` prefix.
- `document` (`window.document`) is the loaded page and the entry point to the DOM.
- `querySelector` returns the **first** match or `null`. `querySelectorAll` returns a **NodeList** of every match, which is empty if there are none.
  A NodeList works with `.length` and `for...of`, but it isn't a real array (use `[...list]` to get one).
- Calling `querySelector` on an **element** instead of `document` searches only inside that element.
- Use `textContent` to change text. Use `innerHTML` only for HTML **you** wrote: user input in `innerHTML` is a cross-site scripting (XSS) hole.
- Prefer switching CSS classes with `classList.add` / `remove` / `toggle` over setting `element.style` by hand.
- `element.addEventListener('click', fn)` runs `fn` on every click. Pass the function (`fn`), not its result (`fn()`).
- A script in `<head>` runs before `<body>` exists. Add `defer` (or put the `<script>` at the end of `<body>`) so the elements are there when it runs.
- Changing the DOM changes what's **on screen**, not the `.html` file on disk.

## Try it

1. In `objects.js`, add a `hobbies` array to `person` and print the second hobby.
   Then use object spread to make `olderPerson`, a copy of `person` with `age` increased by 1.
   Finally, destructure `name` and `age` out of `olderPerson` in one line.
2. In `dom_basics.js`, make the heading's text colour blue and its font size `40px`.
   (Hint: `style.color`, `style.fontSize`.)
3. Uncomment the `prompt`/`alert` lines in `dom_basics.js` and press *Cancel*. What gets displayed? Use `??` to show `'Guest'` instead.
4. Use `querySelectorAll('li')` and a `for...of` loop to add the `blue_text` class to every list item.
5. In `click_events.js`, delete the `isRed` variable and check `para.classList.contains('red')` instead. Can you shorten the callback with `classList.toggle`?
6. Add a second button that counts how many times it's been clicked and shows the count in a `<p>`.
7. Remove `defer` from the `dom_basics.js` script tag, refresh, and read the error in the console.

---

[← 4. Functions](../functions/) · **Next:** [5b. DOM in more depth →](dom_intermediate/) · [6. Nullish coalescing →](../nullish_coalescing/)
