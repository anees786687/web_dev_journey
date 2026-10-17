/**
 * TOPIC: A first look at the DOM
 * ------------------------------
 * Every element on the page is an object (see dom_n_objs.js). Here we grab
 * a few of those objects and change their properties, and the page updates.
 *
 *   document.querySelector('css selector') -> the FIRST matching element
 *   element.textContent                    -> the text inside the element
 *   element.style.<property>               -> its inline CSS (camelCase names)
 *
 * This file needs a browser: `document` doesn't exist in Node.js.
 * index.html loads it with `defer`, so it runs AFTER the HTML has been
 * parsed. Without `defer`, a script in <head> runs before <body> exists
 * and querySelector would return null.
 */

// Find the elements. The arguments are ordinary CSS selectors.
const heading = document.querySelector('#title');
const note = document.querySelector('.note');

// Each element is an object, so we can print it and inspect it.
console.log(heading);

// Change a property and the change shows up on screen immediately.
heading.textContent = 'This heading was changed by JavaScript!';

// CSS property names become camelCase: background-color -> backgroundColor
note.style.backgroundColor = 'lightyellow';
note.style.padding = '8px';


// TRY IT: in the Console, type
//     document.querySelector('#title').style.color = 'red'
// and press Enter. Then refresh the page: the change is gone, because the
// .html file on disk was never modified.
