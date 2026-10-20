/**
 * TOPIC: Reading and changing HTML attributes
 * -------------------------------------------
 * Attributes are the extra settings written inside an HTML tag, such as
 * src, alt, width, id and disabled in <img src="cat.jpg" width="200">.
 * They control what an element shows and how it behaves, and JS can
 * change them while the page is open.
 *
 * Every element has four methods for working with attributes:
 *   el.getAttribute(name)          -> the attribute's value, ALWAYS a string
 *                                     (or null if the attribute isn't there)
 *   el.setAttribute(name, value)   -> adds the attribute, or changes it if it exists
 *   el.hasAttribute(name)          -> true or false: is the attribute there?
 *   el.removeAttribute(name)       -> deletes the attribute completely
 *
 * This file covers:
 *   1. Reading attributes (and why the value is always a string)
 *   2. Changing a numeric attribute: an "Enlarge" button
 *   3. Boolean attributes: disabling and re-enabling a button
 *   4. Swapping an image by changing src (and alt)
 *
 * HOW TO RUN: open index.html in a browser, open the Console (F12), and
 * click the buttons.
 */


// ============================================================
// 1. READING ATTRIBUTES
// ============================================================
const image = document.querySelector('#pet');

console.log(image.getAttribute('id'));     // pet
console.log(image.hasAttribute('alt'));    // true
console.log(image.getAttribute('alt'));    // A cat
console.log(image.getAttribute('title'));  // null (this attribute isn't set)

// getAttribute ALWAYS returns a string, even for a value that looks like a number.
console.log(typeof image.getAttribute('width'));   // string
// ⚠️ So + joins strings instead of adding numbers:
console.log(image.getAttribute('width') + 10);     // 20010, not 210

// To do maths, convert the string to a number first.
// parseInt(text, 10) reads a whole number in base 10. Number(text) also works.
console.log(parseInt(image.getAttribute('width'), 10) + 10);   // 210


// ============================================================
// 2. CHANGING A NUMERIC ATTRIBUTE: THE ENLARGE BUTTON
// ============================================================
// Each click makes the image 100px wider, up to MAX_WIDTH.
const START_WIDTH = 200;
const MAX_WIDTH = 500;
const enlargeButton = document.querySelector('#enlarge');

enlargeButton.addEventListener('click', () => {
    // Read the CURRENT width from the attribute every time, so the page itself
    // is the single source of truth.
    const currentWidth = parseInt(image.getAttribute('width'), 10);
    const newWidth = currentWidth + 100;

    image.setAttribute('width', newWidth);   // the number becomes the string "300", "400", ...
    console.log(`Width is now ${image.getAttribute('width')}`);

    // ============================================================
    // 3. BOOLEAN ATTRIBUTES: disabled
    // ============================================================
    // `disabled` is a BOOLEAN attribute: only its PRESENCE matters, and its
    // value is ignored. So:
    //   setAttribute('disabled', '')      -> disabled
    //   setAttribute('disabled', 'false') -> STILL disabled! ⚠️
    //   removeAttribute('disabled')       -> the only way to enable it again
    if (newWidth >= MAX_WIDTH) {
        enlargeButton.setAttribute('disabled', '');
        enlargeButton.textContent = 'Maximum size reached';
    }
});

// The reset button shrinks the image again and re-enables the enlarge button.
const resetButton = document.querySelector('#reset');

resetButton.addEventListener('click', () => {
    image.setAttribute('width', START_WIDTH);

    if (enlargeButton.hasAttribute('disabled')) {
        enlargeButton.removeAttribute('disabled');
        enlargeButton.textContent = 'Click to enlarge image';
    }
});


// ============================================================
// 4. SWAPPING AN IMAGE: src and alt
// ============================================================
// Changing src makes the browser load and show a different picture.
// Update alt at the same time: screen readers read it aloud, and it's shown
// if the image fails to load, so it should always describe what's on screen.
const animalButton = document.querySelector('#swap_animal');

animalButton.addEventListener('click', () => {
    // getAttribute('src') gives back exactly what's written in the HTML
    // ("cat.jpg"). The PROPERTY image.src gives the full URL instead
    // (file:///.../cat.jpg), so the attribute is easier to compare.
    if (image.getAttribute('src') === 'cat.jpg') {
        image.setAttribute('src', 'puppy.jpg');
        image.setAttribute('alt', 'A puppy');
        animalButton.textContent = 'Click to see a cat';
    } else {
        image.setAttribute('src', 'cat.jpg');
        image.setAttribute('alt', 'A cat');
        animalButton.textContent = 'Click to see a dog';
    }
});

// TRY IT:
//   - In the Console, compare image.getAttribute('src') with image.src.
//   - Add a title attribute to the image with setAttribute, then hover over it.
//   - Make a "Shrink" button that takes 100px off, stopping at 100px.
