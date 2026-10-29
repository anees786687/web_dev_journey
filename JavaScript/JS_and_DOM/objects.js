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
 *   - The spread syntax {...obj} copies an object's properties (section 7).
 *   - Destructuring copies properties into variables (section 8).
 *   - bind() fixes `this` when a method is used as a callback (section 9).
 *   - A constructor function + `new` makes many objects of the same shape
 *     (section 10).
 *
 * HOW TO RUN: open index.html in a browser and open the Console (F12),
 * or run `node objects.js`.
 */


// ============================================================
// 1. CREATING AN OBJECT
// ============================================================
// `const` means the variable can't point to a different object.
// The object's properties can still be changed (see below).
// This is known as an `object literal`
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


// ============================================================
// 7. SPREAD SYNTAX ON OBJECTS
// ============================================================
// {...obj} copies all of obj's properties into a NEW object.
// The original object is not changed.
const user = { name: 'Anees', theme: 'dark' };

// Copy user's properties, then add a new one.
// (false without quotes is a boolean. 'false' in quotes would be a
// non-empty string, which is TRUTHY, so `if (user.isAdmin)` would pass!)
const updatedUser = { ...user, isAdmin: false };
console.log(user);          // { name: 'Anees', theme: 'dark' }  (unchanged)
console.log(updatedUser);   // { name: 'Anees', theme: 'dark', isAdmin: false }

// Properties are applied left to right, so anything written AFTER the
// spread overrides the copied value. This is how you "update" an object
// without modifying the original.
const user2 = { ...user, isAdmin: false, theme: 'light' };
console.log(user2);         // { name: 'Anees', theme: 'light', isAdmin: false }
// TRY IT: move `theme: 'light'` BEFORE ...user. Which theme wins now?

// ⚠️ The copy is SHALLOW: nested objects are shared, not copied.
const original = { name: 'Sam', address: { city: 'Pune' } };
const shallowCopy = { ...original };
shallowCopy.address.city = 'Delhi';
console.log(original.address.city);   // Delhi (the original changed too!)



// ============================================================
// 8. DESTRUCTURING OBJECTS
// ============================================================
// Destructuring copies properties out of an object into variables.
// Arrays are destructured by POSITION; objects are destructured by KEY NAME.
const book = {
    title: 'Clean Code',
    pages: 464
};

// The variable names must match the keys.
const { title, pages } = book;
console.log('Destructuring objects');
console.log(`title: ${title} pages: ${pages}`);                  // title: Clean Code pages: 464

// To use DIFFERENT variable names, write  key: newName
const { title: bookTitle, pages: pageCount } = book;
console.log(`Book title: ${bookTitle} Page count: ${pageCount}`);  // Clean Code, 464

// ⚠️ Common mistake: `const { bookTitle, pageCount } = book;`
// JS looks for keys called "bookTitle" and "pageCount". book has no such
// keys, so both variables are undefined (and no error is thrown).

// You can give a default for a key that might be missing.
const { language = 'English' } = book;
console.log(`language (default used): ${language}`);              // English


// ============================================================
// 9. BINDING METHODS TO OBJECTS (bind)
// ============================================================
// Inside a regular method, `this` depends on HOW the function is called,
// not on where it was written:
//   student.introduce()  -> `this` is student (the object before the dot)
//   introduce()          -> nothing before the dot, so `this` is lost
// So a method is not permanently attached to its object.
// (The this_keyword folder covers `this` in more detail.)
const student = {
    name: 'Riya',
    course: 'Web Programming',
    introduce() {
        return `I'm ${this.name} and I study ${this.course}`;
    },
};

console.log(student.introduce());   // I'm Riya and I study Web Programming

// Copy the method into a variable, then call it on its own:
const introduceAlone = student.introduce;
console.log(introduceAlone());
// -> "I'm undefined and I study undefined" (in a browser, `name` may come
//    out empty instead, because it reads the global window.name).
//    In strict mode or an ES module, `this` is undefined, so it throws:
//    TypeError: Cannot read properties of undefined (reading 'name')

// The same problem appears when a method is passed as a CALLBACK, because
// the function that receives it calls it with nothing before the dot.
function printTwice(callback) {
    console.log(callback());
    console.log(callback());
}

printTwice(student.introduce);   // ⚠️ "I'm undefined ..." twice

// Fix 1: bind() returns a NEW function whose `this` is locked to the object
// you give it, however it's called later.
const boundIntroduce = student.introduce.bind(student);
printTwice(boundIntroduce);      // I'm Riya and I study Web Programming (twice)

// Fix 2: wrap the call in an arrow function, so it's still called as
// student.introduce().
printTwice(() => student.introduce());


// ============================================================
// 10. CONSTRUCTOR FUNCTIONS (making many objects of the same shape)
// ============================================================
// Writing out an object literal for every car by hand is repetitive and
// easy to get wrong. A CONSTRUCTOR is a function that works as a blueprint:
// call it with `new` and you get a fresh object with the same properties,
// filled in with the values you pass.
// By convention, constructor names start with a CAPITAL letter.
console.log('------ Objects using constructors ------');

function Car(name, year, speed) {
    // `new` creates an empty object and makes `this` point to it.
    this.name = name;
    this.year = year;
    this.speed = speed;

    this.getDetails = function () {
        return `Car name: ${this.name}, Make year: ${this.year}, Max speed: ${this.speed}`;
    };
    // `new` returns `this` automatically, so there's no return statement.
}

const maruti = new Car('Maruti 800', 2000, 120);
const mercedes = new Car('Mercedes-Benz', 2005, 200);

console.log(maruti);                 // Car { name: 'Maruti 800', year: 2000, speed: 120, getDetails: [Function] }
console.log(maruti.getDetails());    // Car name: Maruti 800, Make year: 2000, Max speed: 120
console.log(mercedes.getDetails());  // Car name: Mercedes-Benz, Make year: 2005, Max speed: 200

// instanceof checks which constructor made an object.
console.log(maruti instanceof Car);  // true

// ⚠️ Forgetting `new`: Car runs like a normal function, `this` isn't a new
// object, and nothing is returned.
//   const oops = Car('Alto', 2010, 140);   // oops is undefined
//   (In strict mode, `this` is undefined, so it throws a TypeError instead.)

// Every Car above gets its OWN copy of getDetails, which wastes memory.
// Prototypes and the `class` syntax fix this (see ../classes/).
// TRY IT: write a Student(name, course) constructor with an introduce()
// method, and create two students.


