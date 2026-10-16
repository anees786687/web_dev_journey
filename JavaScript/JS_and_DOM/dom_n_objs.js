/**
 * What is DOM?
 * JS represents every element of the webpage as an object and can reach into these objects to change them.
 * 
 * HTML code is converted to a tree of objects by the browser; the browser achieves this by parsing the HTML code
 * 
 * So, essentialy 
 * 
 * Document is the page itself
 * Object is the representation of every element in the HTML code, the object type has the properties that can be read or written to
 * Model is the tree representation of the page that JS can work with
 * 
 * So the page displayed follows the DOM, thus JS can change the objects element and that change will appear on the screen; the html code 
 * on disk is untouched. Further, any element on the page can be reached using the DOM. Even CSS selectors are represented as objects and can be changed
 *  
 */

/**
 * JS OBJECTS
 * 
 *  way putting related data and functionality in one place; most important building block of JS, quite ubiquitous
 * 
 * Object is a collection of key-value pairs - keys are string and value can be any JS type. Idea is to look up a value by its key, similar to a dictionary
 * 
 * each key-value pair is called a property, these pairs are separated by a comma.
 * 
 * a function bound to a key is called a method i.e. a method is a function that belongs to an object
 * 
 * a property can have other objects as it value as well
 * 
 * 
 */

// creating an object
const person = {
    name: 'Anees',
    age: 34
};

console.log(person);

// we can ask for individual properties
console.log(`Name: ${person.name}`);
console.log(`Age: ${person['age']}`);
// a property that does not exist will give undefined
console.log(`Address ${person.address}`);

// we can add a new property
person.address = 'Andheri, Mumbai';
console.log(`Address ${person.address}`);

// we can edit a property
person.name = 'Anees Alwani';
console.log(`Name: ${person.name}`);


// we can delete a property
delete person.address;
console.log(`Address ${person.address}`);

// add a method to obj
person.greet = function () {
    console.log('Hi');
}
person.greet();

// adding object to an object
person.address = {
    district: 'Andheri',
    city: 'Mumbai'
};

console.log(`District: ${person.address.district} City: ${person.address.city}`);

// array of objects
const itemArray = [
    {name: 'Pen', price: 10},
    {name: 'Pencil', price: 5},
    {name: 'Book', price: 25},
]; // we can use a for..of loops to access these objects

for(const item of itemArray){
    console.log(`Item: ${item.name} Price: ${item.price}`);
}