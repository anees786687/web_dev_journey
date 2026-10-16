/**
 * FIRST ORDER FUNCTIONS 
 * JS treats functions as values, they can be assigned to a variable, passed as an      arguement to a function or returned from a function
 *
 *  
 */

// assigning a function to a variable
const greet = (naam) => `Hello ${naam}`;

console.log(greet('Anees'))

// function in an object
const calc = {
    add: (a,b) => a + b,
    mul: (a,b) => a * b,
    sub: (a,b) => a / b,
    div: (a,b) => {
        if (b == 0){
            return Infinity;
        }

        return a / b;
    },
    mod: (a,b) => {
        if (b == 0){
            return Infinity;
        }

        return a % b;
    },
}

console.log(`add: ${calc.add(5,5)}`);
console.log(`mul: ${calc.mul(5,5)}`);
console.log(`sub: ${calc.sub(5,5)}`);
console.log(`div: ${calc.div(5,5)}`);
console.log(`mod: ${calc.mod(5,5)}`);

/**
 * HIGHER ORDER FUNCTIONS - functions that take a function as a param or returns a * * 
 * function 
 * 
 */
// passing a function as parameter
function run(task){
    task();
}
run(()=>console.log(`funception`));

// functioning returning a function; inner function remembers the variables of outer function - this is known as closure
function makeMultiplier(factor){
    return (n) => n * factor;
}

const double = makeMultiplier(2);
const triple = makeMultiplier(3);

console.log(double(5));
console.log(triple(5));

// implementing a counter using closure
function makeCounter(){
    let count = 0;
    return () => count += 1;
}

const counter = makeCounter();
console.log(`Counter 1: ${counter()}`);
console.log(`Counter 1: ${counter()}`);
console.log(`Counter 1: ${counter()}`);
console.log(`Counter 1: ${counter()}`);

// counter 2 would not be the same as counter 1
const counter_2 = makeCounter()
console.log(`Counter 2: ${counter_2()}`);
console.log(`Counter 2: ${counter_2()}`);

