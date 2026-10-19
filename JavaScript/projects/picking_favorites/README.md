# Picking favourites

A list of programming languages with checkboxes. Tick some, click **Add to favorites**, and the
names of the ticked languages are printed to the console.

## Files

| File | What it does |
|------|--------------|
| [index.html](index.html) | The list of languages. Each checkbox is wrapped in its `<label>`, so clicking the name ticks the box |
| [script.js](script.js) | On click, finds the ticked boxes and logs each language's name |

## How to run

Open `index.html`, press `F12` → *Console*, tick a few languages and click the button.

## How it works

1. `document.querySelectorAll('input:checked')` uses the CSS `:checked` pseudo-class to find only the ticked boxes.
2. The search runs **inside** the click handler, so it reflects what's ticked at the moment of the click.
3. Each `<input>` sits inside a `<label>`, so `input.parentNode.textContent` gives the language name.

## Try it

1. Show the favourites **on the page** instead of in the console: add a `<p>` and set its `textContent`.
2. Build an array of names with `[...checkedInputs].map(input => input.parentNode.textContent)` and join them with `', '`.
3. Show "No languages selected" when nothing is ticked (`checkedInputs.length === 0`).

---

[← Back to projects](../)
