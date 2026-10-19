/**
 * TOPIC: The DOM in more depth
 * ----------------------------
 * Your .html file is only a set of instructions. The browser reads it and
 * builds a tree of element objects, the DOM, and THAT is what appears on
 * screen and what JavaScript works with.
 *
 *   HTML -> describes the starting structure
 *   CSS  -> describes how it should look
 *   JS   -> changes the DOM tree while the page is open
 *
 * The DOM and your HTML file can differ:
 *   - If the HTML has mistakes, the browser repairs them while building the
 *     tree (section 1).
 *   - Tools and browser extensions can add elements of their own. Check the
 *     Elements tab in DevTools to see the real tree.
 *
 * This file covers:
 *   1. The browser repairing broken HTML
 *   2. Guarding against null when an element might not exist
 *   3. Looping over querySelectorAll results
 *   4. Moving around the tree: parentElement, parentNode, children
 *   5. Searching inside one element
 *
 * HOW TO RUN: open index.html in a browser and open the Console (F12).
 */


// ============================================================
// 1. THE BROWSER REPAIRS BROKEN HTML
// ============================================================
// index.html has overlapping tags on purpose:
//     <p>Cook the pasta <em>until soft</p></em>
// The browser closes <em> before </p> so the tree stays valid. The repair
// is a best guess, which isn't always what you meant.
const stepPara = document.querySelector('p');

console.log(stepPara.innerHTML);                         // Cook the pasta <em>until soft</em>
console.log(stepPara.querySelector('em').innerText);     // until soft


// ============================================================
// 2. GUARD AGAINST null
// ============================================================
// querySelector returns the first match, or null when nothing matches.
// Reading a property of null crashes the script, so check first.
const dessert = document.querySelector('.dessert');   // nothing on the page has this class

if (dessert) {
    console.log(dessert.innerText);
} else {
    console.log('No dessert on this page');
}
// Shorter version with optional chaining (see the nullish_coalescing folder):
console.log(dessert?.innerText ?? 'Still no dessert');


// ============================================================
// 3. LOOPING OVER SEVERAL ELEMENTS
// ============================================================
// querySelectorAll returns a NodeList, which works with for...of.
const ingredients = document.querySelectorAll('li');

for (const ingredient of ingredients) {
    console.log(ingredient.innerText);    // Spinach, Pasta, Tomatoes, Cheese
}


// ============================================================
// 4. MOVING AROUND THE TREE
// ============================================================
// Every element knows where it sits in the tree.
//   parentElement -> the element that contains this one
//   parentNode    -> nearly always the same. They differ only at the top:
//                    for <html>, parentNode is `document`, but
//                    parentElement is null, because `document` is not an element.
console.log(stepPara.parentElement);   // <body>
console.log(stepPara.parentNode);      // <body>

// children -> only the child ELEMENTS (text and comments are skipped).
// It's an HTMLCollection: like a NodeList it has .length, indexes and works
// with for...of, but it isn't a real array.
const ingredientList = document.querySelector('ul');
console.log(ingredientList.children);              // HTMLCollection(4) [li.veg, li, li.veg, li]
console.log(ingredientList.children.length);       // 4
console.log(ingredientList.children[0].innerText); // Spinach


// ============================================================
// 5. SEARCHING INSIDE ONE ELEMENT
// ============================================================
// Every element has its own querySelector/querySelectorAll, which only look
// INSIDE that element.
console.log(ingredientList.querySelectorAll('.veg'));   // 2 matches: Spinach and Tomatoes
console.log(document.querySelectorAll('.veg'));         // 4 matches: the <a>, two <li>s and the <div>

// TRY IT: what is stepPara.parentElement.parentElement? Predict, then check.
// Then loop over document.querySelector('.recipe').children and print each
// child's tagName.
