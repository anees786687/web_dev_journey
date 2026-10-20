/**
 * TOPIC: Changing an element's classes with classList
 * ---------------------------------------------------
 * Every element has a `classList` property for managing the CSS classes on
 * it. Its most useful methods:
 *
 *   el.classList.add('x')          -> adds the class
 *   el.classList.remove('x')       -> removes the class
 *   el.classList.contains('x')     -> true if the element has the class, else false
 *   el.classList.toggle('x')       -> removes it if present, adds it if not
 *   el.classList.toggle('x', bool) -> adds it if bool is true, removes it if false
 *
 * This is the usual way to make a page dynamic: the CSS describes how each
 * class LOOKS, and JS decides which elements HAVE which classes right now.
 * (Here, `.selected` in index.html gives an item a yellow background.)
 *
 * The file builds the same feature step by step, from "select one item"
 * to "only one item can be selected at a time". Each step is a function,
 * and only the step chosen in DEMO runs, so the steps don't interfere.
 *
 * HOW TO RUN: open index.html in a browser and click the items.
 * TRY IT: change DEMO to 1, 2, 3, 4 or 5, save, and reload the page.
 */

const DEMO = 5;


// ============================================================
// 1. CHECK FOR A CLASS, THEN ADD IT
// ============================================================
// querySelector returns the FIRST .item ("Item 1").
function demo1() {
    const listItem = document.querySelector('.item');
    console.log(listItem.classList.contains('selected'));   // false

    // add() doesn't create duplicates, so the `if` isn't strictly needed.
    // It's here to show contains() in action.
    if (!listItem.classList.contains('selected')) {
        listItem.classList.add('selected');
    }
    console.log(listItem.classList.contains('selected'));   // true: Item 1 turns yellow
}


// ============================================================
// 2. ADD OR REMOVE IT ON EACH CLICK (one item)
// ============================================================
// Clicking Item 1 switches it between selected and not selected.
// The other items don't react yet: only Item 1 has a listener.
function demo2() {
    const listItem = document.querySelector('.item');

    listItem.addEventListener('click', () => {
        if (!listItem.classList.contains('selected')) {
            listItem.classList.add('selected');
        } else {
            listItem.classList.remove('selected');
        }
    });
}


// ============================================================
// 3. THE SAME FOR EVERY ITEM
// ============================================================
// querySelectorAll finds ALL the items, and the loop gives each one its own
// listener. Inside the arrow function, `listItem` is that loop's item, so each
// listener changes only the item that was clicked.
function demo3() {
    const list = document.querySelectorAll('.item');

    for (const listItem of list) {
        listItem.addEventListener('click', () => {
            if (!listItem.classList.contains('selected')) {
                listItem.classList.add('selected');
            } else {
                listItem.classList.remove('selected');
            }
        });
    }
}


// ============================================================
// 4. SHORTCUT: toggle()
// ============================================================
// toggle('selected') does the whole if/else from step 3 in one call:
// it removes the class if it's there, and adds it if it isn't.
function demo4() {
    const items = document.querySelectorAll('.item');

    for (const item of items) {
        item.addEventListener('click', () => {
            item.classList.toggle('selected');
        });
    }
}


// ============================================================
// 5. ONLY ONE ITEM SELECTED AT A TIME: toggle(class, force)
// ============================================================
// toggle() takes an optional second argument, a boolean called `force`:
//   true  -> always ADD the class
//   false -> always REMOVE the class
// Passing a comparison as `force` lets one line decide add OR remove.
//
// On every click we loop over ALL the items. `other === item` is true only
// for the item that was clicked, so that one gets .selected and every other
// item loses it. It works like radio buttons: exactly one stays highlighted.
function demo5() {
    const items = document.querySelectorAll('.item');

    for (const item of items) {
        item.addEventListener('click', () => {
            console.log(`Selected: ${item.textContent}`);
            for (const other of items) {
                other.classList.toggle('selected', other === item);
            }
        });
    }
    // Clicking the item that's already selected keeps it selected, because
    // `other === item` is still true for it.
}


// Run only the step chosen at the top of the file.
const demos = [demo1, demo2, demo3, demo4, demo5];
demos[DEMO - 1]();
