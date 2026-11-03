/**
 * Removing an event listener 
 * 
 * - [MDN: EventTarget.removeEventListener()](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener)
 * - [MDN: EventTarget.addEventListener()](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
 * - [MDN: Element mousedown event](https://developer.mozilla.org/en-US/docs/Web/API/Element/mousedown_event)
 * - [MDN: CSS position](https://developer.mozilla.org/en-US/docs/Web/CSS/position)
 * 
 * Just like we can add an event listener, we can remove one by using 
 * removeEventListener which mirrors the addEventListener method
 * 
 * the method removeEventListener uses the function object to remove the 
 * event listener from the particular element
 */

// example
const button = document.querySelector('button');
const para = document.querySelector('p');

/**
 * the method removeEventListener takes the existing function object
 * and removes it from the event listener list. So even if two functions
 * have the same content but different name, the browser will look for the function
 * name that is attached to the event listener.
 * 
 * Furthermore, this method does not work with inline function as
 * when we call addEventListener('click',()=>{}) and pass an inline function
 * a new function object is created, and when we call removeEventListener('click',()=>{})
 * even here a new function object is created. Thus, these arent the same function object;
 * hence, it is best to avoid inline arrow functions if we intend to remove the event listener
 * down the line
 * 
*/
function clickMe(){
    para.textContent = 'Clicked me!'
}


button.addEventListener('click', clickMe);
button.removeEventListener('click',clickMe); // nothing will happen when the button is clicked

/**
 * Worked Example: Dragging
 * 
 * in real world when we want to deag a block around we use the concept of draggin where
 * the user clicks on a block and the block follows the pointer until the mouse button is held
 * 
 * Two things to points out are:
 * 1. `position: absolute` in the CSS is what lets us place the block anywhere on the page by setting `left` and `top`. 
 *     Without it, those properties would have no effect.
 * 2. `mouseup` is on the `window`, not on the block. That is deliberate. 
 *     While dragging quickly, the block lags slightly behind the pointer, so when the user lets go, the pointer may not be over the block at all. 
 *     A `mouseup` listener on the block would miss that release and the block would keep following the pointer forever. 
 *     Listening on the window catches the release wherever it happens.
 * There is plenty this example does not handle. Most visibly, the block always jumps so its top-left corner is under the pointer, rather than staying where you grabbed it. 
 * The point here is the add-then-remove pattern, which is what makes a drag a drag.
 */

const block = document.querySelector('#block');
const blockStyle = window.getComputedStyle(block);
console.log(blockStyle.getPropertyValue('left'), blockStyle.getPropertyValue('top'));
function moveBlock(event){
    block.style.left = event.pageX + 'px';
    block.style.top = event.pageY + 'px';
    
}

// add 
function onMouseClick(event){

    window.addEventListener('mousemove',moveBlock);
}

// then remove
function onMouseLeave(){
    window.removeEventListener('mousemove',moveBlock);
}


// `click` will only register the event listener, cuz of this the block follows the pointer permanently
// `mousedown` only fires the event when the mouse button is pressed
block.addEventListener('mousedown', onMouseClick); // add
window.addEventListener('mouseup',onMouseLeave); // then remove