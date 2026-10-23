# 5f. Working with form inputs

Forms are how users send information to a page. This folder builds a small "Personal
Information" form. When it's submitted, JavaScript reads every field and logs them as one object.
Along the way it covers how the browser validates and submits forms, and the mistakes that make
form code silently fail.

## Files

| File | What it is |
|------|------------|
| [index.html](index.html) | The form: text, phone and email inputs, a `<select>` with option groups, and a radio group, laid out with CSS Grid. It uses `required`, `minlength` and `pattern` for validation |
| [script.js](script.js) | Finds the fields, handles the form's `submit` event, reads each value into an object, and shows two ways to clear the form |

## How to run

Open `index.html` in a browser, open DevTools (`F12`) → *Console*, fill in the form and click
**Submit**. The details are logged as an object.

Click **Submit** with some fields empty first: the browser shows its own error message, and
nothing is logged, because the `submit` event never fires.

## Reading and changing inputs

| Property / method | What it does |
|---|---|
| `el.value` | The current value of the input (text typed, selected `<option>`'s value, a radio's `value`). |
| `el.checked` | Whether a checkbox or radio button is on. |
| `el.focus()` | Gives the element keyboard focus. |
| `el.select()` | Selects all the text in the input. |
| `el.disabled` | Whether the input is disabled. |
| `form.reset()` | Puts every field back to its initial HTML state. |

## 1. Load the script after the page: `defer`

A `<script>` in `<head>` runs **as soon as the browser reaches it**, before the `<body>` exists. Every `querySelector` then returns `null`.

```html
<script src="script.js" defer></script>   <!-- runs after the page is parsed -->
```

Alternative: put the `<script>` just before `</body>`.

## 2. `#` goes in selectors, not in ids

```html
<form id="personal_info">        <!-- correct -->
<form id="#personal_info">       <!-- wrong: the id literally contains '#' -->
```

```js
document.getElementById('personal_info');   // no '#'
document.querySelector('#personal_info');   // '#' because it's a CSS selector
```

## 3. Autocomplete for `.value`: JSDoc types

`querySelector('#name')` can't know what kind of element `#name` is, so VS Code treats it as a generic `Element`, which has no `value`. The code still works. Only autocomplete is missing.

```js
/** @type {HTMLInputElement} */
const nameInput = document.querySelector('#name');
```

This is optional and only an editor hint. Selecting by tag name alone (`querySelector('input')`) is the one case VS Code infers by itself.

## 4. Read values when the event happens

```js
const name = nameInput.value;            // runs at page load → always ''
button.addEventListener('click', () => {
    const name = nameInput.value;        // runs at click time → what the user typed
});
```

The same goes for `console.log`. Outside the handler, it runs once at page load, before anyone clicks.

## 5. Radio buttons

- `querySelector('input[name="gender"]')` returns only the **first** radio.
- Find the selected one with `:checked`. It returns `null` if none is selected:
  ```js
  const checked = document.querySelector('input[name="gender"]:checked');
  const gender = checked ? checked.value : '';
  ```
- **Select** a radio with `.checked = true`. The others in the same `name` group turn off automatically.
- Setting `.value` does **not** select a radio. It only changes the text that radio sends.
- Add `checked` in the HTML to make an option the default (and what `form.reset()` returns to).

## 6. How form submission works

```
click Submit ──▶ browser validates fields ──▶ all valid? ──▶ form fires 'submit' ──▶ page reloads
                 (required, type, pattern)        │ no
                                                  ▼
                                         browser shows error popup
```

So:

- Listen for `submit` on the **form**, not `click` on the button. A button never fires `submit`.
- Call `event.preventDefault()` in the `submit` handler to stop the reload.
- Don't call `preventDefault()` in the button's `click`. That cancels the submission **and** the validation.
- The button must be `type="submit"` (the default inside a form). `type="button"` never submits, so it never validates.
- `type="reset"` clears the form with no JavaScript.

```js
form.addEventListener('submit', (event) => {
    event.preventDefault();
    // read the fields here
});
```

If logs vanish after a split second, the page reloaded. Tick **Preserve log** in the DevTools Console settings to keep them.

## 7. Field names can hide form methods

Every field with an `id` or `name` becomes a property of its form: `form.email` is the email input. A field with `id="reset"` makes `form.reset` that button, and calling it gives:

```
TypeError: form.reset is not a function
```

Don't use `submit`, `reset`, `action` or `method` as field ids or names. This form uses `submit_btn` / `reset_btn`.

## 8. Built-in validation and `pattern`

- `type="email"` checks the format only loosely (`a@b` passes) and allows an empty field. Add `required` if the field must be filled in.
- `pattern` must match the **whole** value, so `^` and `$` aren't needed.
- Browsers compile `pattern` with the strict `v` regex flag. A bare `-` inside `[...]` is then a syntax error, and the browser **silently ignores** the whole pattern (it only prints a console warning). Escape it as `\-`:
  ```html
  <input type="email" required
         pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}">
  ```
- No regex catches every bad email (`a..b@x..com` passes this one). Browser checks are easy to skip, so a real app validates again on the server.

## ⚠️ Common mistakes

- Reading `.value` at page load instead of inside the event handler. You get empty strings.
- `button.addEventListener('submit', ...)`: buttons never fire `submit`. Listen on the form.
- Forgetting `event.preventDefault()`, so the page reloads and the console is cleared.
- `querySelector('input[name="gender"]')` without `:checked`. It always gives the first radio.
- Giving a field the id or name `reset` or `submit`, which breaks `form.reset()` / `form.submit()`.
- Calling `form.submit()` from JS. It skips validation and doesn't fire the `submit` event.
- An unescaped `-` inside `[...]` in `pattern`. The browser quietly ignores the whole pattern.

## Try it

1. Uncomment `form.reset()` in `script.js` so the form clears after each submit.
2. Add a "Subscribe to newsletter" checkbox and store its `.checked` value in the object.
3. Show the details **on the page** in a `<p>` (use `textContent`) instead of logging them.
4. In the Console, set `document.querySelector('#contact').disabled = true`. What changes?

### Resources

- [MDN: Web forms](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms)
- [MDN: HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement) (`value`, `checked`, `select()`)
- [MDN: HTMLFormElement: submit event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event)
- [MDN: Event.preventDefault()](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)
- [MDN: Client-side form validation](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation)
- [MDN: The pattern attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/pattern)

---

[← 5e. Reading and changing attributes](../changing_attributes/) · [Back to 5. Objects, the DOM and events](../) · **Next:** [6. Nullish coalescing →](../../nullish_coalescing/)
