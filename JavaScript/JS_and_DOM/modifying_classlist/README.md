# 5d. Changing classes with `classList`

The cleanest way to change how an element looks from JavaScript is to **switch CSS classes**
on and off. The CSS defines what a class looks like; JavaScript decides which elements have it
right now. This folder builds a small "select an item" list in five steps, ending with a list
where only one item can be selected at a time.

## Files

| File | What it is |
|------|------------|
| [index.html](index.html) | A list of three `.item`s, and the `.item.selected` style (yellow background). Item 2 starts selected |
| [script.js](script.js) | The five steps, one function each. The `DEMO` number at the top picks which step runs |

## How to run

Open `index.html` in a browser and click the items. To try another step, change
`const DEMO = 5;` at the top of `script.js` to a number from 1 to 5, save and reload.

| `DEMO` | What happens |
|--------|--------------|
| 1 | Item 1 is selected as soon as the page loads (`contains` + `add`) |
| 2 | Clicking **Item 1** selects or deselects it. The others don't react |
| 3 | Every item can be selected or deselected on its own (a listener per item, in a loop) |
| 4 | The same as 3, written with `toggle()` |
| 5 | Only **one** item can be selected at a time, like radio buttons (`toggle(class, force)`) |

## Key ideas

| Method | What it does |
|--------|--------------|
| `el.classList.add('x')` | Adds the class (does nothing if it's already there) |
| `el.classList.remove('x')` | Removes the class (does nothing if it isn't there) |
| `el.classList.contains('x')` | `true` if the element has the class, otherwise `false` |
| `el.classList.toggle('x')` | Removes the class if it's there, adds it if it isn't |
| `el.classList.toggle('x', force)` | Adds the class if `force` is `true`, removes it if `false` |

- Keep the **looks in CSS** and the **decisions in JS**. Switching classes beats setting `el.style` property by property.
- `toggle('x')` replaces the whole "if it has the class, remove it, otherwise add it" `if`/`else`.
- Passing a comparison as `force` lets one line do either job:
  `other.classList.toggle('selected', other === item)` selects the clicked item and deselects all the others.
- To give every item a listener, loop over `querySelectorAll` and call `addEventListener` on each one.
- `.item.selected` (no space) in CSS means "an element with **both** classes".

## ⚠️ Common mistakes

- Writing a dot in the class name: `classList.add('.selected')` adds a class literally called `.selected`. Use `'selected'`.
- Calling `addEventListener` on the NodeList from `querySelectorAll`. A NodeList has no such method; add the listener to each element in a loop.
- Using `el.className = 'selected'`, which replaces **all** the element's classes (here it would remove `item` too). Use `classList.add`.

## Try it

1. In step 5, make clicking the already-selected item **deselect** it, so nothing is selected.
2. Add a `<p>` under the list and show "Selected: Item 2" in it whenever the selection changes.
3. Add a "Clear selection" button that removes `.selected` from every item.

### Resources

- [MDN: Element.classList](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList)
- [MDN: DOMTokenList.toggle()](https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/toggle)
- [MDN: DOMTokenList.contains()](https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/contains)

---

[← 5c. Changing text and HTML](../changing_text_n_html_content/) · [Back to 5. Objects, the DOM and events](../) · **Next:** [5e. Reading and changing attributes →](../changing_attributes/)
