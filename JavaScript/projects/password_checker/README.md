# Password checker

A small login form. It checks the username and password you type against a short list of users
stored in the script, and tells you whether the details are valid.

> ⚠️ **For practice only.** The usernames and passwords are in `script.js`, so anyone can read them
> in DevTools. Real logins are checked on a **server**, against passwords stored in a scrambled
> (**hashed**) form. Never put real passwords in front-end JavaScript.

## Files

| File | What it does |
|------|--------------|
| [index.html](index.html) | The login form: a username box, a password box (`type="password"`) and a Submit button. Both fields are `required` |
| [style.css](style.css) | Centres the box on the screen with Flexbox, and lines up the labels and inputs with a 2-column Grid |
| [script.js](script.js) | The array of users, and the `submit` handler that checks the details |

## How to run

Open `index.html` in a browser and try logging in. Valid logins are listed at the top of
`script.js`. For example:

| Username | Password | Result |
|----------|----------|--------|
| `abcd` | `1234` | Credentials valid! |
| `abcd` | `9999` | Invalid credentials! |
| `zzzz` | anything | Invalid credentials! (no such user) |

Open the Console (`F12`) to see whether the username was found.

## How it works

1. **The data:** `users` is an **array of objects**. Every object has the same keys
   (`username`, `password`), so the code can treat them all the same way.
2. **The event:** the script listens for the form's `submit` event and calls
   `event.preventDefault()` so the page doesn't reload. Because both inputs are `required`, the
   browser blocks an empty form before the event even fires.
3. **The search:** a `for...of` loop compares each `user.username` with what was typed. When it
   finds a match, it compares the passwords with `===` and uses `break` to stop looking.
4. **The result:** an `alert()` shows whether the login worked, then `form.reset()` clears both
   fields and `focus()` puts the cursor back in the username box.

### Why the same message for a wrong password and an unknown user?

If the page said "No such user" for one and "Wrong password" for the other, anyone could use it to
find out **which usernames exist**, and then only need to guess their passwords. Showing the same
"Invalid credentials" message for both is standard practice.

## Concepts used

- Arrays of objects, `for...of` and `break` ([3. Arrays and loops](../../seq_n_iterations/))
- `if` / `else` and strict equality `===` ([2. Conditionals](../../if_else/))
- `querySelector` / `getElementById`, the `submit` event, `preventDefault()`, `.value`, `form.reset()`
  and `focus()` ([5f. Working with form inputs](../../JS_and_DOM/working_with_inputs/))
- CSS Flexbox and Grid ([Advanced CSS](../../../Advanced_CSS/))

## Try it

1. Replace the loop with `users.find(u => u.username === userName)`, which returns the matching user or `undefined`.
2. Show the result in a `<p>` under the form instead of `alert()`, coloured green or red with `classList`.
3. Disable the Submit button after 3 failed attempts.
4. Make the username check case-insensitive with `.toLowerCase()`. Should passwords be case-insensitive too?

---

[← Back to projects](../)
