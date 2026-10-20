# 5e. Reading and changing attributes

Attributes are the settings written inside an HTML tag: `src`, `alt`, `width`, `id`, `href`,
`disabled` and so on. Changing them from JavaScript lets you swap images, resize things, and
switch buttons on and off. This folder builds a small image viewer to show all four attribute
methods.

## Files

| File | What it is |
|------|------------|
| [index.html](index.html) | An `<img>` plus three buttons: **Enlarge**, **Reset size** and **Swap animal** |
| [script.js](script.js) | Reading attributes, why values are always strings, resizing with `width`, disabling a button, and swapping `src` and `alt` |
| `cat.jpg`, `puppy.jpg` | The two images the page switches between |

## How to run

Open `index.html` in a browser and press `F12`. Click the buttons, and keep the *Elements* tab
open to watch the attributes on `<img>` and `<button>` change as you click.

- **Enlarge** adds 100px to the image's `width`. At 500px the button disables itself.
- **Reset size** sets the width back to 200px and enables **Enlarge** again.
- **Swap animal** changes the image's `src` and `alt` between the cat and the puppy.

## Key ideas

| Method | What it does |
|--------|--------------|
| `el.getAttribute('name')` | Returns the value as a **string**, or `null` if the attribute isn't there |
| `el.setAttribute('name', value)` | Adds the attribute, or changes it if it already exists |
| `el.hasAttribute('name')` | `true` or `false` |
| `el.removeAttribute('name')` | Deletes the attribute completely |

- **Attribute values are always strings.** `getAttribute('width') + 10` gives `"20010"`.
  Convert first with `parseInt(value, 10)` or `Number(value)`.
- **Boolean attributes** (`disabled`, `checked`, `hidden`, `required`) work by **being present**. Their value is ignored,
  so `setAttribute('disabled', 'false')` still disables the element. Use `removeAttribute('disabled')` to turn it off.
- When you change an image's `src`, **update its `alt` too**. Screen readers read `alt` aloud, and it's
  shown if the image can't load.
- `getAttribute('src')` gives back exactly what's written in the HTML (`cat.jpg`). The **property** `img.src`
  gives the full resolved URL (`file:///…/cat.jpg`).

## ⚠️ Common mistakes

- Doing maths on `getAttribute(...)` without converting to a number first.
- Writing `setAttribute('disabled', false)` and expecting the button to be enabled.
- Changing an image's `src` but leaving the old `alt` text.
- Changing an element's `id` to track state. Code that finds the element by that id will break; keep the
  `id` fixed and check another attribute (such as `src`) instead.

## Try it

1. In the Console, compare `document.querySelector('#pet').getAttribute('src')` with `document.querySelector('#pet').src`.
2. Add a **Shrink** button that takes 100px off the width and disables itself at 100px.
3. Use `setAttribute('title', '...')` to add a tooltip to the image, then hover over it.

### Resources

- [MDN: Element.setAttribute()](https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute)
- [MDN: Element.getAttribute()](https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute)
- [MDN: Element.hasAttribute()](https://developer.mozilla.org/en-US/docs/Web/API/Element/hasAttribute)
- [MDN: Element.removeAttribute()](https://developer.mozilla.org/en-US/docs/Web/API/Element/removeAttribute)
- [MDN: Boolean attributes](https://developer.mozilla.org/en-US/docs/Glossary/Boolean/HTML)

---

[← 5d. Changing classes with classList](../modifying_classlist/) · [Back to 5. Objects, the DOM and events](../) · **Next:** [6. Nullish coalescing →](../../nullish_coalescing/)
