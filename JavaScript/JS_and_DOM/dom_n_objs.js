/**
 * TOPIC: JavaScript objects (and why they matter for the DOM)
 * ----------------------------------------------------------
 * WHAT IS THE DOM?
 *   When the browser loads a page, it parses the HTML and builds a TREE of
 *   OBJECTS from it, one object per element. That tree is the DOM:
 *
 *     Document -> the page itself
 *     Object   -> each element, as a JS object whose properties you can
 *                 read and change (text, attributes, styles...)
 *     Model    -> the tree structure that connects them
 *
 *   When JS changes one of these objects, the page on screen updates.
 *   The .html file on disk stays the same. Styles are objects too
 *   (element.style), so JS can change CSS as well.
 *
 *   Because every element is an object, you need to understand OBJECTS
 *   first. That's what this file covers. dom_basics.js then puts it to use.
 *
 * JS OBJECTS
 *   - An object groups related data and behaviour in one place. Objects are
 *     the most important building block in JS.
 *   - An object is a collection of KEY: VALUE pairs, like a dictionary.
 *     Keys are strings, values can be anything (numbers, strings, arrays,
 *     other objects, functions).
 *   - Each key: value pair is a PROPERTY. Properties are separated by commas.
 *   - A function stored as a property is called a METHOD.
 *
 * HOW TO RUN: open index.html in a browser and open the Console (F12),
 * or run `node dom_n_objs.js`.
 */


// ============================================================
// 1. CREATING AN OBJECT
// ============================================================
// `const` means the variable can't point to a different object.
// The object's properties can still be changed (see below).
const person = {
    name: 'Anees',
    age: 34
};

console.log(person);


// ============================================================
// 2. READING PROPERTIES
// ============================================================
console.log(`Name: ${person.name}`);     // dot notation (most common)
console.log(`Age: ${person['age']}`);    // bracket notation (needed when the key is in a variable)

// Reading a property that doesn't exist gives undefined (no error).
console.log(`Address: ${person.address}`);   // undefined


// ============================================================
// 3. ADDING, EDITING AND DELETING PROPERTIES
// ============================================================
person.address = 'Andheri, Mumbai';           // add
console.log(`Address: ${person.address}`);

person.name = 'Anees Alwani';                 // edit
console.log(`Name: ${person.name}`);

delete person.address;                        // delete
console.log(`Address after delete: ${person.address}`);   // undefined


// ============================================================
// 4. METHODS (functions stored on an object)
// ============================================================
person.greet = function () {
    // Inside a regular function used as a method, `this` is the object
    // the method was called on (here: person).
    console.log(`Hi, I'm ${this.name}`);
};
person.greet();


// ============================================================
// 5. NESTED OBJECTS (an object as a property value)
// ============================================================
person.address = {
    district: 'Andheri',
    city: 'Mumbai'
};

// Chain the dots to go deeper.
console.log(`District: ${person.address.district} City: ${person.address.city}`);


// ============================================================
// 6. AN ARRAY OF OBJECTS
// ============================================================
// A very common shape for real data (for example, a list of products from an API).
const itemArray = [
    { name: 'Pen', price: 10 },
    { name: 'Pencil', price: 5 },
    { name: 'Book', price: 25 },
];

// for...of gives you each object in turn.
for (const item of itemArray) {
    console.log(`Item: ${item.name} Price: ${item.price}`);
}
