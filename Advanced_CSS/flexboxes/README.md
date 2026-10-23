# Flexbox

Flexbox is a **one-dimensional** layout system. It lays out items in a single row **or** a single column, and handles the spacing, alignment and sizing for you.

Open `index.html` in a browser, then uncomment properties in `style.css` one at a time to see what each one does.

## Core ideas

| Term | Meaning |
|---|---|
| **Flex container** | The parent with `display: flex` (here, `<section class="container">`). |
| **Flex items** | The container's **direct** children (the `<article>`s). Grandchildren are not affected. |
| **Main axis** | The direction items are placed in. Set by `flex-direction`. |
| **Cross axis** | Perpendicular to the main axis. |

```
flex-direction: row                     flex-direction: column
main axis  ───────────────▶             main axis  │
cross axis │                            cross axis ───▶
           ▼                                       ▼
```

**Rule of thumb:** `justify-content` works along the **main** axis, `align-*` works along the **cross** axis. If you switch to `column`, these swap visually.

## Container properties

| Property | What it does | Common values |
|---|---|---|
| `display` | Turns the element into a flex container. | `flex`, `inline-flex` |
| `flex-direction` | Sets the main axis. | `row` (default), `row-reverse`, `column`, `column-reverse` |
| `flex-wrap` | Whether items may move onto new lines. | `nowrap` (default), `wrap`, `wrap-reverse` |
| `flex-flow` | Shorthand for `flex-direction` and `flex-wrap`. | `row wrap`, `column nowrap` |
| `justify-content` | Places items and distributes free space on the main axis. | `flex-start`, `flex-end`, `center`, `space-between`, `space-around`, `space-evenly` |
| `align-items` | Aligns items on the cross axis, inside their line. | `stretch` (default), `flex-start`, `flex-end`, `center`, `baseline` |
| `align-content` | Aligns whole **lines** on the cross axis. Only matters with `wrap` and more than one line. | `stretch` (default), `flex-start`, `flex-end`, `center`, `space-between`, `space-around`, `space-evenly` |
| `gap` | Space **between** items, not at the outer edges. | `10px`, `20px 10px` (row-gap column-gap) |

### Spacing values for `justify-content`

```
flex-start     [1][2][3]· · · · · ·
flex-end       · · · · · ·[1][2][3]
center         · · ·[1][2][3]· · ·
space-between  [1]· · ·[2]· · ·[3]
space-around   ·[1]· ·[2]· ·[3]·        edge gaps are half-size
space-evenly   · ·[1]· ·[2]· ·[3]· ·    every gap is equal
```

## Item properties

| Property | What it does | Default |
|---|---|---|
| `order` | Changes the **visual** order. Lower numbers come first. | `0` |
| `flex-grow` | How much of the **leftover** space the item takes, relative to its siblings. | `0` |
| `flex-shrink` | How much the item shrinks when there isn't enough space. `0` means never shrink. | `1` |
| `flex-basis` | The item's starting size on the main axis, before growing or shrinking. Overrides `width` in a row and `height` in a column. | `auto` |
| `flex` | Shorthand: `flex-grow flex-shrink flex-basis`. | `0 1 auto` |
| `align-self` | Overrides `align-items` for this one item. | `auto` |

### How the browser sizes flex items

1. Start each item at its `flex-basis`, or its width/content size if the basis is `auto`.
2. Add them up and compare the total with the container's size.
3. **Space left over?** Share it out using the `flex-grow` ratios.
4. **Not enough space?** Take it away using the `flex-shrink` ratios, weighted by each item's basis.

Example: with 300px of extra space, item A has `flex-grow: 1` and B has `flex-grow: 2`. A gets **100px extra** and B gets **200px extra**. B gets twice as much *extra* space as A; that does not make it twice as wide overall.

### Common `flex` shorthand values

| Shorthand | Expands to | Use it for |
|---|---|---|
| `flex: 1` | `1 1 0%` | Equal-width columns, whatever their content |
| `flex: auto` | `1 1 auto` | Grow and shrink, starting from content size |
| `flex: none` | `0 0 auto` | Rigid items such as icons and buttons |
| `flex: 0 0 250px` | fixed 250px | Fixed-width sidebar |

