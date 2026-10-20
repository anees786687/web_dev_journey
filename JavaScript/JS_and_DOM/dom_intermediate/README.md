# 5b. The DOM in more depth

A follow-up to the main [JS_and_DOM](../) folder. It shows how the DOM differs from the HTML you
wrote, why **when** a script runs matters, and how to move around the tree from one element to
its parent and children.

## Files

| File | What it is |
|------|------------|
| [index.html](index.html) | Two inline scripts that show the **timing** problem (one finds nothing, one works), plus deliberately broken HTML that the browser repairs |
| [dom_intermediate.js](dom_intermediate.js) | The browser fixing broken HTML, guarding against `null`, looping over `querySelectorAll`, `parentElement` / `parentNode` / `children`, and searching inside one element |

## How to run

Open `index.html` in a browser and press `F12` → *Console*. The first line printed is `null`,
from the script in `<head>` that ran before the `<p>` existed.

Also open the *Elements* tab and compare the first `<p>` with the broken line in `index.html`.

## Key ideas

- The **DOM** is what the browser built from your HTML, not the HTML file itself. Broken HTML gets repaired, and tools like Live Server can add elements you never wrote.
- The browser reads HTML **top to bottom** and runs a normal `<script>` as soon as it reaches it. A script in `<head>` can't find elements in `<body>`.
  Fix it with `<script src="..." defer>`, or by putting the `<script>` at the end of `<body>`.
- `querySelector` can return `null`, so guard it with `if (el) { ... }` or `el?.prop`.
- `el.parentElement` (or `parentNode`) goes **up** one level. `el.children` lists the child **elements** going down (an `HTMLCollection`).
- `el.querySelectorAll(...)` only searches **inside** `el`.

## Try it

1. Move the first inline `<script>` from `<head>` to just before `</body>`. What does it print now?
2. Use `stepPara.parentElement.parentElement` and work out which element you get before running it.
3. Loop over `document.querySelector('.recipe').children` and print each child's `tagName`.

### Resources

- [MDN: Introduction to the DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
- [MDN: document.querySelector()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) and [querySelectorAll()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll)
- [MDN: NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList)
- [MDN: CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors)
- [MDN: Document](https://developer.mozilla.org/en-US/docs/Web/API/Document) and [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element)
- [MDN: Element.querySelector()](https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector)
- [MDN: Element.children](https://developer.mozilla.org/en-US/docs/Web/API/Element/children) and [Node.parentNode](https://developer.mozilla.org/en-US/docs/Web/API/Node/parentNode)
- [MDN: Debugging HTML with the browser tools](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Debugging_HTML)

---

[← Back to 5. Objects, the DOM and events](../) · **Next:** [5c. Changing text and HTML →](../changing_text_n_html_content/)
