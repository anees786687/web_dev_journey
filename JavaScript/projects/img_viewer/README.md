# Image viewer

A big image with a row of thumbnails under it. Click a thumbnail to show it in the big view,
add your own pictures from your computer, and remove the selected one.

## Files

| File | What it does |
|------|--------------|
| [index.html](index.html) | The big image, the list of thumbnails, the Add / Remove buttons and a hidden `<input type="file">` |
| [style.css](style.css) | Sizes the images with `object-fit`, outlines the selected thumbnail, and lays out the thumbnails and buttons with Flexbox |
| [script.js](script.js) | Switches the big image on click, adds picked files as new thumbnails, and removes the selected one |
| [images/](images/) | The four starting pictures (cat, dog, crow, leopard) |

## How to run

Open `index.html` in a browser. Then:

1. Click any thumbnail. It gets a blue outline and appears in the big view.
2. Click **Add** and pick one or more `.jpg` / `.png` files. They're added to the end of the list.
3. Click **Remove** to delete the selected thumbnail. The next one is selected automatically.
4. Remove everything: the big image disappears and a message tells you to add more.

Pictures you add only last until the page is refreshed.

## How it works

1. **Which image is selected?** The selected thumbnail has the class `selected`. CSS draws the
   outline, and JavaScript uses `classList.contains('selected')` to find it.
2. **One listener for every thumbnail (event delegation).** The click listener is on the `<ul>`,
   not on each `<img>`. A click on an image *bubbles up* to the `<ul>`, and `event.target` says
   which image was clicked. That's why images added later can be clicked without adding any new
   listeners.
3. **Adding images.** A file input is hard to style, so it's `hidden`, and the Add button calls
   `filePicker.click()` to open the file dialog. For each picked file, the script:
   - checks `file.type`, because `accept` only filters the dialog and can be bypassed
   - makes a temporary URL for it with `URL.createObjectURL(file)`
   - builds a new `<li><img></li>` with `createElement` / `appendChild`

   Finally it sets `filePicker.value = ''`, so picking the same file again still fires `change`.
4. **Removing images.** The script finds the selected thumbnail, removes its whole `<li>`, and
   selects the next one. `(i + 1) % length` wraps around, so removing the last thumbnail selects
   the first.
5. **The empty state.** Once the last image is removed, the big image is hidden with
   `mainImg.hidden = true` and a message is shown. Adding a picture brings it back.

### Bugs found while building it

| Bug | Cause | Fix |
|-----|-------|-----|
| Clicking Remove with no images threw a `TypeError` | The loop found no selected image, so `selectedElement` was `undefined` | Return early when the list is empty |
| The last image stayed in the big view after it was removed | The "is the list empty?" check ran *before* the removal. With one image left, the "next" image is the removed one | Check again *after* removing |
| After removing everything and adding again, Remove crashed | `'selected'` was added to the big image instead of the new thumbnail | `img.classList.add('selected')` |
| Thumbnails jumped around on hover | A `border` makes the image bigger and pushes its neighbours | Use `outline`, which takes up no space |
| The big image's alt text described the wrong animal | Remove only copied `src` | Copy `alt` too |

## Concepts used

- `querySelector` / `querySelectorAll`, `classList` (`add`, `remove`, `contains`) and
  `addEventListener` ([5. Objects, the DOM and events](../../JS_and_DOM/))
- Changing `src` and `alt` ([changing_attributes/](../../JS_and_DOM/changing_attributes/))
- Event delegation with `event.target`
- `createElement`, `appendChild` and `remove()`
- `<input type="file">`, the `change` event, `File.type` and `URL.createObjectURL()`
- The `hidden` attribute
- `for` / `for...of`, `break`, `continue` and `%` ([3. Arrays and loops](../../seq_n_iterations/))
- CSS `object-fit`, `aspect-ratio`, `outline` and Flexbox ([Advanced CSS](../../../Advanced_CSS/))

## Try it

1. Add **Previous** / **Next** buttons, or switch images with the arrow keys
   (listen for `keydown` on `document` and check `event.key`).
2. When an added image is removed, free its memory with `URL.revokeObjectURL(src)`. Only do it for
   added images, whose `src` starts with `blob:`.
3. Remove the `thumbnailList` and `thumbnailListLen` variables, and read the DOM when you need it
   (`thumbnailUl.querySelector('.selected')`, `thumbnailUl.children.length`).
4. Wrap each thumbnail in a `<button>` so keyboard users can reach it with `Tab`.
5. Let the user drag images onto the page (the `dragover` and `drop` events).

---

[← Back to projects](../)
