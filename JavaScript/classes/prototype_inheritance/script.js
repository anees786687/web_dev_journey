/**
 * Prototype Inheritance
 *
 * Prototypes are the mechanism by which JavaScript objects inherit features from one another.
 * Even the `class` keyword (see ../basics/) is built on top of everything in this file.
 */

/**
 * 1. The Object prototype
 *
 * When we create an object literal, its prototype is `Object.prototype`.
 * `Object.prototype` is built into JS and already has methods such as
 * `toString()`, `hasOwnProperty()` and `valueOf()`. Our object literal can use
 * all of them, even though we never wrote them ourselves.
 */

// consider the following object literal
const student = {
    name: "Anees",
    age: 34,
    profession: 'Engineer'
}

// Object.getPrototypeOf(obj) is the recommended way to get the prototype of an object
console.log(Object.getPrototypeOf(student));
console.log(Object.getPrototypeOf(student) === Object.prototype); // true

// student has no toString or hasOwnProperty of its own, but it can still use them,
// because JS finds them on Object.prototype
console.log(student.hasOwnProperty('name'));     // true  -> 'name' is student's OWN property
console.log(student.hasOwnProperty('toString')); // false -> toString comes from the prototype

/**
 * When we console.log(student) in the browser and expand it, we see something like:
 *
 *   {name: 'Anees', age: 34, profession: 'Engineer'}
 *     age: 34
 *     name: "Anees"
 *     profession: "Engineer"
 *     [[Prototype]]: Object
 *         constructor: ƒ Object()
 *         hasOwnProperty: ƒ hasOwnProperty()
 *         toString: ƒ toString()
 *         ... and so on
 *
 * [[Prototype]] is the hidden link from an object to its prototype.
 * All those "extra" properties (constructor, hasOwnProperty, ...) live on Object.prototype,
 * not on student itself.
 */

/**
 * 2. The prototype chain
 *
 * Every object in JavaScript has a built-in hidden property called its prototype.
 * The prototype is itself an object, so it has its own prototype, and so on.
 * This is called the prototype chain. The chain ends at a prototype whose own prototype is null.
 *
 * When you access a property of an object:
 *   1. JS first looks on the object itself.
 *   2. If it isn't there, it looks on the object's prototype.
 *   3. If still not found, it looks on the prototype's prototype ... and so on.
 *   4. If it reaches null without finding it, the result is undefined.
 *
 * For student the chain is short:  student -> Object.prototype -> null
 */
console.log(Object.getPrototypeOf(Object.prototype)); // null -> the end of every chain
console.log(student.doesNotExist);                    // undefined -> searched the whole chain, not found

/**
 * 3. Constructor functions and Constructor.prototype
 *
 * Careful: the word "prototype" means two different things here.
 *
 *   - An object's prototype (shown as [[Prototype]] in the console) is the object it INHERITS from.
 *     Read it with Object.getPrototypeOf(obj).
 *   - A function's `.prototype` is just a PROPERTY stored on the function, like any other property.
 *
 * Step 1: when we write `function Student(...) {}`, JS automatically creates a new, plain object
 *         and stores it on the function as Student.prototype. Think of it as an empty "toolbox".
 *         (Only regular functions and classes get this. Arrow functions do not.)
 *
 * Step 2: when we call `new Student(...)`, JS creates a new object and makes it inherit from
 *         that toolbox. In other words: Object.getPrototypeOf(student_2) === Student.prototype
 *
 * So anything we put in the toolbox (Student.prototype) is shared by every student.
 *
 * Objects made with `new Student(...)` have the chain:
 *     student_2 -> Student.prototype -> Object.prototype -> null
 *
 * NOTE: `Student.prototype` is NOT the prototype of the Student function itself.
 * The name is misleading. Pretend it was called `Student.toolboxForMyObjects` instead:
 * it's just something Student CARRIES (a property) so it can hand it to the objects it creates.
 * Storing an object on Student doesn't make Student inherit from it, just like
 * `anees.car = {...}` doesn't make anees inherit from the car.
 *
 * Three facts to keep separate:
 *   1. Student INHERITS from Function.prototype  -> that's why Student.call(...) and Student.bind(...) work
 *        Object.getPrototypeOf(Student) === Function.prototype
 *   2. Student is itself an OBJECT, so it can have properties, like Student.prototype (and Student.length)
 *        typeof Student.prototype === 'object'
 *   3. Objects made with `new Student()` INHERIT from Student.prototype -> that's why student_2.getName() works
 *        Object.getPrototypeOf(student_2) === Student.prototype
 *
 *     Function.prototype  <---  Student  ---> Student.prototype   <---  student_2
 *     (call, bind, apply)     (function)     (getName; the toolbox)    (inherits from it)
 *       ^ Student's REAL                      ^ just a property Student carries
 *         prototype
 *
 * Rule of thumb:
 *   Object.getPrototypeOf(X) = X's real prototype (what X inherits from)
 *   X.prototype              = a property on X; what objects made with `new X()` will inherit from
 */
function Student(name, age, profession){
    // these are OWN properties: every instance gets its own copy
    this.name = name;
    this.age = age;
    this.profession = profession;

    // a method defined here is ALSO an own property, so every instance gets a brand new
    // copy of this function. That works, but wastes memory if we make many students.
    // Methods are better placed on Student.prototype (like getName below) so they are shared.
    this.getDeets = () => {
        console.log(`Name: ${this.name}\nAge: ${this.age}\nProfession: ${this.profession}`);
    }
}

// Can we change the prototype that the constructor gave us? Yes!
// Here we add a getName method to Student.prototype.
// It is stored ONCE, and every Student instance (even ones created before this line) can use it.
// We use a regular function (not an arrow) so that `this` refers to the object calling the method.
Student.prototype.getName = function(){
    return this.name;
}

