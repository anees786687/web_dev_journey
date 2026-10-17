# web_dev_journey

My hands-on notes from learning web development (**HTML, CSS and JavaScript**), built while
taking the Web Programming course at BITS.

Every file is a small, self-contained example. Each one starts with a **comment header**
explaining the concept, and has **inline comments** explaining *why* each line does what
it does. Most files also have a **"TRY IT"** section with an experiment to run, and real
mistakes are marked with **⚠️** so you can learn from them.

If you're new to web development, you can follow this repo from top to bottom.

---

## What's inside

```
web_dev_journey/
├── HTML_and_basic_CSS/   1. Selectors, specificity, inheritance, the box model
├── Advanced_CSS/         2. Layout: display, position, float, Flexbox, Grid, media queries
├── Labs/                 3. Small projects that combine the HTML and CSS topics
└── JavaScript/           4. Variables, conditionals, loops, functions, objects, the DOM, events
    └── README.md            ← its own learning path and cheat sheet
```

---

## How to use this repo

1. **Clone it**
   ```bash
   git clone https://github.com/anees786687/web_dev_journey.git
   ```
2. **Open any `.html` file in your browser.** You don't need any build tools or installs.
   Tip: the VS Code extension **Live Server** reloads the page every time you save.
3. **Read the comments in the file**, then **change things and refresh**.
   Breaking things on purpose is the fastest way to learn.
4. **Use DevTools** (`F12` or right-click → *Inspect*):
   - *Elements* and *Computed* show which CSS rules apply, which are overridden (crossed out), and the box model.
   - *Console* shows the output of the JavaScript examples, and lets you type and run JS yourself.
