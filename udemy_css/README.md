# Udemy CSS

My notes from the Udemy CSS course. The first half is a **refresher on CSS basics**, and the
second half covers what I practised in this folder: **fonts, text styling, lists, custom
properties, `text-shadow` and Flexbox**.

Each section has the **syntax**, a **short example**, and the **details that are easy to
miss**. Real mistakes from my own code are marked with **⚠️**.

---

## What's inside

```
udemy_css/
├── index.html / style.css     Starter page (the "Amadeus" film page) + Google Fonts
├── Working_with_text/         text-transform, text-decoration, link states, font shorthand, lists
├── CantileverMiniProject/     Custom properties (variables), font shorthand, multi-layer text-shadow
├── flex/                      Flexbox: wrap, gap, justify/align, grow/shrink/basis
└── StarterCode.zip            Original course starter HTML
```

| Folder | Open | What you'll learn |
|--------|------|-------------------|
| Root | [index.html](index.html) | Loading a Google Font, `font-family`, `font-weight`, `letter-spacing`, `text-align` |
| Text | [Working_with_text/](Working_with_text/index.html) | `text-transform`, `text-decoration`, `:hover` / `:visited`, `font` shorthand, `list-style-*` |
| Mini project | [CantileverMiniProject/](CantileverMiniProject/index.html) | `:root` variables, `var()`, `line-height`, stacked `text-shadow`, `vw` |
| Flexbox | [flex/](flex/index.html) | `display: flex`, `flex-wrap`, `gap`, `justify-content`, `align-items`, `flex-shrink` |

> 💡 Many properties in these `style.css` files are **commented out**. Uncomment them one at a
> time and refresh to see what each one does.

---

## Table of contents

