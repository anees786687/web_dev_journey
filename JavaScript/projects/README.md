# JavaScript projects

Small, complete pages that put the DOM and events lessons to work. Each one has its own
`index.html`, and you only need a browser to run it.

**Before starting:** work through [5. Objects, the DOM and events](../JS_and_DOM/) first. All the
projects use `querySelector` and `addEventListener`.

| Project | What it does | Concepts used |
|---------|--------------|---------------|
| [background_changer/](background_changer/) | Three buttons that change the page's background colour | `querySelector`, `classList.add` / `remove`, `addEventListener`, Flexbox layout |
| [picking_favorites/](picking_favorites/) | Tick programming languages from a list and print the chosen ones | Checkboxes and `<label>`, the `:checked` selector, `querySelectorAll`, `parentNode`, `for...of` |
| [password_checker/](password_checker/) | A login form that checks the username and password against a list of users | Arrays of objects, `for...of` with `break`, the form `submit` event, `preventDefault()`, `.value`, `form.reset()`, Flexbox + Grid |
| [img_viewer/](img_viewer/) | A big image with clickable thumbnails. Add your own pictures and remove the selected one | Event delegation with `event.target`, `createElement` / `appendChild` / `remove()`, file inputs and `URL.createObjectURL()`, the `hidden` attribute, `object-fit` |
| [todo_list/](todo_list/) | A todo list that's saved in the browser, so it survives a refresh. Add todos, mark ticked ones complete, or reset the list | `localStorage`, `JSON.stringify` / `JSON.parse`, keeping one master array in sync with storage, `createElement`, `:checked`, `Array.find()`, `setTimeout`, responsive CSS with `max-width` and `clamp()` |

## How to run

Open a project's `index.html` in a browser. Press `F12` → *Console* to see anything the
script logs.

## Share them

Every `src` and `href` in these projects is a relative path, so they keep working after you
upload them. The [GitHub Pages quickstart](https://docs.github.com/en/pages/quickstart) shows
how to put one online for free.

---

[← 8. The `this` keyword](../this_keyword/) · [Back to the JavaScript overview](../)
