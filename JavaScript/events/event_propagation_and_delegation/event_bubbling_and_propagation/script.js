/**
 * Event propagation and bubbling
 * 
 *  See diagrams: ./capture-bubbling-dom.png, ./capture-bubbling-elements.png
 * 
 * - [MDN: Event bubbling and capture](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Event_bubbling)
 * - [MDN: Event.target](https://developer.mozilla.org/en-US/docs/Web/API/Event/target)
 * - [MDN: Event.currentTarget](https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget)
 * - [MDN: addEventListener() options](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#options)
 * 
 * The event listener we attached to the element does not only stay at the element but it travels and listeners
 * anywhere along this path will run as well
 * 
 * 
 * 
 * 
 * Consider the following HTML code
 * <div id="outer">
        <div id="inner">
            <button>Click Me!</button>
            <button>No event listner here!</button>
        </div>
    </div>
 *
 * When the user clicks the button the event does not straight go to the button element. It travels down from
 * the window through <html>, outer div, inner div and then reaches the button element.
 * Then the event turns around and travels up from button, through inner div, outer div, <html>, and finally to the window
 * 
 * The downward journey from root to the element which generated the event is called the capture phase
 * and the journey from the element from which the event arose and moves up to the root is called the bubbling phase
 * 
 * By default, the path is set to bubbling when we addEventListener to an element. We can change this to the capture phase by setting 
 * the third parameter of addEventListener(event,callback,useCapture) to true.
 * 
 * 
 * Lets attach a few event listeners to the elements
 */


// const outer = document.querySelector('#outer');
// const inner = document.querySelector('#inner');
// const button = document.querySelector('#btn');

// outer.addEventListener('click', () => console.log('outer capture'), true);
// inner.addEventListener('click', () => console.log('inner capture'), true);
// button.addEventListener('click', () => console.log('button capture'), true);

// outer.addEventListener('click', () => console.log('outer bubbling'));
// inner.addEventListener('click', () => console.log('inner bubbling'));
// button.addEventListener('click', () => console.log('button bubbling'));

/**
 * The output for the above would be 
 * outer capture
 * inner capture
 * button capture
 * button bubbling
 * inner bubbling
 * outer bubbling
 * 
 * 
 * 
 * Furthermore, the element clicked does not need to have a listener of it own. Clicking any element inside an element to which a listener is attached will trigger
 * the event listener and the event will travel the same path. If we click the `No event listner here!` button we get the following output
 * 
 * outer capture
 * inner capture
 * inner bubbling
 * outer bubbling
 * 
 * For a clearer example, consider the following
 */

outer.addEventListener('click', (event) => {
    console.log(event.srcElement.innerText);
});

/**
 * There is one listener here, on the outer div. Click the button, the inner div, or the outer div, and it runs every time, reporting a different `event.target` each time. 
 * This is why `event.target` matters: it is the element that was actually clicked, which is often not the element the listener is attached to.
 * 
 * That property is the foundation of a technique called event delegation.
 * Where one listener on a container handles clicks on all of its children, including children added later.
 */