5. **Optional:** install [Node.js](https://nodejs.org/) to run the JavaScript files from a terminal (`node file.js`).

---

## Learning path

Go through the sections in this order. Each step builds on the previous one.

### 1. HTML and basic CSS: [`HTML_and_basic_CSS/`](HTML_and_basic_CSS/)

How CSS **selects** elements, and how the browser decides **which rule wins**.

| # | File | What you'll learn |
|---|------|-------------------|
| 3 | [3_attr_selector.html](HTML_and_basic_CSS/3_attr_selector.html) | Attribute selectors: `[attr]`, `=`, `~=`, `^=`, `$=`, `*=`, and the `i` flag |
| 4 | [4_combinators.html](HTML_and_basic_CSS/4_combinators.html) | Combinators: descendant (space), child `>`, adjacent sibling `+`; styling tables |
| 5 | [5_pseduo_selectors.html](HTML_and_basic_CSS/5_pseduo_selectors.html) | Pseudo-classes (`:hover`, `:focus`, `:nth-child`) and pseudo-elements (`::placeholder`, `::selection`, `::first-line`); link-state order |
| 6 | [6_specificity_1.html](HTML_and_basic_CSS/6_specificity_1.html) | Specificity: how IDs, classes and elements are scored |
| 7 | [7_specificity_2.html](HTML_and_basic_CSS/7_specificity_2.html) | Specificity with longer selectors, and why inline styles win |
| 8 | [8_source_order/](HTML_and_basic_CSS/8_source_order/index.html) | Inline, internal and external CSS; when specificity ties, the **last** rule wins |
| 9 | [9_inheritance_1.html](HTML_and_basic_CSS/9_inheritance_1.html) | Which properties are inherited (text) and which aren't (box); the `inherit` keyword |
| 10 | [10_inheritance_2.html](HTML_and_basic_CSS/10_inheritance_2.html) | The `initial`, `unset` and `inherit` keywords |
| 11 | [11_css_box_model_1.html](HTML_and_basic_CSS/11_css_box_model_1.html) | The box model: content, padding, border, margin; `content-box` vs `border-box` |
| 12 | [12_margin_collapse.html](HTML_and_basic_CSS/12_margin_collapse.html) | Margin collapsing and the `overflow` property |

### 2. Advanced CSS (layout): [`Advanced_CSS/`](Advanced_CSS/)

How to put things **where you want them** on the page.

| Topic | Files | What you'll learn |
|-------|-------|-------------------|
| Display | [display_property/](Advanced_CSS/display_property/index.html) | `block` vs `inline` vs `inline-block` vs `none` |
| Position | [position_property/](Advanced_CSS/position_property/index.html) | `static`, `relative`, `absolute`, `fixed`, `sticky` |
| Float and clear | [index.html](Advanced_CSS/float_n_clear_property/index.html), [index_1.html](Advanced_CSS/float_n_clear_property/index_1.html) | Wrapping content around floats, `clear`, and an old-school 2-column layout |
| Flexbox | [flexboxes/](Advanced_CSS/flexboxes/index.html) | 1-D layout: `flex-direction`, `flex-wrap`, `justify-content`, `align-items`, `order` |
| Grid | [index.html](Advanced_CSS/grids/index.html), [index_2.html](Advanced_CSS/grids/index_2.html) | 2-D layout: `fr`, `repeat()`, `minmax()`, `gap`, line placement, `grid-template-areas` |
| Media queries | [media_queries/](Advanced_CSS/media_queries/index.html) | Responsive design: different styles for phone, tablet and desktop |

> 💡 In the flexbox and grid folders, most properties in `style.css` are **commented out**.
> Uncomment them one at a time to see what each one does.

### 3. Lab exercises: [`Labs/`](Labs/)

Small projects that combine the HTML and CSS concepts above.

| Lab | Files | What it builds |
|-----|-------|----------------|
| Lab 1 | [1_form_practice.html](Labs/Lab_1/1_form_practice.html) | A student registration form: `<form>`, `<fieldset>`, `<label>`, input types, `<select>`, `<textarea>`, `required` |
| Lab 1 | [2_table_practice.html](Labs/Lab_1/2_table_practice.html) | A styled data table: `<caption>`, `<thead>`, `<tbody>`, `rowspan`, `border-collapse` |
| Lab 2 | [Lab_2/](Labs/Lab_2/index.html) | A styled form with aligned inputs (float trick), `box-shadow`, `text-shadow`, `:focus` |
| Lab 3 | [Lab_3/](Labs/Lab_3/index.html) | A responsive navigation bar: Flexbox + a media query, centered with `margin: 0 auto` |

### 4. JavaScript: [`JavaScript/`](JavaScript/)

How to make a page **do things**. Start with the [JavaScript README](JavaScript/README.md),
which explains how to run the code and has its own cheat sheet. Each folder also has a
README with key ideas and practice exercises.

| # | Folder | What you'll learn |
|---|--------|-------------------|
| 1 | [basics/](JavaScript/basics/) | `var` vs `let` vs `const`, scope, hoisting and the Temporal Dead Zone |
| 2 | [if_else/](JavaScript/if_else/) | `if` / `else if` / `else`, logical operators, truthy and falsy values |
| 3 | [seq_n_iterations/](JavaScript/seq_n_iterations/) | Arrays, `while`, `for`, `for...of`, `break` and `continue`, spread `...` and destructuring |
| 4 | [functions/](JavaScript/functions/) | Defining and calling functions, IIFEs, rest parameters, callbacks, higher-order functions, closures |
| 5 | [JS_and_DOM/](JavaScript/JS_and_DOM/) | Objects and object spread, the `window` and `document` objects, finding and changing elements (`querySelector`, `classList`), and click events |
| 6 | [nullish_coalescing/](JavaScript/nullish_coalescing/) | `??`, optional chaining `?.`, `??=`, and default parameters |

> 💡 The JavaScript examples print to the **Console**. Open a folder's `index.html`,
> press `F12`, and click the *Console* tab.

---

## CSS quick reference

### Which CSS rule wins? (the cascade)
1. `!important` (avoid it unless you really need it)
2. Inline `style="..."`
3. Higher **specificity**: `(IDs, classes/attributes/pseudo-classes, elements)`
   - `#nav` → (1,0,0)  `.btn:hover` → (0,2,0)  `div p` → (0,0,2)
4. If specificity ties: the rule that comes **later** in the code wins

### Box model
```
margin → border → padding → content
```
- By default, `width` sets the **content** only. Padding and border are added on top.
- `box-sizing: border-box;` makes `width` include padding and border (easier to reason about).
- Vertical margins between blocks **collapse** (you get the larger one, not the sum).

### Shorthand order for `margin` and `padding` (clockwise from the top)
| Values | Meaning |
|--------|---------|
| `10px` | all 4 sides |
| `10px 20px` | top/bottom, left/right |
| `10px 20px 5px` | top, left/right, bottom |
| `10px 20px 5px 0` | top, right, bottom, left |

`margin: 0 auto;` centers a block that has a width. `padding` never accepts `auto`.

### Flexbox vs Grid
| | Flexbox | Grid |
|---|---|---|
| Dimensions | 1-D (a row **or** a column) | 2-D (rows **and** columns) |
| Best for | nav bars, toolbars, centering, rows of cards | full page layouts, galleries, dashboards |
| Main/cross alignment | `justify-content` / `align-items` | `justify-items` / `align-items` (+ the same `justify-content`) |

They work well together: Grid for the page layout, Flexbox inside each section.

### Position values
| Value | In normal flow? | Positioned relative to |
|-------|-----------------|------------------------|
| `static` | ✅ | (offsets ignored) |
| `relative` | ✅ (space kept) | its own normal position |
| `absolute` | ❌ | nearest ancestor with a position other than `static` |
| `fixed` | ❌ | the browser window (viewport) |
| `sticky` | ✅ until it sticks | the viewport, while its parent is visible |

For the JavaScript cheat sheet, see [JavaScript/README.md](JavaScript/README.md#quick-reference-cheat-sheet).

---

## Common mistakes (marked with ⚠️ in the code)

While adding comments I marked real mistakes with ⚠️, so you can learn from them.

**HTML and CSS**
- **Reusing an `id`.** IDs must be unique. Use a `class` for styles you reuse. (Lab 1, Lab 2)
- **Missing units.** `height: 75;` is invalid and ignored. Write `75px`. (`position_property/style.css`)
- **Passwords in `type="text"`.** Use `type="password"`. (Lab 1)
- **A typo in the viewport meta tag** breaks mobile scaling. (`12_margin_collapse.html`)
- **Gaps between media query ranges** leave some screen widths unstyled. (`media_queries/`)
- **`<link>` outside `<head>`.** Stylesheets belong in `<head>`. (`grids/index_2.html`)
- **No space between attributes** (`id="a_1"class="..."`) is invalid HTML. (`flexboxes/index.html`)

**JavaScript**
- **Infinite loops.** `continue` before the counter update, or `i++` when counting down. (`seq_n_iterations/`)
- **Undeclared variables.** `for (x of arr)` without `const` creates an accidental global. (`seq_n_iterations/`)
- **Optional chaining on only one step.** `user?.address.city` still crashes. (`nullish_coalescing/`)
- **`||` for defaults** replaces a valid `0` or `""`. Use `??`. (`if_else/truthy_falsy.md`)
- **Thinking `=` or `{...obj}` makes a full copy.** `copy = arr` shares the same array, and spread only copies one level deep. (`seq_n_iterations/`, `JS_and_DOM/objects.js`)
- **DOM code that runs too early.** A script in `<head>` without `defer` can't find the elements. (`JS_and_DOM/`)
- **`addEventListener('click', fn())`.** The `()` calls `fn` once on page load instead of on every click. Pass `fn`. (`JS_and_DOM/click_events.js`)

---

## Useful resources

- [MDN Web Docs](https://developer.mozilla.org/): the best reference for HTML, CSS and JS
- [javascript.info](https://javascript.info/): a free, beginner-friendly JavaScript tutorial
- [Flexbox Froggy](https://flexboxfroggy.com/): a game for learning Flexbox
- [Grid Garden](https://cssgridgarden.com/): a game for learning CSS Grid
- [CSS-Tricks: A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [CSS-Tricks: A Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Specificity Calculator](https://specificity.keegan.st/)

---

*This repo is a work in progress. More JavaScript topics (more events, forms, async code) will be added as I learn them.*
