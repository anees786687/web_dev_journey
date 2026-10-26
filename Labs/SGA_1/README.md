# SGA 1: Student App & ID Card

A student registration form that validates each field when you leave it (`focusout`), saves the student as a cookie, and lets you look them up again by mobile number.

- `StudentApp.html` / `StudentApp.js`: first version
- `stud_app_2.js`: my rewrite from scratch
- `IDCard.html` / `IDCard_styles.css`: ID card layout

## Learnings

### 1. Event delegation

Instead of adding the same kind of listener to every input, add **one** listener to a parent and check which child the event came from.

This works because most events **bubble**: an event on an `<input>` travels up to its `<div>`, then the `<form>`, then `document`.

```js
const rules = {
    name:          { pattern: /^[a-zA-Z ]+$/ },
    mobile_number: { pattern: /^[1-9][0-9]{9}$/ },
    email_id:      { pattern: /^[^@]+@[^@]+\.(com|in)$/ },
};

document.querySelector('form').addEventListener('focusout', (event) => {
    let input = event.target;            // the input that actually lost focus
    let rule = rules[input.id];
    if(!rule) return;                    // not a field we care about

    let valid = rule.pattern.test(input.value.trim());
    let notif = input.nextElementSibling; // the <p> right after the input
    // ...show message
});
```

- `event.target` is the element where the event **started** (the `<input>`).
- `event.currentTarget` is the element whose listener is **running** (the `<form>`).
- `focusout` bubbles, but `blur` **doesn't**, so delegation only works with `focusout`. The same goes for `focusin` vs `focus`.
- Only delegate handlers that really are the same. DOB has its own logic (date check and age), so it keeps its own listener.

### 2. `every()`

`array.every(fn)` returns `true` only if `fn` returns `true` for **every** item. It stops at the first `false`.

```js
let notifs = document.querySelectorAll('.input_n_warning p');
let allValid = [...notifs].every(p => p.classList.contains('green'));
submitButton.disabled = !allValid;
```

- `querySelectorAll` returns a **NodeList**, not an array. NodeList has `forEach`, but not `every`, `map` or `filter`, so spread it into an array first with `[...notifs]`.
- `some()` is the opposite: `true` if **at least one** item passes.
- `every()` on an empty array returns `true`.
- Set `disabled = !allValid` instead of only removing the attribute when the form is valid. Otherwise the button stays enabled after a field becomes invalid again.

### 3. `test()` vs `match()`

| | `regex.test(str)` | `str.match(regex)` |
|---|---|---|
| Called on | the **regex** | the **string** |
| Returns | `true` / `false` | an array of matches, or `null` |
| Use when | you only need a yes/no | you need the **parts** that matched |

```js
// test: is it valid? yes/no
/^[1-9][0-9]{9}$/.test(mobileInput.value);   // true

// match: I need the pieces
let match = '05/08/2004'.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
// match[0] = '05/08/2004'  (whole match)
// match[1] = '05'          (1st capture group: day)
// match[2] = '08'          (2nd: month)
// match[3] = '2004'        (3rd: year)
```

- The `( )` in a regex are **capture groups**, and each one becomes `match[1]`, `match[2]` and so on.
- `match()` returns `null` on failure, so `if(!match)` checks validity, and if it passed you have the parts too.
- The pieces are strings, so convert them with `Number(match[1])`.
- `^` and `$` anchor the pattern to the start and end. Without them, `/\d{10}/` would also accept `abc1234567890xyz`.
- Watch for typos in ranges: `[A-z]` is **not** the same as `[A-Za-z]`. It also lets in `[ \ ] ^ _` and the backtick.

**Related: checking a real date.** The regex only checks the *format*. `new Date()` silently rolls over impossible dates (`31/02` becomes `03/03`), so build the date and check that it didn't change:

```js
let d = new Date(year, month - 1, day);   // months are 0-based!
if(d.getDate() !== day || d.getMonth() + 1 !== month) { /* invalid */ }
```

### 4. Adding and reading cookies

`document.cookie` is unusual: **writing** to it adds or updates *one* cookie, but **reading** it gives back *all* cookies as one string.

**Writing:**
```js
document.cookie = 'student_' + student.mobile + '='
                + encodeURIComponent(JSON.stringify(student))
                + '; max-age=86400; path=/';
```
- Format: `name=value; option; option`
- Cookies only store **strings**, so turn the object into a string with `JSON.stringify`.
- `encodeURIComponent` escapes characters like `;`, `,` and spaces that would break the cookie format.
- `max-age=86400` keeps the cookie for 1 day (in seconds). Without it, the cookie is deleted when the browser closes.
- `path=/` makes the cookie visible to every page on the site.
- To delete a cookie, write it again with `max-age=0`.

**Reading:**
```js
// document.cookie looks like: "student_9876543210=%7B...%7D; theme=dark"
function getCookie(name) {
    for(let cookie of document.cookie.split('; ')){
        let [key, value] = cookie.split('=');   // array destructuring
        if(key === name) return decodeURIComponent(value);
    }
    return null;
}

let student = JSON.parse(getCookie('student_9876543210'));
```
- Reading reverses writing: split, then `decodeURIComponent`, then `JSON.parse`.
- `let [key, value] = ...` is **array destructuring**: it puts the first item in `key` and the second in `value`.
- You can check cookies in DevTools under **Application → Cookies**.
- Cookies are sent to the server with every request, and each one is limited to about 4KB. For data that only the page needs, `localStorage` is simpler: `localStorage.setItem(key, value)` and `localStorage.getItem(key)`.

## Other small things
- `.value` is for inputs and `.textContent` is for normal elements like `<p>` and `<span>`. Setting `input.textContent = ''` does nothing.
- `event.preventDefault()` on submit stops the page from reloading, which would wipe everything.
- `classList.toggle('red', condition)` adds the class if `condition` is true and removes it if false. It saves writing an `if/else`.
