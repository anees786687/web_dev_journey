/**
 * TOPIC: Working with form inputs
 * -------------------------------
 * Every input has a current STATE that JS can read and change:
 *   - a text box     -> the text typed in it
 *   - a <select>     -> the value of the chosen <option>
 *   - a checkbox     -> whether it's ticked
 *   - a radio button -> whether it's the selected one in its group
 *
 * The properties and methods you'll use most:
 *   el.value     -> the current value (always a string)
 *   el.checked   -> true/false: is this checkbox or radio on?
 *   el.disabled  -> true/false: is the input switched off?
 *   el.focus()   -> puts the keyboard cursor in the input
 *   el.select()  -> highlights all the text in the input
 *   form.reset() -> puts every field back to how the HTML defined it
 *
 * This file builds a "Personal Information" form: when it's submitted, it
 * collects every field into an object and logs it.
 *
 * HOW TO RUN: open index.html, open the Console (F12), fill in the form and
 * click Submit. README.md explains each idea in more detail.
 */


// ============================================================
// 1. FIND THE FORM AND ITS FIELDS
// ============================================================
// index.html loads this script with `defer`, so the form already exists.
// Without it, a <script> in <head> runs before <body> is built, and every
// lookup below would return null.

// getElementById takes the id WITHOUT '#'. The '#' belongs only in CSS
// selectors: querySelector('#personal_info') finds the same element.
const form = document.getElementById('personal_info');
console.log(form);

// The JSDoc comment below is only a hint for VS Code. getElementById can't
// know what kind of element it will find, so without the hint the editor
// won't suggest `.value`. The code runs the same with or without it.
/** @type {HTMLInputElement} */
const nameInput = document.getElementById('name');
const contactInput = document.querySelector('#contact');
const emailInput = document.getElementById('email');
const streamInput = document.getElementById('stream');


// ============================================================
// 2. HANDLE THE FORM'S 'submit' EVENT
// ============================================================
// Listen on the FORM for 'submit', not on the button for 'click':
//   click Submit -> the browser checks the fields (required, type="email",
//   pattern) -> only if they ALL pass does the form fire 'submit'.
// ⚠️ Two mistakes to avoid:
//   - submitButton.addEventListener('submit', ...) never runs, because
//     buttons don't fire 'submit'; only forms do.
//   - event.preventDefault() inside the button's 'click' handler cancels the
//     submission AND the browser's validation.
form.addEventListener('submit', (event) => {
    // By default, submitting a form reloads the page (which also clears the
    // console). preventDefault() stops that, so we can handle the data in JS.
    // Tip: tick "Preserve log" in the Console settings to keep logs across reloads.
    event.preventDefault();

    // Read the values HERE, when the form is submitted. Reading them when the
    // page loads would give empty strings, because nothing has been typed yet.
    // For the <select>, .value is the chosen <option>'s value attribute
    // (e.g. "cs"), not its visible text ("Computer Science").

    // A radio group has one <input> per option, so we look for the CHECKED
    // one in the "gender" group. querySelector('input[name="gender"]') alone
    // would always return the FIRST radio, whether it's selected or not.
    // :checked returns null when none is selected, so we fall back to ''.
    const genderInput = document.querySelector('input[name="gender"]:checked');

    const details = {
        name: nameInput.value,
        contact: contactInput.value,
        email: emailInput.value,
        stream: streamInput.value,
        gender: genderInput ? genderInput.value : '',
    };

    // Log inside the handler. A console.log outside it would run only once,
    // at page load, before anyone has submitted anything.
    console.log(details);

    // Put the cursor back in the first field, with its text highlighted,
    // ready for the next entry.
    nameInput.focus();
    nameInput.select();


    // ============================================================
    // 3. CLEARING THE FORM (optional: uncomment ONE of the options)
    // ============================================================
    // Option A: reset each field by hand.
    // nameInput.value = '';
    // contactInput.value = '';
    // emailInput.value = '';
    // streamInput.value = 'phil';   // select an <option> by setting its value
    // // A radio is selected with .checked, not .value. (Setting .value only
    // // changes the text the radio sends.) Here we turn the chosen one off:
    // if (genderInput) genderInput.checked = false;

    // Option B: form.reset() puts EVERY field back to its starting HTML state
    // in one line. Adding `checked` to a radio in the HTML would make it the
    // default that reset() returns to.
    // form.reset();
    //
    // ⚠️ form.reset and form.submit stop working if a field has the id or name
    // "reset" or "submit": form.reset would then BE that element, not the
    // method. That's why the buttons are called submit_btn and reset_btn.
    //
    // ⚠️ Don't call form.submit() here. It skips the browser's validation,
    // doesn't fire the 'submit' event, and really submits the form (reloading
    // the page).
});

// TRY IT:
//   - Set contactInput.disabled = true in the Console. Can you still type in it?
//     (A disabled field is also left out when a form is really submitted.)
//   - Leave Email empty and click Submit. The browser blocks it, and nothing is
//     logged, because 'submit' never fires.
//   - Uncomment form.reset() above and submit again.
