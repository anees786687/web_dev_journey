# ToDo list

A todo list that remembers your todos. Type a todo and add it to the list, tick the ones you've
finished and mark them complete, or clear the whole list. Everything is saved in the browser's
`localStorage`, so the list is still there after a refresh, or after closing the browser.

## Files

| File | What it does |
|------|--------------|
| [index.html](index.html) | The page and its CSS: the numbered list, the textarea, the three buttons and a hidden message line (`#info`) |
| [script.js](script.js) | Loads the saved list, adds and completes todos, and saves every change to `localStorage` |

`login.html`, `registration.html` and `display_list.html` are empty for now.

## How to run

Open `index.html` in a browser, or use VS Code's Live Server extension.

1. Type a todo and click **Add ToDo**. Empty or spaces-only todos are ignored.
2. Tick one or more todos and click **Remove ToDo**. They turn green and lose their checkbox.
3. Refresh the page. The list, including which todos are complete, comes back.
4. **Reset ToDo list** deletes everything and starts the numbering again from 1.

To see what's saved, open DevTools (`F12`) → *Application* → *Local storage*. There are two keys:

| Key | Value |
|-----|-------|
| `todos` | The list as a JSON string, e.g. `[{"taskNo":1,"taskID":"task_1","task":"Eat","status":"incomplete"}]` |
| `task_no` | The number the next todo will get |

## How it works

1. **One master list.** `todos` is an array of objects, and it's the **single source of truth**.
   Every change goes to `todos` first, and then the whole array is saved with
   `localStorage.setItem('todos', JSON.stringify(todos))`. `localStorage` is only read once,
   when the page loads. It's a backup that survives a reload, not a second copy to edit.
2. **Loading.** `loadToDoList()` uses `JSON.parse` to turn the saved string back into an array
   (`?? []` covers the first visit, when nothing is saved yet), then draws each todo.
3. **Drawing vs adding.** `renderTodo()` only puts a todo **on the page**. `makeToDo()` draws it
   **and** adds it to `todos` and saves it. Loading uses `renderTodo()` only. If it used
   `makeToDo()`, every todo would be pushed into the array it's looping over, and the loop would
   never end.
4. **Matching checkboxes to todos.** Each todo stores a `taskID` such as `task_3`, which is also
   its checkbox's `id`. **Remove ToDo** collects the ticked boxes with `:checked`, then uses
   `todos.find(t => t.taskID === check.id)` to find each one's object and set its `status` to
   `'complete'`.

### Bugs this project ran into

| Symptom | Cause | Fix |
|---------|-------|-----|
| Chrome froze and crashed on load | Loading called `makeToDo()`, which pushed onto `todos` while `for...of` looped over it | Separate `renderTodo()` (draw only) from `makeToDo()` |
| Clicking a label didn't tick its checkbox | The `<div>` and the checkbox had the same `id`. A label's `for` uses the **first** element with that id, which was the div | Give the div its own id (`div_task_3`) |
| `taskNo` was a string (`"2"`) after a reload | `localStorage` stores everything as strings | `Number(localStorage.getItem('task_no')) \|\| 1` |
| Two todos got the same number | The counter was saved **before** `taskNo++`, so a reload reused it | Increment first, then save |
| Completed todos became incomplete again | `removeToDo()` edited a separate copy read from `localStorage`, so `todos` was out of date. The next add saved it over the changes | Edit `todos` directly |
| `:selected` threw a `SyntaxError` | There's no such selector for checkboxes | Use `:checked` |
| Remove ToDo reloaded the page | A `<button>` inside a form is `type="submit"` by default | `type="button"` |

## Concepts used

- `localStorage` (`getItem`, `setItem`, `clear`), and why it only stores strings
- `JSON.stringify` / `JSON.parse` to save and load arrays of objects
- `createElement`, `appendChild`, `setAttribute`, `textContent`, the `hidden` attribute
  ([5. Objects, the DOM and events](../../JS_and_DOM/))
- The form `submit` event and `preventDefault()` ([5f. Working with form inputs](../../JS_and_DOM/working_with_inputs/))
- The `:checked` selector, `querySelectorAll`, and `[...nodeList]` to get a real array
- `Array.find()`, `for...of` ([3. Arrays and loops](../../seq_n_iterations/))
- `??` for a default value ([6. Nullish coalescing](../../nullish_coalescing/))
- `setTimeout` to hide the message after 3 seconds
- Responsive CSS: `width: 100%` + `max-width`, `clamp()` for the label's font size, Flexbox and Grid

## Try it

1. **Reset** uses `localStorage.clear()`, which deletes *everything* saved for the page's origin.
   With Live Server, every project at `http://127.0.0.1:5500` shares that storage. Change it to
   remove only `todos` and `task_no` with `removeItem`.
2. Add a "Delete completed" button that removes complete todos from `todos` with `filter()`,
   saves, and redraws the list.
3. Let the user undo a completed todo: show its checkbox again and set `status` back to `'incomplete'`.
4. Move the CSS from `index.html` into a `style.css`, like the other projects.
5. Replace the inline `style.backgroundColor = 'lightgreen'` with a `.done` class and `classList.add`.

---

[← Back to projects](../)
