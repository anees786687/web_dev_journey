/**
 * TOPIC: Changing text and HTML content
 * -------------------------------------
 * An element has three properties for the content between its tags:
 *
 *   textContent -> the TEXT only. Writing to it puts in plain text.
 *   innerHTML   -> the MARKUP, tags included. Writing to it builds real elements.
 *   innerText   -> the text as it APPEARS on screen (hidden text is left out).
 *
 * This file covers:
 *   1. Reading and writing textContent (a button that toggles some text)
 *   2. innerHTML vs textContent, when reading and when writing
 *   3. Why textContent is the safer default (XSS)
 *   4. innerText vs textContent
 *
 * HOW TO RUN: open index.html in a browser, open the Console (F12), and
 * click the button.
 */


// ============================================================
// 1. READING AND WRITING textContent
// ============================================================
// Reading el.textContent gives the text inside an element.
// Assigning to it replaces that text.
const button = document.querySelector('.change_text');
const para = document.querySelector('#para');

// Remembers which text is showing, so each click switches to the other.
// It lives OUTSIDE the callback so it keeps its value between clicks.
let clicked = false;

button.addEventListener('click', () => {
    if (!clicked) {
        clicked = true;
        button.textContent = 'Click to change back to the original text';
        para.textContent = 'The text has been changed!';
    } else {
        clicked = false;
        button.textContent = 'Click to change text!';
        para.textContent = 'Original text';
    }
});


// ============================================================
// 2. innerHTML vs textContent
// ============================================================
const para2 = document.querySelector('#para_2');

// READING:
//   innerHTML   -> the markup inside the element, tags and all
//   textContent -> just the text, with the tags stripped out
console.log(para2.innerHTML);     // this is <strong>bold text</strong>
console.log(para2.textContent);   // this is bold text

// WRITING:
//   textContent treats the string as PLAIN TEXT. The < and > are shown as
//   characters, and the browser stores them as &lt; and &gt;.
para2.textContent = 'new <strong>bold text</strong>';
console.log(para2.innerHTML);     // new &lt;strong&gt;bold text&lt;/strong&gt;
// (On the page you'd see the tags as text: new <strong>bold text</strong>)

//   innerHTML PARSES the string as HTML and builds real elements from it.
para2.innerHTML = 'new <strong>bold text</strong>';
console.log(para2.innerHTML);     // new <strong>bold text</strong>
// (On the page, "bold text" is now really bold.)


// ============================================================
// 3. WHY textContent IS THE SAFER DEFAULT (XSS)
// ============================================================
// Because innerHTML turns a string into live elements, putting text from a
// user (a form, a comment, a URL) into innerHTML lets them inject their own
// HTML, including code that runs in your page. That code could, for example,
// read the visitor's login cookies and send them somewhere else. This attack
// is called CROSS-SITE SCRIPTING (XSS).
//
// Rule of thumb:
//   - Use textContent by default, and ALWAYS for text that came from a user.
//   - Use innerHTML only with markup you wrote yourself.

// Imagine this string came from a comment box:
const userComment = '<img src="x" onerror="alert(\'hacked!\')">';

const safeBox = document.querySelector('#safe_box');
safeBox.textContent = userComment;   // ✅ shown as harmless text; nothing runs
console.log(safeBox.children.length);   // 0 (no element was created)

// ⚠️ DON'T do this. It would create the <img>; the image fails to load,
// so the onerror code runs and the alert pops up:
// safeBox.innerHTML = userComment;


// ============================================================
// 4. innerText vs textContent
// ============================================================
// Both give you text, but they don't agree on WHICH text:
//   textContent -> every bit of text in the HTML, including text hidden
//                  with CSS, and the spaces/line breaks as written in the file
//   innerText   -> only the text you can SEE on screen, laid out the way
//                  it's displayed (hidden text is skipped)
// innerText needs the browser to work out the page layout first, so it is
// also slower. Prefer textContent unless you specifically want what's visible.
const para3 = document.querySelector('#para_3');

console.log(para3.textContent);   // "Visible text hidden text" (plus the spacing from the HTML file)
console.log(para3.innerText);     // "Visible text" (the hidden <span> is left out)

// TRY IT: remove style="display: none" from the <span> in index.html and
// reload. Now both properties include "hidden text".
