/**
 * Event Objects
 * 
 * - [MDN: Event](https://developer.mozilla.org/en-US/docs/Web/API/Event)
 * - [MDN: Event.target](https://developer.mozilla.org/en-US/docs/Web/API/Event/target)
 * - [MDN: MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent)
 * - [MDN: KeyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key)
 * 
 * Give more info about the event that occurred, such as if the user clicked where did they click, if the user pressed 
 * a key which key was it.
 * 
 * This information is contained in the event object, and the browser passes to the callback directly.
 * 
 * 
 * On every event object, two properties are always present
 * - `type`, the name of the event, such as `'click'`.
 * - `target`, the element the event actually happened on.
 */

/**
 * Mouse type events
 * 
 * click, moverover, mousedown and the rest deliver a mouse event
 * which carries the info of where the pointer was and what was held down
 * 
 * There are three page corrdinates which defer in where they are measured from
 *  - `clientX` and `clientY` are relative to the viewport, the visible part of the page.
 *  - `pageX` and `pageY` are relative to the whole document, regardless of how far you have scrolled.
 *  - `screenX` and `screenY` are relative to your physical screen.
 * 
 * 
 * The is also:
 * `button`, which says which mouse button was used: left, middle, or right. This has nothing to do with the HTML `<button>` element; it is an unfortunate name collision.
 * `ctrlKey`, `shiftKey`, `altKey`, and `metaKey` (Command on a Mac), each a boolean saying whether that modifier was held down at the moment of the event.

 */
const box = document.querySelector('#box');
const result = document.querySelector('#result');

box.addEventListener('click',(event)=>{
    console.log(event);
    if(result.hasAttribute('hidden')){
        result.removeAttribute('hidden')
    }
    result.textContent = `Event type: ${event.type}|
                       ClientX: ${event.clientX}|
                       PageX: ${event.pageX}|
                       shift held: ${event.shiftKey}`
})

/**
 * Keyboard Events
 * 
 * Listeners for keydown and keyup get a keyboard event instead, which has its own properties:
 * 
 * `key` is the key that was pressed, as a string: `'a'`, `'Enter'`, `'Backspace'`, `'ArrowLeft'`.
 * `repeat` is a boolean: `true` when the key is being held down and repeating, rather than freshly pressed.
 * The same `ctrlKey`, `shiftKey`, `altKey`, and `metaKey` modifiers as mouse events.
 */
const input = document.querySelector('#keyboard-event input');
const writtenText = document.querySelector('#keyboard-event p');

input.addEventListener('keydown',(event)=>{
    if(writtenText.hasAttribute('hidden')){
        writtenText.removeAttribute('hidden')
    }
    writtenText.textContent = `Key Pressed: ${event.key} | Repeat: ${event.repeat}`;
});

/**
 * Combine example
 * 
 * Change image size based on the number in the input
 * if enter is pressed in the text box then image should change its size
 * 
 * checking for invalids: number should be an integer and should be in range
 */

const img = document.querySelector('#img-size-changer img');
const sizeInput = document.querySelector('#scale-value');
const scaleButton = document.querySelector('#scale-button');
const feedback = document.querySelector('#img-size-changer p');

sizeInput.addEventListener('keydown',(event)=>{
    feedback.style.color = 'red';
    if(event.key.toLowerCase() === 'enter'){
        let size = Number(sizeInput.value);
        if(Number.isInteger(size)){
            if(size >= 200 && size <= 500){
                // scale the image
                feedback.textContent = ''
                img.style.width = `${size}px`;
            }
            else{
                feedback.textContent = 'Scaling number should be between [200,500]'
            }
        }
    }
    else{
        feedback.textContent = 'Please enter a number'
    }
})