**Part 1: CSS basics**
1. [How CSS is written](#1-how-css-is-written)
2. [Adding CSS to a page](#2-adding-css-to-a-page)
3. [Selectors](#3-selectors)
4. [The cascade, specificity and inheritance](#4-the-cascade-specificity-and-inheritance)
5. [Units](#5-units)
6. [Colors](#6-colors)
7. [The box model](#7-the-box-model)

**Part 2: What I learnt in this folder**

8. [Fonts and Google Fonts](#8-fonts-and-google-fonts)
9. [The `font` shorthand](#9-the-font-shorthand)
10. [Text properties](#10-text-properties)
11. [Styling links (and pseudo-class order)](#11-styling-links-and-pseudo-class-order)
12. [Lists](#12-lists)
13. [CSS custom properties (variables)](#13-css-custom-properties-variables)
14. [`text-shadow`](#14-text-shadow)
15. [Flexbox](#15-flexbox)
16. [Mistakes and gotchas found in this folder](#16-mistakes-and-gotchas-found-in-this-folder)

---

# Part 1: CSS basics

## 1. How CSS is written

```css
selector {
  property: value;   /* this line is a "declaration" */
  property: value;
}
```

- The whole block is a **rule**. The part in `{ }` is the **declaration block**.
- Every declaration ends with `;`. The last one can skip it, but always adding it avoids bugs
  when you add another line later.
- Comments are `/* ... */` only. `//` is **not** a CSS comment. It silently breaks the next
  declaration.
- If a value is invalid (typo, missing unit), the browser **ignores only that declaration**
  and keeps going. No error is shown, so check DevTools: invalid lines have a ⚠️ icon and are
  crossed out.

## 2. Adding CSS to a page

| Way | Example | When to use |
|-----|---------|-------------|
| Inline | `<p style="color: red">` | Almost never. It is hard to override and to reuse. |
| Internal | `<style> p { color: red; } </style>` in `<head>` | Quick experiments, one-page demos |
| External | `<link rel="stylesheet" href="style.css">` in `<head>` | Real projects. One file styles many pages and is cached. |

## 3. Selectors

| Selector | Example | Selects |
|----------|---------|---------|
| Universal | `*` | every element |
| Type | `p` | every `<p>` |
| Class | `.cast` | elements with `class="cast"` (can be reused) |
| ID | `#summary` | the **one** element with `id="summary"` |
| Grouping | `h1, h2` | both `h1` and `h2` |
| Descendant | `.container div` | any `div` inside `.container`, at any depth |
| Child | `ul > li` | `li` that are **direct** children of `ul` |
| Adjacent sibling | `h2 + p` | the `p` right after an `h2` |
| General sibling | `h2 ~ p` | every `p` after an `h2` with the same parent |
| Attribute | `a[href^="https"]` | links whose `href` starts with `https` |
| Pseudo-class | `a:hover`, `li:nth-child(2)` | an element in a **state** or **position** |
| Pseudo-element | `p::first-line`, `li::marker` | a **part** of an element |

```css
/* Working_with_text/style.css uses all three main kinds */
a      { text-decoration: none; }     /* type   */
.cast  { background-color: red; }     /* class  */
#cast  { list-style-position: outside; } /* id  */
```

> 💡 In that file, `.cast` is on the `<h2>` and `#cast` is on the `<ul>`. A class and an ID
> can have the same name because they are different selectors, but it is confusing. Prefer
> distinct names.

## 4. The cascade, specificity and inheritance

When two rules set the same property on the same element, the browser picks one in this order:

1. **Importance**: `!important` beats normal declarations. (Avoid it. It makes later fixes hard.)
2. **Inline styles** beat stylesheet rules.
3. **Specificity**: a score of **(IDs, classes/attributes/pseudo-classes, elements)**, compared
   left to right.
4. **Source order**: if everything else ties, the rule written **later** wins.

| Selector | Score |
|----------|-------|
| `p` | (0, 0, 1) |
| `a:hover` | (0, 1, 1) |
| `.container div` | (0, 1, 1) |
| `#summary` | (1, 0, 0) |
| `#cast li span` | (1, 0, 2) |

- One ID beats any number of classes: `(1,0,0)` > `(0,15,0)`.
- `*` and combinators (` `, `>`, `+`, `~`) add **nothing**.

**Inheritance:** some properties pass down from parent to children automatically.

| Inherited (mostly text) | Not inherited (mostly box) |
|-------------------------|----------------------------|
| `color`, `font-*`, `line-height`, `letter-spacing`, `text-align`, `text-transform`, `list-style-*`, `visibility` | `margin`, `padding`, `border`, `width`, `height`, `background`, `display`, `text-decoration`* |

That is why setting `font-family` on `body` (as in [style.css](style.css)) changes the whole page.

\* `text-decoration` is not inherited, but the line is still **drawn across** child text, and
children can't remove it with `text-decoration: none`.

Keywords that work on **any** property: `inherit` (copy the parent), `initial` (the CSS
default), `unset` (inherit if the property normally inherits, otherwise `initial`).

## 5. Units

| Unit | Relative to | Notes |
|------|-------------|-------|
| `px` | nothing (absolute) | Predictable. Doesn't scale when the user changes the browser font size. |
| `%` | the parent | For `width` it's the parent's width. For `font-size` it's the parent's font size. |
| `em` | the **element's own** font size (for `font-size`, the **parent's**) | Compounds: nested `1.25em` inside `1.25em` = 1.5625× |
| `rem` | the **root** (`<html>`) font size, usually 16px | Doesn't compound. Good default for font sizes and spacing. |
| `vw` / `vh` | 1% of the viewport width / height | `width: 50vw` = half the window |
| unitless | the element's font size (only for `line-height`) | See [line-height](#line-height) |

```css
.container { height: 90vh; width: 70vw; }   /* flex/style.css */
body       { letter-spacing: 0.2rem; }       /* style.css: 0.2 × 16px = 3.2px */
```

- `0` never needs a unit. Any other number does: `width: 200;` is **invalid** and ignored.
- ⚠️ `100vw` includes the vertical scrollbar, so it can cause a horizontal scrollbar.
  `width: 100%` usually avoids that.
- ⚠️ On phones, `100vh` can be taller than the visible area because of the address bar. Newer
  units `100dvh` (dynamic) / `100svh` (small) fix this.

## 6. Colors

```css
color: red;                    /* named color (~140 of them, e.g. gainsboro, aquamarine) */
color: #fdf9fd;                /* hex: #RRGGBB (or #RGB shorthand, #RRGGBBAA with alpha) */
color: rgb(253 249 253);       /* 0–255 each */
color: rgb(0 0 0 / 50%);       /* with transparency */
color: hsl(240 100% 50%);      /* hue (0–360°), saturation, lightness */
```

- `color` sets the **text** color. `background-color` sets the box behind it.
- `opacity: 0.5` fades the **whole element including its children**. Use an alpha color if
  you only want a transparent background.

## 7. The box model

Every element is a box:

```
┌───────────── margin (transparent, outside) ─────────────┐
│ ┌─────────── border ──────────────────────────────────┐ │
│ │ ┌───────── padding (has the background) ──────────┐ │ │
│ │ │             content (width × height)            │ │ │
│ │ └─────────────────────────────────────────────────┘ │ │
│ └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

```css
.container div {
  width: 200px;
  height: 100px;
  border: 1px solid red;
  box-sizing: border-box;   /* flex/style.css: the box is exactly 200 × 100 */
}
```

- `box-sizing: content-box` (the default): `width` is only the content. Padding and border are
  **added**, so `200px + 2×10px padding + 2×1px border = 222px`.
- `box-sizing: border-box`: `width` **includes** padding and border. Most people set this on
  everything: `*, *::before, *::after { box-sizing: border-box; }`
- Shorthand order is **clockwise from the top**: `margin: top right bottom left`.
  `margin: 2rem 2rem` = top/bottom 2rem, left/right 2rem.
- Vertical margins between blocks **collapse** (you get the larger one, not the sum).
  Margins **don't** collapse inside a flex or grid container.
- Browsers add default margins (e.g. `body` has `8px`, headings and `p` have top/bottom
  margins). That's why the Cantilever project starts with `body { margin: 0; }`.

---

# Part 2: What I learnt in this folder

## 8. Fonts and Google Fonts

**Files:** [index.html](index.html), [style.css](style.css), [CantileverMiniProject/](CantileverMiniProject/index.html)

### Loading a Google Font

Google Fonts gives you three `<link>` tags to put in `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playwrite+AR+Guides&display=swap" rel="stylesheet">
```

| Part | What it does |
|------|--------------|
| `preconnect` | Opens the connection to Google's servers early, so the font downloads faster. |
| `crossorigin` | Needed on `fonts.gstatic.com` because font files are fetched in CORS mode. |
| `family=Playwrite+AR+Guides` | The font name, with `+` instead of spaces. |
| `family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700` | Which styles to download: `(italic?, weight)` pairs. Here: regular, bold, italic, bold italic. |
| Several `family=` in one URL | Loads several fonts in one request (the Cantilever page loads 3). |
| `display=swap` | Show a fallback font immediately, then swap in the web font when it arrives (no invisible text). |

Then use it in CSS:

```css
body {
  font-family: "Playwrite AR Guides", cursive;
}
```

### `font-family`

- It's a **list of fallbacks**. The browser uses the first font it has.
- Always end with a **generic family**: `serif`, `sans-serif`, `monospace`, `cursive`,
  `fantasy`, `system-ui`.
- Put names with spaces or digits in quotes: `"Space Mono"`. Generic names are **never**
  quoted (`"monospace"` would look for a font literally called monospace).
- Font names are matched case-insensitively, so `"Space mono"` still works, but copying the
  exact name from Google Fonts is clearer.

### `font-weight`

| Keyword | Number |
|---------|--------|
| `normal` | `400` |
| `bold` | `700` |
| `lighter` / `bolder` | relative to the parent |

Any value from `1` to `1000` is allowed, but you only get a real difference if that weight
was **downloaded**. If you ask for `900` and only `400` and `700` exist, the browser picks the
closest one (or fakes a bold, which looks worse).

### `font-style`

`normal`, `italic` (the font's real italic design) or `oblique` (the regular letters slanted).
If no italic file was loaded, the browser fakes it by slanting.

### `font-size`

```css
h1 { font-size: 3rem; }   /* 48px if the root is 16px */
```

- Prefer `rem` so text scales with the user's browser settings.
- Keywords exist too: `small`, `medium`, `large`, `x-large`, `larger`, `smaller`.

## 9. The `font` shorthand

**Files:** [Working_with_text/style.css](Working_with_text/style.css), [CantileverMiniProject/app.css](CantileverMiniProject/app.css)

```css
#summary {
  font: italic 900 1.25em/3 sans-serif;
  /*    style  weight size/line-height family */
}
```

**Rules:**
1. `font-size` and `font-family` are **required**. Without either, the whole declaration is
   **invalid** and ignored.
2. `font-style`, `font-variant` and `font-weight` are optional and must come **before** the size
   (in any order among themselves).
3. `line-height` is optional and goes **right after** the size with a `/`: `1.25em/3`.
4. `font-family` must be **last**.

**⚠️ The trap:** every optional part you leave out is **reset to its default**, not kept.

```css
p      { line-height: 1.8; font-weight: 700; }
p.note { font: 1rem sans-serif; }   /* line-height is reset to normal, weight to 400! */
```

So write the shorthand first and override with longhands after it, never the other way round.

### Shorthand inside a variable (from the Cantilever project)

```css
:root {
  --font-space-mono-bold: normal 700 1rem "Space Mono", monospace;
}
body {
  font: var(--font-space-mono-bold);
}
```

This works because `var()` is replaced **before** the value is checked, so the browser sees a
full, valid `font` value. It's a neat way to define a small "type scale" once and reuse it.

## 10. Text properties

**Files:** [style.css](style.css), [Working_with_text/style.css](Working_with_text/style.css), [CantileverMiniProject/app.css](CantileverMiniProject/app.css)

### `text-align`

`left` | `right` | `center` | `justify` | `start` | `end`

- Aligns the **inline content inside** a block. It doesn't move the block itself (use
  `margin: 0 auto` or Flexbox for that).
- `start` / `end` follow the writing direction, so they work for right-to-left languages too.
- `justify` stretches spaces so both edges line up. It can leave big gaps in narrow columns.

### `text-transform`

```css
text-transform: uppercase;   /* AMADEUS */
text-transform: lowercase;   /* amadeus */
text-transform: capitalize;  /* First Letter Of Each Word */
text-transform: none;
```

- It only changes how text **looks**. The HTML text, copy-paste (in most browsers) and
  JavaScript `textContent` stay the same.
- `capitalize` only uppercases first letters. It **doesn't lowercase** the rest: `"hELLO"`
  becomes `"HELLO"`.
- Screen readers may spell out all-caps text letter by letter, so keep real text in normal
  case and use `uppercase` for styling.

### `text-decoration`

A shorthand for four properties:

```css
text-decoration: underline overline dashed red 3px;
/*               line(s)            style  color thickness */
```

| Longhand | Values |
|----------|--------|
| `text-decoration-line` | `none`, `underline`, `overline`, `line-through` (can combine several) |
| `text-decoration-style` | `solid`, `double`, `dotted`, `dashed`, `wavy` |
| `text-decoration-color` | any color (defaults to the text `color`) |
| `text-decoration-thickness` | a length like `3px`, or `auto` / `from-font` |

- The order of values in the shorthand doesn't matter.
- Related: `text-underline-offset: 4px;` moves the underline away from the text, which looks
  much cleaner with thick lines.
- `text-decoration: none` is the standard way to remove the underline from links.

### `letter-spacing` and `word-spacing`

```css
body { letter-spacing: 0.2rem; }   /* extra space between every character */
```

- Can be negative to squeeze letters together (often used on large headings).
- Using `em` (e.g. `0.05em`) scales the spacing with the font size, which `rem`/`px` don't.
- `word-spacing` does the same between words.

### `line-height`

```css
h1 { font-size: 3rem; line-height: 1; }   /* Cantilever: tight heading lines */
```

| Value | Meaning | Inherited as |
|-------|---------|--------------|
| `normal` | ~1.2, depends on the font | `normal` |
| `1.5` (unitless) | 1.5 × the element's own font size | the **number** `1.5` ✅ |
| `1.5em` / `150%` | 1.5 × the font size **right here** | a **fixed length** ⚠️ |
| `24px` | exactly 24px | `24px` |

**Always prefer unitless.** With `em` or `%`, children inherit the computed pixel value, so a
child with a bigger font gets lines that overlap.

- About **1.4–1.6** is comfortable for body text. Big headings look better at **1–1.2**.

## 11. Styling links (and pseudo-class order)

**File:** [Working_with_text/style.css](Working_with_text/style.css)

```css
a         { text-decoration: none; }
a:hover   { text-decoration: underline green 3px; color: green; }
a:visited { color: red; }
```

### The LVHA order

All of these selectors have the **same specificity** (0,1,1), so the **later one wins** when
more than one applies. A visited link that you hover matches both `:visited` and `:hover`.

Write them in this order (memory trick: **L**o**V**e **HA**te):

```css
a:link    { }   /* not yet visited */
a:visited { }
a:hover   { }   /* mouse over it */
a:active  { }   /* while being clicked */
```

- ⚠️ In `Working_with_text/style.css`, `:visited` is written **after** `:hover`. So when you hover
  a link you've already visited, its color stays **red** instead of turning green (the green
  underline still appears, because `:visited` doesn't set `text-decoration`). Swap the two
  rules to fix it.
- Add `a:focus-visible` with the same style as `:hover` so keyboard users can see where they are.

### `:visited` privacy limits

To stop websites from detecting your browsing history, `:visited` can **only change colors**:
`color`, `background-color`, `border-color`, `outline-color`, `text-decoration-color`, etc.
Things like `font-size`, `text-decoration-line` or `display` are ignored. JavaScript
(`getComputedStyle`) also always reports the unvisited style.

## 12. Lists

**File:** [Working_with_text/style.css](Working_with_text/style.css) (`#cast`)

### `list-style-type`

```css
list-style-type: disc;          /* default for <ul> ● */
list-style-type: circle;        /* ○ */
list-style-type: square;        /* ■ */
list-style-type: decimal;       /* default for <ol>: 1. 2. 3. */
list-style-type: lower-roman;   /* i. ii. iii. */
list-style-type: "* ";          /* any string as a custom marker */
list-style-type: none;          /* no marker: used for nav bars */
```

- A custom string needs **quotes** and usually a trailing space: `"* "`, `"→ "`.
- For full control over the marker (color, size, font), style `li::marker`:
  ```css
  li::marker { color: crimson; font-weight: 700; }
  ```
- ⚠️ In Safari, `list-style: none` can make VoiceOver stop announcing the element as a list.
  If that matters, add `role="list"` to the `<ul>`.
- For a nav bar, also reset the browser's default `padding-left` (about `40px`) on the `<ul>`:
  `ul { list-style: none; padding: 0; margin: 0; }`

### `list-style-position`

| Value | Where the marker goes | Wrapped lines line up with |
|-------|------------------------|----------------------------|
| `outside` (default) | in the `<ul>`'s left padding, **outside** the `li` box | the first line's text |
| `inside` | **inside** the `li` box, like the first character of the text | the marker |

> 💡 TRY IT: give `#cast li` a `border: 1px solid` and switch between `inside` and `outside`.
> You can see the marker jump in and out of the border.

### `list-style-image` and the shorthand

```css
list-style-image: url("star.svg");     /* image as marker; hard to size, ::marker is better */
list-style: square inside;             /* shorthand: type position image, any order */
```

## 13. CSS custom properties (variables)

**File:** [CantileverMiniProject/app.css](CantileverMiniProject/app.css)

```css
:root {
  --brand: #0c2ffb;
  --font-space-mono-reg: normal 400 1rem "Space Mono", monospace;
}

h1 { color: var(--brand); }
body { font: var(--font-space-mono-reg); }
```

- The name must start with `--`. Names are **case-sensitive**: `--Brand` ≠ `--brand`.
- `:root` is the `<html>` element (with higher specificity than `html`). Defining variables
  there makes them available everywhere, because custom properties are **inherited**.
- You can redefine a variable on any element, and it only changes inside that element:
  ```css
  .dark-card { --brand: white; }   /* everything inside .dark-card now uses white */
  ```
- **Fallback:** `var(--brand, black)` uses `black` if `--brand` isn't defined.
- ⚠️ If the variable exists but holds a value that's invalid for that property, the property
  becomes `unset` (inherit or initial), **not** "ignored". The earlier declaration doesn't
  come back.
- Unlike Sass variables, CSS variables are **live**: you can change them in media queries or
  from JavaScript (`element.style.setProperty('--brand', 'red')`) and the page updates.

## 14. `text-shadow`

**File:** [CantileverMiniProject/app.css](CantileverMiniProject/app.css) (`.shadow-artist`)

```css
text-shadow: offset-x offset-y blur-radius color;
text-shadow: 2px 2px 4px rgb(0 0 0 / 40%);
```

| Part | Meaning |
|------|---------|
| `offset-x` | positive → right, negative → left |
| `offset-y` | positive → **down**, negative → **up** |
| `blur-radius` | optional, default `0` (sharp copy). Can't be negative. |
| `color` | optional, defaults to the text `color`. Can go first or last. |

### Several shadows at once

Separate shadows with commas. The **first one is drawn on top**.

```css
.shadow-artist {
  text-shadow:
    0 -3.25px 2px #0c2ffb,   /* blue, a little above   */
    0 -6.5px  2px #2cfcfd,   /* cyan, further above    */
    0  3.25px 2px #fefc4b,   /* yellow, a little below */
    0  6.5px  2px #fb203b;   /* red, further below     */
}
```

This stacks four colored copies above and below the word to get the "retro rainbow" effect.

- Shadows don't take up space in the layout. Big offsets can overlap nearby text.
- `box-shadow` is the box version. It also has a 4th length (**spread**) and an `inset`
  keyword, which `text-shadow` doesn't have.

## 15. Flexbox

**Files:** [flex/index.html](flex/index.html), [flex/style.css](flex/style.css)

Flexbox lays out items in **one direction** (a row or a column). `display: flex` goes on the
**parent** (the *container*). Its **direct children** become *flex items*.

```
main axis (flex-direction: row) →
┌──────────────────────────────────────────┐  ↓ cross axis
│ [item] [item] [item]                     │
└──────────────────────────────────────────┘
```

- `justify-content` works on the **main axis**.
- `align-items` / `align-content` work on the **cross axis**.
- If `flex-direction: column`, the axes swap: `justify-content` becomes vertical.

### Container properties

```css
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
  align-items: end;
}
```

| Property | Values | Notes |
|----------|--------|-------|
| `flex-direction` | `row` (default), `row-reverse`, `column`, `column-reverse` | Sets the main axis |
| `flex-wrap` | `nowrap` (default), `wrap`, `wrap-reverse` | With `nowrap`, items **shrink** to fit on one line |
| `flex-flow` | `row wrap` | Shorthand for direction + wrap |
| `justify-content` | `flex-start`, `center`, `flex-end`, `space-between`, `space-around`, `space-evenly` | Spreads leftover space along the main axis |
| `align-items` | `stretch` (default), `flex-start` / `start`, `center`, `flex-end` / `end`, `baseline` | Aligns items **inside their line** on the cross axis |
| `align-content` | same as `justify-content` + `stretch` | Spreads the **lines** themselves. Only works when there are **several lines** (`wrap`) and extra cross-axis space |
| `gap` | `1rem` or `row-gap column-gap` | Space **between** items only, never at the outer edges |

**`space-between` vs `space-around` vs `space-evenly`:**

```
space-between: [A]-------[B]-------[C]      no space at the edges
space-around : -[A]--  --[B]--  --[C]-      each item gets equal space on both sides (edges are half)
space-evenly : --[A]--[B]--[C]--            all gaps equal, including the edges
```

⚠️ With `space-between` and `wrap`, the **last row** spreads out too. If the last row has 2
items while the others have 3, they go to the far left and far right. Grid, or `gap` +
`justify-content: flex-start`, avoids this.

### Item properties

| Property | Default | What it does |
|----------|---------|--------------|
| `flex-grow` | `0` | How much of the **leftover** space this item takes, compared to the others. `2` gets twice as much as `1`. |
| `flex-shrink` | `1` | How much this item shrinks when there **isn't enough** space. `0` = never shrink. |
| `flex-basis` | `auto` | The starting size along the main axis **before** grow/shrink. `auto` means "use `width`" (or `height` in a column). |
| `flex` | `0 1 auto` | Shorthand: `grow shrink basis` |
| `align-self` | `auto` | Overrides `align-items` for this one item |
| `order` | `0` | Changes the visual order (lower comes first). The tab order and screen readers still follow the HTML. |

Common `flex` shorthands:

| Shorthand | Means | Use for |
|-----------|-------|---------|
| `flex: 1` | `1 1 0%` | Equal-width columns, whatever their content |
| `flex: auto` | `1 1 auto` | Grow and shrink, but start from the content size |
| `flex: none` | `0 0 auto` | Fixed size, never grow or shrink |

### Details that tripped me up

- **`flex-shrink` does nothing when items wrap.** In `flex/style.css`, `.four` has
  `flex-shrink: 1.3`, but with `flex-wrap: wrap` an item that doesn't fit just moves to the next
  line, so nothing ever needs to shrink. Set `flex-wrap: nowrap` to see it work.
- **Shrinking is weighted by size.** The space removed from each item is
  `flex-shrink × flex-basis`, so a big item with the same `flex-shrink` loses more pixels than a
  small one.
- **Items won't shrink below their content.** Flex items have `min-width: auto`, so a long word
  or URL can overflow. Add `min-width: 0` to the item to allow it to shrink.
- **`height: auto` and stretching.** `align-items` defaults to `stretch`, which makes items
  fill the line's height, but **only if their height is `auto`**. A fixed height wins.
- ⚠️ **`.nine { height: auto; }` never applies.** `.container div` sets `height: 100px` and has
  specificity (0,1,1), which beats `.nine` (0,1,0). So `.nine` stays 100px tall (its
  `background-color` still works, because `.container div` doesn't set one). Write
  `.container .nine` (0,2,0) to win. Then, with `align-items: end`, it shrinks to fit its
  content. Without it, it stretches to the height of the row.
- **`end` vs `flex-end`.** For a normal row they look the same. They differ with
  `wrap-reverse` or `row-reverse`: `flex-end` follows the flex direction, `end` follows the
  writing direction. `flex-start` / `flex-end` have the best browser support.
- **Margins in flex.** Margins don't collapse, and `margin-left: auto` on an item pushes it
  (and everything after it) to the far end. Handy for "logo on the left, login on the right".
- **Centering in the page.** `flex/style.css` uses `body { display: flex; justify-content:
  center; align-items: center; }`. Horizontal centering works, but **vertical centering
  doesn't**, because `body` is only as tall as its content. Add `min-height: 100vh` (and
  `margin: 0`) to `body` to center it vertically too.

> 💡 TRY IT: in [flex/style.css](flex/style.css), uncomment `align-content: space-between`,
> then `flex-grow: 2` on `.one` and `.three`, then `align-self: flex-end` on `.nine`.
> Open DevTools, click the **flex** badge next to `.container` in the Elements panel to see
> the lines and free space.

---

## 16. Mistakes and gotchas found in this folder

| Where | What | Fix |
|-------|------|-----|
| `Working_with_text/style.css` | `a:visited` comes after `a:hover`, so hovered visited links stay red | Use LVHA order: `:link`, `:visited`, `:hover`, `:active` |
| `Working_with_text/style.css` | `.cast` (on `<h2>`) and `#cast` (on `<ul>`) share a name | Use clearer names like `.cast-heading` and `#cast-list` |
| `flex/style.css` | `.nine { height: auto }` is beaten by `.container div { height: 100px }` (higher specificity) | Use `.container .nine` |
| `flex/style.css` | `flex-shrink: 1.3` has no effect, because the container wraps | Use `nowrap`, or remove it |
| `flex/style.css` | `body` is flex-centered, but has no height, so it's not centered vertically | Add `min-height: 100vh; margin: 0;` to `body` |
| `CantileverMiniProject/app.css` | `"Space mono"` is spelled differently from the Google font `"Space Mono"` | Works (font names are case-insensitive), but copy the exact name |
| `CantileverMiniProject/app.css` | `.cantilever-container` uses `width: 50vw`, so the text gets very narrow on phones | Use `max-width: 60ch; width: 100%;` or a media query |
| `index.html`, `Working_with_text/index.html` | `<title>CSS Basics</title>` on every page; `flex` and Cantilever use `Document` | Give each page a descriptive title |

---

## Quick reference

```css
/* Text */
font: italic 700 1rem/1.5 "Space Mono", monospace;  /* [style] [weight] size[/line-height] family */
text-align: center;
text-transform: uppercase;
text-decoration: underline wavy red 2px;
letter-spacing: 0.05em;
line-height: 1.5;                 /* unitless! */
text-shadow: 1px 1px 2px #0008, 0 0 8px gold;

/* Lists */
list-style: none;                 /* nav bars (+ padding: 0) */
li::marker { color: crimson; }

/* Variables */
:root { --gap: 1rem; }
.x { gap: var(--gap, 8px); }

/* Flexbox */
.parent { display: flex; flex-wrap: wrap; gap: 1rem;
          justify-content: space-between; align-items: center; }
.child  { flex: 1; min-width: 0; }
.center { display: flex; justify-content: center; align-items: center; min-height: 100vh; }
```

---

## Useful resources

- [MDN: CSS reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference)
- [MDN: `font` shorthand](https://developer.mozilla.org/en-US/docs/Web/CSS/font)
- [MDN: Using CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [CSS-Tricks: A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Flexbox Froggy](https://flexboxfroggy.com/): a game for learning Flexbox
- [Google Fonts](https://fonts.google.com/)
- [Specificity Calculator](https://specificity.keegan.st/)
