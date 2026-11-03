/**
 * Events
 * 
 * [MDN: Introduction to events](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Events)
 * [MDN: Event](https://developer.mozilla.org/en-US/docs/Web/API/Event)
 * [MDN: Event reference](https://developer.mozilla.org/en-US/docs/Web/Events)
 * [MDN: EventTarget.addEventListener()](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
 * [MDN: Element click event](https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event)
 * [MDN: Element keydown event](https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event)
 * 
 * An event is a signal that something important has happened, such as:
 * - The user clicks a button.
 * - The web page finishes loading.
 * - The user presses a keyboard key down.
 * - The mouse hovers over an element.
 * - The user scrolls.
 * - The browser window is resized.
 * - Five seconds have passed.
 * 
 * Some of these events are done by the user and some are done by the browser
 * 
 * The way we react to an event is through an event listener. Event listener basically
 * listens for an event and then run a callback function which the steps to react to that event 
 * 
 * 
 * Thus two things go into the event listener:
 *  Event descriptor: describes the event, can be click, focusout, submit
 *  Callback function: the function to be called in response to an event 
 * 
 */

const changeBackground = document.querySelector('#change-background-color');
let clicked = false

/**
 * addEventListener does not do anything to the page, the browser maintains a list of event listeners
 * and our entry is added to this list; each entry pairs it with a callback
 * 
 * The listener is invisible to the user, but not to you. 
 * Open the developer tools, find the element in the Elements panel, and you will see a small **event** badge next to it. 
 * Click that badge and the browser lists every listener attached to the element, along with the function each one will call. 
 * It is the fastest way to check whether a listener you thought you added is really there.
 * 
 * The browser remembers these event listener long after the code has finished running; our code runs from 
 * top to bottom and the event listeners get registered. These event listeners are active until the page is open
 * 
 * Thus instead of coding from top to bottom we are now coding for events that can happen later and we cant predict 
 * when or if they will happen
 * 
 * A real web page has many event listeners attached to it 
 */
changeBackground.addEventListener('click',()=>{
    if(!clicked){
        clicked = true;
        document.body.style.backgroundColor = 'green';
    }
    else{
        clicked = false;
        document.body.style.backgroundColor = 'white';
    }
})