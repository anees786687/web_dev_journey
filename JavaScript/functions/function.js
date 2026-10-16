
/**
 * // DEFINING FUNCTIONS
 */
// defining a function without parameters and no return value; a function with out a specific return, returns undefined 
function doGreet(){
    console.log("Hello");
    console.log("World!")
}

// defining a function with parameters and a return value
// parameters help us customize how a function runs
function myFunc(x,y,z){
    return x+y+z;
}

function greet(name){
    return (`Hello ${name}`);
}


/**
 * // INVOKING A FUNCTION
 * To invoke a function we need the function expression which is the function name
 * followed by parentheses (), this parentheses does the calling, the name is front of it 
 * is just an expression to identify the function
 */
doGreet();

/**
 * // CALLING THE FUNCTION VS REFERENCING THE FUNCTION
 */
let sum = myFunc(1,2,3); // here we call the myFunc function with arguements which returns the sum and stores in into x
console.log(`sum: ${sum}`);

// to few arguments does not throw an error, the arguement that was not supplies is replaced by undefined
let sum_1 = myFunc(1,2); // here the third arguement is undefined
console.log(`sum_1: ${sum_1}`);
// another example is
console.log(`Passing no arguement to greet: ${greet()}`);
console.log(`Passing an arguement to greet: ${greet('Anees')}`);

// too many arguements is also not an error, the extra arguements are ignored
console.log(`Passing more than required args: ${greet('Sam','Bam')}`);

// this is just a reference to the function; here the function is not called
let sum_func = myFunc; 

console.log(`Calling function from reference: ${sum_func(4,5,6)}`); // we will have to use the reference to call the function
console.log(sum_func); // this will print the entire function
console.log(`sum: ${typeof sum}, sum_func: ${typeof sum_func}`); // both sum and sum_func are of different types

/**
 * IMMEDIATE INVOKED FUNCTION EXPRESSION
 * 
 * we can immediately invoke a function after its definition; as soon as the function is defined it can be invoked there and there
 * 
 * (function somethn (a,b){
 *  // body
 * })(a,b);
 * 
 * looks nasty but good for certain cases
 * 
 * 

    Scope: It has its own scope

    Expression: Can be convenient for computing a value as a single expression (like above)

    Async: Can be used to quickly run code in an async function (we'll cover this later)

 */

const result = (function add(a,b){
    return a + b;
})(1,2);

console.log(result);