/**
 * TOPIC: A first look at the DOM
 * ------------------------------
 * Every element on the page is an object (see objects.js). The browser
 * gives us a few built-in objects to reach them:
 *
 *   window    -> the browser window/tab. The GLOBAL object of the page.
 *   document  -> the HTML page loaded in that window (window.document).
 *                This is the entry point to the DOM.
 *   elements  -> found through document, e.g. document.querySelector(...)
 *
 * This file covers:
 *   1. The window object (properties and built-in methods)
 *   2. The document object
 *   3. Finding elements and changing them
 *   4. Reaching the DOM: querySelector vs querySelectorAll, NodeLists,
 *      reading content, attributes and classes
 *
 * This file needs a browser: `window` and `document` don't exist in Node.js.
 * index.html loads it with `defer`, so it runs AFTER the HTML has been
 * parsed. Without `defer`, a script in <head> runs before <body> exists
 * and querySelector would return null.
 */


// ============================================================
// 1. THE WINDOW OBJECT
// ============================================================
// `window` represents the browser window itself. It is the GLOBAL object:
// every global variable and function (console, alert, prompt, document...)
// is a property of window. That's why the `window.` prefix is optional.

// A few of its properties:
console.log(window.innerWidth);   // width of the visible page area, in pixels
console.log(innerHeight);         // same as window.innerHeight (prefix left out)
console.log(location.href);       // the current URL, as a string

// Some built-in methods. Both pause the page until the user responds.
//   prompt(message) -> shows an input box and RETURNS what the user typed
//                      (always a string), or null if they press Cancel
//   alert(message)  -> shows a message with an OK button; returns nothing
// const userName = prompt('Enter your name!');
// alert(`Hello ${userName}`);
// ⚠️ Avoid naming this variable `name`: `window.name` already exists, and
// a global `name` would shadow it, which is confusing.
// The two lines above are commented out so the page doesn't pop up a
// dialog on every refresh.
// TRY IT: uncomment them and press Cancel in the prompt. What does the alert
// say? (Fix it with ?? from the nullish_coalescing folder: userName ?? 'Guest'.)


// ============================================================
// 2. THE DOCUMENT OBJECT
// ============================================================
// window.document represents the whole HTML page currently loaded.
// Like everything else on window, you can just write `document`.
// MORE ON THIS LATER!
console.log(document);   // logs the live object: click the arrow in DevTools to explore it

// Inside a template literal an object is turned into a string, so it
// only prints its type: "[object HTMLDocument]".
console.log(`document: ${document}`);
console.log(`window.document: ${window.document}`);
console.log(`document === window.document: ${document === window.document}`);   // true


// ============================================================
// 3. FINDING ELEMENTS AND CHANGING THEM
// ============================================================
//   document.querySelector('css selector') -> the FIRST matching element
//   element.textContent                    -> the text inside the element
//   element.style.<property>               -> its inline CSS (camelCase names)

// The arguments are ordinary CSS selectors: #id and .class
const heading = document.querySelector('#title');
const note = document.querySelector('.note');

// Each element is an object, so we can print it and inspect it.
console.log(heading);

// Change a property and the change shows up on screen immediately.
heading.textContent = 'This heading was changed by JavaScript!';
note.textContent = `Hello World!, this paragraph was changed too.`;

// CSS property names become camelCase: background-color -> backgroundColor
note.style.backgroundColor = 'lightyellow';
note.style.padding = '8px';

// TRY IT: in the Console, type
//     document.querySelector('#title').style.color = 'red'
// and press Enter. Then refresh the page: the change is gone, because the
// .html file on disk was never modified.


// ============================================================
// 4. REACHING THE DOM: querySelector vs querySelectorAll
// ============================================================
//   querySelector(sel)    -> the FIRST matching element, or null if none
//   querySelectorAll(sel) -> a NodeList of ALL matches (empty if none)
// Both take any CSS selector, exactly like in a stylesheet.
// The elements used below are in the "Fruit" section of index.html.

console.log(document.querySelector('p.box').innerText);             // "A paragraph in a box."
// The first .highlight on the page is the <p>, not one of the <li>s.
console.log(document.querySelector('.highlight').innerText);        // "A highlighted paragraph"
console.log(document.querySelectorAll('.highlight').length);        // 3 (the <p> and two <li>s)
// A descendant selector narrows the search: only .highlight INSIDE a <ul>.
console.log(document.querySelectorAll('ul .highlight').length);     // 2

// Every ELEMENT also has querySelector/querySelectorAll. Called on an
// element, they only search INSIDE that element.
const list = document.querySelector('#list');
const highlightedItems = list.querySelectorAll('.highlight');       // the two <li>s only

// A NodeList is "array-like": it has .length, indexes ([0]) and works
// with for...of, but it is NOT a real array (no .map or .filter).
// Use [...nodeList] or Array.from(nodeList) when you need array methods.
for (const item of highlightedItems) {
    console.log(`Highlighted: ${item.innerText}`);                  // Second item, Fourth item
}

// What each method returns
console.log(document.querySelector('.highlight'));     // a single element
console.log(document.querySelectorAll('.highlight'));  // NodeList(3) [p.highlight, li.highlight, li.highlight]

// When nothing matches
console.log(document.querySelector('.x'));             // null
console.log(document.querySelectorAll('.x'));          // NodeList [] (empty, length 0)
// ⚠️ Calling a property on null crashes:
//     document.querySelector('.x').innerText -> TypeError
// Check the result first (if (el) {...}) or use optional chaining: el?.innerText


// ------------------------------------------------------------
// Reading and changing an element you've found
// ------------------------------------------------------------
// `heading` is the #title <h1> we grabbed in section 3.
console.log(heading);

// innerHTML -> the HTML inside the element, tags included (as a string)
// innerText -> only the visible text, tags removed
// (textContent, used in section 3, is similar to innerText but also
//  includes hidden text and doesn't depend on CSS)
console.log(heading.innerHTML);
console.log(heading.innerText);

// setAttribute(name, value) adds or changes any HTML attribute.
// getAttribute(name) reads one.
heading.setAttribute('id', 'some_value');
console.log(heading);                          // <h1 id="some_value" class="red">...
console.log(heading.getAttribute('id'));       // some_value
// ⚠️ After this, document.querySelector('#title') returns null, because no
// element has id="title" any more. Our `heading` variable still works: it
// holds the element object itself, not the selector.

// classList holds the element's classes (a DOMTokenList) and has methods
// to change them. The .red and .blue_text classes are defined in the
// <style> block of index.html.
console.log(heading.classList);                // DOMTokenList ['red']
heading.classList.add('blue_text');            // add a class    -> ['red', 'blue_text']
console.log(heading.classList);
heading.classList.remove('red');               // remove a class -> ['blue_text']
heading.classList.toggle('blue_text');         // toggle: removes it if present, adds it if not -> []
console.log(heading.classList);
// Changing classes is usually better than setting element.style directly:
// the CSS stays in the stylesheet, and JS just switches classes on and off.
// TRY IT: call heading.classList.toggle('blue_text') once more in the Console.
