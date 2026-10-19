/**
 * PROJECT: Background changer
 * ---------------------------
 * Three buttons. Clicking one changes the page's background colour.
 *
 * How it works:
 *   1. Grab each button with querySelector.
 *   2. Write one function per colour. Each function puts that colour's
 *      class on <body> and removes the other two, so only one colour
 *      class is ever active.
 *   3. Connect each button to its function with addEventListener.
 *
 * The .red, .blue and .green classes are defined in style.css. JS only
 * switches classes; the actual colours stay in the CSS.
 */

// 1. Find the buttons (the classes are set in index.html).
const redButton = document.querySelector('.red_button');
const blueButton = document.querySelector('.blue_button');
const greenButton = document.querySelector('.green_button');

// 2. One function per colour.
// document.body is a shortcut for the <body> element.
function redBackground() {
    document.body.classList.add('red');
    document.body.classList.remove('blue');
    document.body.classList.remove('green');
}

function blueBackground() {
    document.body.classList.add('blue');
    document.body.classList.remove('red');
    document.body.classList.remove('green');
}

function greenBackground() {
    document.body.classList.add('green');
    document.body.classList.remove('blue');
    document.body.classList.remove('red');
}

// 3. Pass the function itself (no parentheses), so it runs on each click.
redButton.addEventListener('click', redBackground);
blueButton.addEventListener('click', blueBackground);
greenButton.addEventListener('click', greenBackground);

// TRY IT:
//   - The three functions are almost identical. Replace them with ONE
//     function that takes the colour as a parameter:
//         function setBackground(color) {
//             document.body.classList.remove('red', 'blue', 'green');  // remove() accepts several classes
//             document.body.classList.add(color);
//         }
//         redButton.addEventListener('click', () => setBackground('red'));
//     (The arrow function is needed so setBackground isn't called right away.)
//   - Add a fourth button that resets the background.
