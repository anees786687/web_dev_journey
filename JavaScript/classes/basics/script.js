/**
 * Class in JS are templates for creating objects. Although we can create objects without using a class;
 * regardless, classes are usefule when we are creating multiple objects that have the same properties and methods
 * 
 * 
 */
// following is the syntax to create a class
class Person {
    // by default the properties of a class are public 
    // thus they can be modified from outside, which aint done no good for no body
    // thus make dem private by adding a #before the property
    #age;

    // static properties and methods belong to the class and not to an instance of the class
    static numUsers = 0;
    static totalAge = 0;
    constructor(name, age){
        this._name = name;
        this.#age = age;
        Person.numUsers++;
        Person.totalAge += this.#age;
    }

    // private properties can still be used within the class
    displayDetails(){
        return (`Name: ${this.name} Age: ${this.#age}`);
    }

    // static methods
    static avgPersonAge(){
        let avg = Person.totalAge / Person.numUsers;
        return Math.round(avg * 100) / 100;
    }

    static numberOfUsers(){
        return Person.numUsers;
    }

    /**
     * When I get or set a value in property field, I expect that I'm dealing with a raw value, not calling a custom function!
     * There are certain patterns that make heavy use of this feature (e.g. reactive state in certain front-end frameworks), 
     * but my advice is to only use it when you truly need it.
     */
    // getter - speacial method to get value of porperties
    get name(){
        return this._name;
    }

    // setter - special method to se value of the property 
    set name(name){
        if(name === ''){
            throw new Error('Age cannot be negative');
        }
        this._name = name;
    }

    get age(){
        return this.#age;
    }
}

let p1 = new Person('Anees', 34);
let p2 = new Person('Someone', 33);
p1.displayDetails();
p2.displayDetails();

console.log(`Avg person age: ${Person.avgPersonAge()}`);
console.log(`Number of users: ${Person.numberOfUsers()}`);

p1.name = 'Anees Alwani'; // using setter
console.log(`P1's new name is ${p1.name}`); // using getter


/**
 * Inheritance - a class can inherit properties and methods from its parent class
 */
class Engineer extends Person {
    constructor(name,age,specialization){
        /**
         * The super keyword allows us to call methods on an object's parent. It's often used to call a parent's constructor method when the child object has its own
         */
        super(name, age);
        this.specialization = specialization;
    }
    tellSpecialization(){
        console.log(`Hello, my name is ${this.name} and I am an ${this.specialization} engineer`);
    }

    // we can override methods of the parent class
    displayDetails(){
        console.log(`${super.displayDetails()} Profession: ${this.specialization}`);
    }
} 

let p3 = new Engineer('Anees Alwani', 34, 'Electronics and Telecommunication');
p3.tellSpecialization();
p3.displayDetails();
