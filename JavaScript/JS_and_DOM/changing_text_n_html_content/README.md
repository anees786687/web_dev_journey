# 5c. Changing text and HTML content

Once you've found an element, you usually want to change what's inside it. JavaScript gives you
three properties for that, and they behave differently. Picking the wrong one can show the wrong
text, or even open a security hole.

## Files

| File | What it is |
|------|------------|
| [index.html](index.html) | One small section per example: a toggle button, a paragraph with bold text, an empty box for the XSS demo, and a paragraph with a hidden `<span>` |
| [script.js](script.js) | Reading and writing `textContent`; `innerHTML` vs `textContent`; why `textContent` protects you from XSS; `innerText` vs `textContent` |

## How to run

Open `index.html` in a browser, press `F12` → *Console*, and click the button. It switches the
paragraph text (and its own label) back and forth.

## Key ideas

| Property | Reading gives you | Writing a string |
|----------|-------------------|------------------|
| `textContent` | All the text, tags stripped, including text hidden with CSS | Inserts it as **plain text**: `<b>` shows up literally |
| `innerHTML` | The markup, **tags included** | **Parses** it as HTML and builds real elements |
| `innerText` | Only the text you can **see**, as it's laid out on screen | Inserts it as plain text (like `textContent`) |

- **Default to `textContent`.** It's fast, predictable and safe.
- **Use `innerHTML` only with HTML you wrote yourself**, when you actually want to add elements.
- **Never put user input into `innerHTML`.** The string becomes live HTML, so an attacker can
  inject code that runs on your page (for example, to steal login cookies). This attack is called
  **cross-site scripting (XSS)**. `textContent` shows the same string as harmless text.
- Use `innerText` only when you specifically want the **visible** text. It skips hidden elements,
  and it's slower because the browser has to work out the layout first.

## ⚠️ Common mistakes

- `el.innerHTML = userInput`: an XSS hole. Use `el.textContent = userInput`.
- Setting `textContent` and expecting tags like `<strong>` to be rendered. They appear as text.
- Reading `innerText` and being surprised that hidden text is missing, or that it differs from `textContent`.

## Try it

1. Change the button so it also turns the paragraph text **bold** when clicked. Which property do you need?
2. Add an `<input>` and a button that copies whatever the user types into a `<p>`. Use `textContent`,
   then type `<b>hi</b>` and check that it shows up as text.
3. Remove `style="display: none"` from the `<span>` in `index.html`. How do `innerText` and `textContent` compare now?

### Resources

- [MDN: Node.textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent) (includes a section comparing it with `innerText` and `innerHTML`)
- [MDN: Element.innerHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML) (see its security considerations)
- [MDN: HTMLElement.innerText](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/innerText)
- [MDN: Cross-site scripting (XSS)](https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/XSS)

---

[← 5b. DOM in more depth](../dom_intermediate/) · [Back to 5. Objects, the DOM and events](../) · **Next:** [5d. Changing classes with classList →](../modifying_classlist/)
