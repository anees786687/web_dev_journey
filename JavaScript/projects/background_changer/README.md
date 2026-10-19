# Background changer

Three coloured buttons. Click one and the page's background turns that colour.

## Files

| File | What it does |
|------|--------------|
| [index.html](index.html) | The three buttons, each inside a coloured box |
| [style.css](style.css) | Centres the boxes with Flexbox, and defines the `.red`, `.blue` and `.green` background classes |
| [script.js](script.js) | Adds one colour class to `<body>` and removes the other two when a button is clicked |

## How it works

1. `querySelector` finds each button by its class.
2. Each button gets a click listener: `redButton.addEventListener('click', redBackground)`.
3. The listener calls `document.body.classList.add('red')` and removes the other colour classes,
   so only one background colour is ever active.

The colours themselves stay in the CSS. JavaScript only switches classes on and off, which is
usually cleaner than setting `element.style` directly.

## Try it

1. The three functions are nearly identical. Replace them with one `setBackground(color)` function
   (there's a sketch at the bottom of `script.js`).
2. Add a fourth button that resets the background.
3. Add a `transition: background-color 0.5s;` to `body` in `style.css` so the colour fades.

---

[← Back to projects](../)
