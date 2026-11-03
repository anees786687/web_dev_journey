/**
 * Callback functions
 * - [MDN: Callback function](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function)
 * - [MDN: Arrow function expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
 * - [MDN: Function expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function)
 * - [MDN: Functions guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)
 * 
 * Events are reacted to by handing over the event listener a callback function
 * A callback function is a function that is passed to another function as an arguement
 * it a function to be "called back" when an event occurs at a later time
 * 
 * 
 * Callback function that is passed as an arguement has no parentheses () as the 
 * callback is the function object it self
 * 
 * callback() is the actual function call and it returns whatever the function returns
 * 
 * addEventListener() needs the function object so it can hold on it and call it when an event occurs 
 * if we write callback() this is calling the callback() function and the return value is passed to addEventListener 
 * since the callback has no return statement it will return undefined and that gets handed to addEventListener
 * 
 * 
 */

// we have learnt four ways to write a function

function add_1(a,b){ // mostly this is used
    return a + b;
}

const add_2 = function (a,b){
    return a + b;
}

const add_3 = (a,b)=>{ // or this is used; used directly in the event listener
    return a + b;
}

// if the whole body of the function is a single statement
// we can use an arrow function with an implicit return 
// so we can leave off the curly braces
const add_4 = (a,b) => a + b; 

/**
 * callbacks often dont need a name thus they can be anonymous function
 * since it is only used at addEventListener, naming the function is not necessary
 * 
 * All the event listener bejhave the same way
 * 
 * Use the named function when the callback is long, the callback is reused, or when the callback need to be removed from the listener
 * 
 * For callbacks that are short an inline arrow function would suffice
 */
const named = document.querySelector('#named');
const expression = document.querySelector('#expression');
const arrow = document.querySelector('#arrow');
const log = document.querySelector('#log');

function showNamed() {
  log.textContent = 'named function callback';
}

named.addEventListener('click', showNamed);

expression.addEventListener('click', function () {
  log.textContent = 'anonymous function callback';
});

arrow.addEventListener('click', () => {
  log.textContent = 'arrow function callback';
});