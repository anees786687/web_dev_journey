/**
 * Common event types
 * 
 * There are far more event listeners than 'click'. It is impossible to memorize them but below
 * are the few important ones
 *  
 * Mouse Events
 * - `click`: the user clicks the element.
 * - `dblclick`: the user double-clicks it.
 * - `mousedown`: the user presses the mouse button down.
 * - `mouseup`: the user releases it.
 * - `mousemove`: the pointer moves within the element.
 * - `mouseenter` and `mouseleave`: the pointer moves onto, or off, the element.
 * - `mouseover` and `mouseout`: also fired when the pointer moves onto, or off, the element.
 * 
 * Keyboard events
 * - `keydown`: the user presses a key down.
 * - `keyup`: the user releases it.
 * - `keypress`: both together. This one is deprecated; use `keydown`.
 * - `input` : user has types in input box
 * 
 * Window and Browser events
 * - `load`: the page, or a particular resource, has finished loading.
 * - `resize`: the browser window has been resized.
 * - `scroll`: the user has scrolled.
 * - `beforeunload`: fired just *before* the user leaves the page. This is how a page warns you that you have unsaved changes.
 */
const input = document.querySelector('input');
const button = document.querySelector('button');
const img = document.querySelector('img');
const preview = document.querySelector('p');

// changing the background color
window.addEventListener('mousedown',()=>{
  document.body.style.backgroundColor = 'green';
});

window.addEventListener('mouseup',()=>{
  document.body.style.backgroundColor = 'white';
});

input.addEventListener('input',()=>{
  console.log('key pressed');
  preview.textContent = input.value;
})

button.addEventListener('dblclick',()=>{
  input.value = '';
  preview.textContent = '';
})

// load event works on the window and on a prticular element such as an image
window.addEventListener('load',()=>{
  console.log('Page loaded')
})

// adding a load event to an image
// on a fast internet this event will get triggered immediately
// but on a slow internert this will take time, to emulate this
// open dev tools, click `disable cache` and change `throttling` from 
// `no throttling` to 3G or something slower
img.addEventListener('load',()=>{
  console.log('image loaded');
})


// adding a scroll event to the window
window.addEventListener('scroll',()=>{
  console.log(window.scrollY)
})

// prompt user when user closes page
window.addEventListener('beforeunload',(event)=>{
  /**
   * 
    Critical Modern Constraints

    1.Custom text is no longer supported: You cannot customize the message shown to the user (e.g., "Are you sure you want to leave your shopping cart?"). 
      Modern browsers completely ignore custom strings to prevent scammers from trapping users. 
      The browser will display its own generic message (e.g., "Changes you made may not be saved.").
    2.User interaction required: The browser will completely ignore the beforeunload dialog unless the user has interacted with the page first (clicked, typed, etc.).
    3.No heavy logic: You cannot perform asynchronous tasks (like fetch() requests) inside this event. 
      If you need to save data to a server right as the user leaves, use navigator.sendBeacon() instead.
  */
  event.preventDefault();
  alert('You leaving bruh!');
})