const student_2 = new Student('Fawaz', 34, 'Doctor');

// __proto__ is another (older) way to get the prototype of an object.
// It works in browsers, but it's deprecated; prefer Object.getPrototypeOf().
console.log(student_2);
console.log(Object.getPrototypeOf(student_2) === Student.prototype); // true

// getName is not on student_2, so JS walks up the chain and finds it on Student.prototype
console.log(student_2.getName());                 // Fawaz
console.log(student_2.hasOwnProperty('getName')); // false -> it's inherited
console.log(student_2.hasOwnProperty('getDeets'));// true  -> it was created inside the constructor
console.log(Object.getPrototypeOf(student_2) === Student.prototype);
// Visualising the prototype chain by walking up it until we reach null.
// Expected output (in order): Student.prototype, Object.prototype, null
let object = student_2;
console.log('----Visualising prototype chain----');
do{
    object = Object.getPrototypeOf(object);
    console.log(object);
}while(object)

/**
 * 4. Shadowing prototype properties
 *
 * If an object has its OWN property with the same name as one further up the chain,
 * the own property is found first and "shadows" (hides) the inherited one.
 * The inherited property is not deleted or changed: it's just never reached.
 */

// toString is not on student_2 or Student.prototype; it's found on Object.prototype.
// The default version just returns the string "[object Object]".
console.log(student_2.toString());

// Now we give student_2 its own toString, which shadows Object.prototype.toString.
// toString is expected to RETURN a string, so we build and return one
// (getDeets only logs and returns undefined, so it can't be used directly here).
student_2.toString = function(){
    return `Name: ${this.name}, Age: ${this.age}, Profession: ${this.profession}`;
}

console.log(student_2.toString()); // uses student_2's own toString now
console.log(`${student_2}`);       // template literals call toString() too, so this also uses our version

// Only student_2 was affected; other objects still use Object.prototype.toString
console.log(student.toString()); // [object Object]


/**
 * 5. Creating custom prototypes with Object.create()
 *
 * An object literal gets Object.prototype as its prototype, and an object made with
 * `new Constructor()` gets Constructor.prototype.
 *
 * But we can also make our own plain object to act as a prototype, and create
 * new objects that use it, with Object.create(proto).
 */
console.log('---- creating custom prototypes and assigning them to objects ----')
const Employee = {
    slogan: function(){
        return `My company is the best!`;
    },

    changeName: function(newName){
        this.name = newName;
    },

    getDeets: function(){
        return `Name: ${this.name}\nAge: ${this.age}`;
    }
}

// Object.create is a static method on the Object constructor (not on Object.prototype).
// It creates a NEW, empty object whose prototype is the object we pass in.
// Chain: emp_1 -> Employee -> Object.prototype -> null
const emp_1 = Object.create(Employee);
console.log(emp_1);                                         // {} -> an empty object (no own properties yet)
console.log(Object.getPrototypeOf(emp_1) === Employee);     // true
console.log(Object.getPrototypeOf(Object.getPrototypeOf(emp_1)) === Object.prototype);     // true

console.log(emp_1.slogan());                                // works: slogan is found on Employee
console.log(emp_1.getDeets()); // name and age are undefined, because neither emp_1 nor Employee has them

// so we define them as own properties of emp_1
emp_1.name = 'Anees';
emp_1.age = 34;
emp_1.chikne = 'yes'; // we can add any property we like; it doesn't have to be used by the prototype's methods
console.log(emp_1.getDeets());

// changeName sets this.name; `this` is emp_1 (the object before the dot), so emp_1 is changed, not Employee
emp_1.changeName('Fawaz');
console.log(emp_1.name);    // Fawaz
console.log(Employee.name); // undefined -> the prototype itself was not touched

/**
 * 6. Inheritance using prototypes
 *
 * Goal: make an EngineeringStudent that has everything a Student has, plus a stream.
 * Two things are needed:
 *   a) the OWN properties  -> call the parent constructor with Student.call(this, ...)
 *   b) the SHARED methods  -> link EngineeringStudent.prototype to Student.prototype
 *
 * Constructor names start with a capital letter by convention (Student, EngineeringStudent),
 * as a reminder that they must be called with `new`.
 */
function EngineeringStudent(name, age, profession, stream){
    // (a) Student.call(this, ...) runs the Student function with `this` set to the new
    // EngineeringStudent object, so it gets name, age, profession and getDeets as own properties
    Student.call(this, name, age, profession);
    this.stream = stream;

    this.getStream = () => {
        return this.stream;
    }
}

// (b) Make EngineeringStudent.prototype a new object whose prototype is Student.prototype.
// Chain: lala -> EngineeringStudent.prototype -> Student.prototype -> Object.prototype -> null
EngineeringStudent.prototype = Object.create(Student.prototype);

// Replacing EngineeringStudent.prototype threw away its original `constructor` property,
// so lala.constructor would wrongly point to Student. We put it back:
EngineeringStudent.prototype.constructor = EngineeringStudent;

const lala = new EngineeringStudent('lala', 99, 'Engineering', 'EXTC');
console.log(lala);
console.log(lala.getName());   // inherited from Student.prototype
console.log(lala.getStream()); // EngineeringStudent's own method
lala.getDeets();               // own property, created by Student.call(this, ...)

// instanceof checks whether a constructor's prototype appears anywhere in the object's chain
console.log(lala instanceof EngineeringStudent); // true
console.log(lala instanceof Student);            // true
console.log(lala instanceof Object);             // true
console.log(lala.constructor === EngineeringStudent); // true (thanks to the fix above)
