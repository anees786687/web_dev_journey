# Whack-a-Mole

A 4×4 grid of holes. Every 2 seconds a mole pops up in a random hole and stays for 5 seconds.
Click it before it disappears to score a point.

## Files

| File | What it does |
|------|--------------|
| [index.html](index.html) | The 16 hole `<div>`s (ids `1` to `16`), the score line, and the CSS that lays the holes out with Grid |
| [script.js](script.js) | Shows moles at random, hides them after a timeout, and handles clicks and the score |
| [mole.jpeg](mole.jpeg) | The mole picture |

## How to run

Open `index.html` in a browser and click the moles as they appear. The score shows under the grid.

## How it works

1. **The game loop.** `setInterval` calls `moleSurfaced()` every 2 seconds.
2. **Showing a mole.** `moleSurfaced()` picks a random number from 1 to 16 and finds the hole with
   that id. If the hole already has a mole, it does nothing this round. Otherwise it creates an
   `<img>`, stores the hole number on it as `data-index`, and appends it to the hole.
3. **Hiding it again.** A `setTimeout` removes the mole after 5 seconds. Its timer id is saved in
   `timeoutIDArray`, at position `hole number - 1`.
4. **Clicking.** One click listener sits on the whole grid (event delegation). If the click
   landed on an `<img>`, it reads `data-index`, cancels that mole's timer with `clearTimeout`,
   removes the mole and adds 1 to the score.

## What I learnt

### 1. Off-by-one errors between ids and array indices
The holes are numbered 1 to 16, but array indices run 0 to 15. At first the timer id was **saved**
at `[divID - 1]` but **read** from `[id]`, one slot further along. The array starts out filled with
`0`, so clicks mostly printed `0`. Clicking hole 16 printed `undefined`, because index 16 doesn't
exist. The other numbers were the timer ids of moles in the *neighbouring* hole.

**Lesson:** convert between "hole number" and "array index" the same way everywhere. Work it out
once (`const index = Number(...) - 1`) and reuse that variable.

### 2. `element.remove()`
`event.target` is the element that was clicked, and every element has `.remove()`, which takes it
out of the page:

```js
event.target.remove();
```

`.remove()` does nothing if the element is already gone. `parent.removeChild(child)` throws an
error in that case.

### 3. Cancel the timer when the mole is clicked
Each mole has a `setTimeout` that removes it after 5 seconds. If the player clicks the mole first,
that timer still fires and calls `container.removeChild(img)` on an image that's no longer there,
which throws `NotFoundError`. So the click handler cancels it first:

```js
clearTimeout(timeoutIDArray[index]);
timeoutIDArray[index] = 0;
```

Use `clearTimeout` for `setTimeout` and `clearInterval` for `setInterval`. Browsers happen to
accept either one, but the matching pair is clearer and is what the spec describes.

### 4. Ids must be unique, so use `data-*` attributes instead
At first each mole got `img.id = divID`. But the hole `<div>` already had that id, so two elements
on the page shared it. Ids are meant to be unique, and `getElementById` only ever returns the first
match.

The fix is a **custom data attribute**:

```js
img.dataset.index = divID;                  // HTML: <img data-index="5">
Number(event.target.dataset.index) - 1;     // reading it back
```

- `element.dataset` reads and writes the element's `data-*` attributes. They're the standard place
  to keep your own information on an element, so you don't misuse `id` or `class`.
- Values are always **strings**, so convert with `Number()` when you need a number.
- Multi-word names are camelCase in JS and dashed in HTML: `dataset.moleIndex` is `data-mole-index`.
- You can see them on the element in DevTools → *Elements*.

### 5. Event delegation + data attributes is a common pattern
Rather than a listener on every mole, there's **one** listener on the grid. `event.target` says
what was clicked, and `dataset` says which mole it was. This works well when elements keep being
added and removed. The same pattern shows up in lists (`<button data-id="42">Delete</button>`),
tabs (`data-tab="settings"`), CSS selectors (`[data-state="active"]`), libraries (Bootstrap's
`data-bs-toggle`) and tests (`data-testid`).

Keep `data-*` values small and simple, like ids, flags and short strings. Anyone can read and
change them in DevTools, so never put secrets in them.

**Another way to do it:** add a click listener to each `<img>` when it's created. The listener can
then use `divID` and `tid` directly through a closure, with no lookup needed.

## Try it

1. Add a timer so the game ends after 30 seconds and shows the final score.
2. Make moles appear faster as the score goes up.
3. Replace the `for...of` search in `moleSurfaced()` with `moleContainersArray[divID - 1]`, since
   the holes are already in order.

---

[← Back to projects](../)