## What the current `style.css` does

- `flex-flow: row wrap`: items go left to right and wrap onto new rows.
- `.flex-item { flex-basis: 20%; flex-grow: 1; }`: each item starts at 20% width. With the 20px of margin, only 4 fit per row, and they grow to fill the row.
- 14 items means rows of 4, 4, 4 and **2**. The last 2 stretch across the whole row. This uneven last row is typical of flexbox (see "When to avoid flexbox" below).
- `justify-content: space-around` has no visible effect, because `flex-grow: 1` uses up all the free space.
- `align-content: flex-end` has no visible effect while the container has `height: auto`. Give it a fixed height to see it work.

## When to use flexbox ✅

Use flexbox when the layout goes in **one direction** and the **content decides the sizes**:

- **Navigation bars**: links in a row, with the logo on the left and the menu on the right (`justify-content: space-between`).
- **Centering anything**, horizontally and vertically:
  ```css
  .parent { display: flex; justify-content: center; align-items: center; }
  ```
- **Button groups, toolbars, tag or chip lists**: a row of items with even gaps (`gap`).
- **Card internals**: image, title, text and a button pinned to the bottom (`flex-direction: column` plus `margin-top: auto` on the button).
- **Media objects**: an avatar next to a block of text, as in comments or chat messages.
- **Form rows**: a label, an input that grows (`flex: 1`) and a fixed-size button.
- **Sticky footer**: `body { display: flex; flex-direction: column; min-height: 100vh; }` and `main { flex: 1; }`.
- **Equal-height columns** in a single row. `align-items: stretch` does this by default.
- **Simple responsive wrapping**, where items should flow onto new lines as space runs out and an uneven last row is fine.
- **Reordering a few items** for different screen sizes, using `order` in a media query (with the accessibility caution below).

## When to avoid flexbox ❌

- **Two-dimensional layouts.** If rows **and** columns must line up, as in a photo gallery, a dashboard or a full page layout (header, sidebar, main, footer), use **CSS Grid**. Flexbox lines are independent of each other, so the columns in different rows won't line up.
- **Grids where the last row must match the others.** With `flex-grow`, the last row's items stretch, as in this demo. Grid's `repeat(auto-fill, minmax(200px, 1fr))` keeps every column the same width.
- **Layout defined by the container, not the content.** When you think "3 columns of 1fr, 2fr, 1fr", that is Grid. Flexbox is better when you think "these items, sized by their content, in a row".
- **Overlapping elements**, such as text on top of an image. Use Grid (place both items in the same cell) or `position: absolute`.
- **Plain text flow.** Paragraphs, inline links and normal document content already flow correctly with normal block/inline layout. Wrapping them in flex only adds complexity.
- **Tabular data.** Use a real `<table>`. It is semantic and accessible, and its columns align automatically.
- **Rearranging meaningful content with `order` or `*-reverse`.** Screen readers and keyboard Tab order follow the **HTML** order, not the visual order. If the order matters, change the HTML instead.
- **Very deep nesting.** If you have flex inside flex inside flex just to build a grid, switch to Grid.

> **Flexbox vs Grid in one line:** Flexbox lays out items *in a line* (content-out); Grid lays out items *in a grid* (layout-in). Real pages usually use both: Grid for the page skeleton, Flexbox for the components inside it.

## Common gotchas

- **Only direct children** become flex items.
- **`justify-content` seems to do nothing** when items have `flex-grow` or there is no free space.
- **`align-content` seems to do nothing** with `nowrap`, with only one line, or when the container has no spare height.
- **`align-items: stretch` doesn't stretch** items that have a fixed `height` (in a row) or `width` (in a column).
- **Text overflows a flex item.** Flex items default to `min-width: auto`, so they won't shrink below their content. Add `min-width: 0` (or `overflow: hidden`) to the item.
- **`width` is ignored**, because `flex-basis` overrides it on the main axis.
- **Use `gap`, not margins**, for spacing between items. It doesn't add space at the outer edges.

## Practice

- [Flexbox Froggy](https://flexboxfroggy.com): a game for learning the alignment properties
- [CSS-Tricks: A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/): a visual cheat sheet
- [MDN: Basic concepts of flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox)
