/**
 * Timeouts and Intervals
 * 
 * - [MDN: setTimeout()](https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout)
 * - [MDN: setInterval()](https://developer.mozilla.org/en-US/docs/Web/API/Window/setInterval)
 * - [MDN: clearTimeout()](https://developer.mozilla.org/en-US/docs/Web/API/Window/clearTimeout)
 * - [MDN: clearInterval()](https://developer.mozilla.org/en-US/docs/Web/API/Window/clearInterval)
 * 
 * So far we have reacted to events that arose from what the user does.
 * But what if we want the page to reach to time passing, like do something in 5 seconds
 * or do that every 10 seconds
 * 
 * For that we got two function setTimeout and setInterval; they got things in common to addEventListener, like:
 * 
 * When to react - for a listener this was an event, and for a timer this is a delay is milliseconds
 * What to do - A callback function
 * 
 */

// setTimeout
/**
 * runs the callback once after the delay
 * 
 * the first and the third messages arrive right away once the page has loaded
 * 
 * the message in the callback arrives three seconds late. This means the script does not pause
 * and wait for the timer to get over; it registered the timer and carried out with the execution of other statements
 * 
 * One thing to notice in setTimeout is that the callback comes first and then the time in milliseconds comes afterwards
 * 
 * Use cancelTimeout(timerID) to cancel the timeout
 * 
 * timerID is returned by setTimeout, so store it in a variable if you intend to cancel the timer
 * 
 */
const button = document.querySelector('#start-timer');
const notif = document.querySelector('#notif');

button.addEventListener('click',()=>{
    notif.textContent = 'timer has started';
    setTimeout(()=>{
        notif.textContent = 'Timer is done'
    },3000);
});

// setInterval
/**
 * Has the same idea as setTimeout but setInterval runs the callback continuously after every
 * delay milliseconds and keeps on going until the page is closed
 * 
 * clearInterval(timerID) to clear Interval  
 */

const startWatch = document.querySelector('#start-watch');
const watchNotif = document.querySelector('#watch-notif');

let count = 10;
let intervalID = null;
startWatch.addEventListener('click', ()=>{
    startWatch.setAttribute('disabled', '');
    function timerCallback(){
        if(count <= 0) {
            watchNotif.textContent = 'Timer is complete'
            count = 10;
            clearInterval(intervalID);
            startWatch.removeAttribute('disabled');
            return;
        }
        watchNotif.textContent = `Time remaining: ${count} seconds`;
        count -= 1;
    }
    intervalID = setInterval(timerCallback,1000);
})


/**
 * Undoing Emails
 * 
 * Simulating undo feature of email apps - apps give a option to undo email for 3-5 seconds after send has been clicked
 */

const emailContent = document.querySelector('#email-content');
const feedback = document.querySelector('#feedback');
const send = document.querySelector('#buttons #send');
const undo = document.querySelector('#buttons #undo');

let timerID;
let intID;
let timeoutCount = 5;

function emailSent(){
    alert(`Your message has been sent`);
}
send.addEventListener('click',()=>{
    send.disabled = true;
    undo.disabled = false;

    // start the timer
    intID = setInterval(()=>{
        if(timeoutCount === 0){
            // cancel the setInterval
            clearInterval(intID);
            // send the email
            emailSent()
            // re-enable the send button
            send.disabled = false;
            // disable the undo buton
            undo.disabled = true;
            // reset counter
            timeoutCount = 5;
            // clear feeback
            feedback.textContent  = '';
            return;
        }
        feedback.textContent = `You can undo the send in ${timeoutCount--} seconds`;
    },1000);
    
});

undo.addEventListener('click',()=>{
    send.disabled = false;
    undo.disabled = true
    clearInterval(intID);
    timeoutCount = 5;
    feedback.textContent = 'Email not sent!';
    setTimeout(()=>{
        feedback.textContent = '';
    },3000);
});


