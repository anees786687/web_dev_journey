/**
 * PROJECT: Picking favourites
 * ---------------------------
 * The user ticks some programming languages and clicks "Add to favorites".
 * We then print the names of the ticked languages to the console.
 *
 * Key trick: the CSS pseudo-class :checked (see HTML_and_basic_CSS/
 * 5_pseduo_selectors.html) works inside querySelectorAll, so
 *     document.querySelectorAll('input:checked')
 * returns only the checkboxes that are ticked right now.
 *
 * HOW TO RUN: open index.html, open the Console (F12), tick a few languages
 * and click the button.
 */

function onClickButton() {
    console.log('User clicked the button');

    // Search at CLICK time, not when the page loads. Searching earlier would
    // find nothing, because no boxes are ticked when the page first opens.
    const checkedInputs = document.querySelectorAll('input:checked');

    for (const input of checkedInputs) {
        // Each <input> sits inside a <label> that also holds the language name.
        // parentNode is that <label>, and its textContent is the name.
        console.log(input.parentNode.textContent);
    }
}

const button = document.querySelector('button');
button.addEventListener('click', onClickButton);

// TRY IT:
//   - Show the favourites ON the page: add <p id="favorites"></p> to the
//     HTML and set its textContent instead of logging.
//   - Collect the names into an array with [...checkedInputs].map(...)
//     and join them with ', '.
//   - Print "No languages selected" when checkedInputs.length is 0.
