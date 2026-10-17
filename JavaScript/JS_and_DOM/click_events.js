/**
 * TOPIC: Click events (addEventListener)
 * --------------------------------------
 * To make a page interactive, we need to run code WHEN the user does
 * something, for example clicking a button.
 *
 * An EVENT LISTENER runs a function in response to an EVENT. Events can be
 * user actions (click, keydown, input...) or system events (the page
 * finishing loading). Every listener has three parts:
 *
 *   1. the ELEMENT being watched      -> the button
 *   2. the EVENT TYPE, as a string    -> 'click'
 *   3. the CALLBACK to run            -> the function that responds
 *
 *     element.addEventListener('click', callback);
 *
 * addEventListener exists on every element you get from querySelector
 * (or from looping over querySelectorAll).
 *
 * ⚠️ Pass the function, don't call it:
 *     button.addEventListener('click', callback);    // ✅ the function itself
 *     button.addEventListener('click', callback());  // ❌ calls it right now
 *
 * Remember "calling vs referencing" from functions/function.js:
 * `callback` is the function, `callback()` is its RETURN VALUE. With
 * `callback()`, the function runs once while the page loads, and its
 * return value is what gets handed to addEventListener. Our callback has
 * no `return`, so that value is `undefined`. It's as if we had written
 *     button.addEventListener('click', undefined);
 * and no listener is registered: clicking the button does nothing.
 *
 * HOW TO RUN: open index.html in a browser and click the "Click me" button
 * at the bottom of the page.
 */

// 1. Grab the elements (the <button> and <p> in the "Events" section of index.html).
const button = document.querySelector('#demo_button');
const para = document.querySelector('#demo_output');

// Remembers which style is showing, so each click can switch to the other.
// It's declared OUTSIDE the callback so its value survives between clicks.
let isRed = false;

// 2. The callback: what should happen on every click.
function callback() {
    if (!isRed) {
        isRed = true;
        console.log('Text in the p element has changed');
        para.textContent = 'this background is red';
        para.classList.add('red');            // .red and .blue_text are defined
        para.classList.remove('blue_text');   // in the <style> block of index.html
    } else {
        isRed = false;
        console.log('one more change');
        para.textContent = 'this text is blue';
        para.classList.add('blue_text');
        para.classList.remove('red');
    }
    // Removing a class the element doesn't have is harmless (no error).
}

// 3. Connect them: run `callback` every time the button is clicked.
button.addEventListener('click', callback);

// TRY IT:
//   - Change `callback` to `callback()` on the line above, reload, and click.
//     Check the Console: the message appears once on load, then never again.
//   - Use an arrow function instead of a named one:
//         button.addEventListener('click', () => console.log('clicked!'));
//   - Listen for 'dblclick' or 'mouseover' instead of 'click'.
