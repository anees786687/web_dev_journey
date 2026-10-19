/**
 * TOPIC: `this` in regular functions vs arrow functions
 * ----------------------------------------------------
 * `this` is a special keyword that refers to "the object the code is
 * running for". What it points to depends on the kind of function:
 *
 *   REGULAR function / method -> `this` is set by HOW it is CALLED.
 *       obj.method()  -> `this` is obj (the object before the dot)
 *
 *   ARROW function -> has NO `this` of its own. It uses the `this` of the
 *       code AROUND it (where it was written). We say arrows
 *       "preserve" or "inherit" the surrounding `this`.
 *
 * Rule of thumb:
 *   - Use a regular method (shorthand  name() { ... }) for functions that
 *     live ON an object and need `this`.
 *   - Use an arrow function for callbacks INSIDE a method, so they keep
 *     the method's `this` (section 2).
 *
 * HOW TO RUN: open index.html in a browser and open the Console (F12),
 * or run `node script.js`.
 */


// ============================================================
// 1. A REGULAR METHOD vs AN ARROW FUNCTION ON AN OBJECT
// ============================================================
const deets = {
    name: 'Anees',
    age: 34,

    // Regular method: called as deets.getDeets(), so `this` is deets.
    getDeets() {
        return `${this.name} ${this.age}`;
    },

    // Arrow function: it ignores how it's called and uses the `this` from
    // OUTSIDE the object literal, which is the top level of the file.
    // An object literal { } does NOT create a new `this`.
    someFunc: () => {
        return `${this.name} ${this.age}`;
    }
};

console.log(deets.getDeets());   // Anees 34
console.log(deets.someFunc());   // NOT "Anees 34". See below for why.

/*
 * Why does someFunc fail?
 *   At the top level of a file, `this` is:
 *     - a classic browser <script>: `window`, so this.name is window.name
 *       (usually "") and this.age is undefined -> " undefined"
 *     - Node.js (CommonJS file): an empty object {} -> "undefined undefined"
 *     - an ES module: undefined, so reading this.name THROWS:
 *       TypeError: Cannot read properties of undefined (reading 'name')
 *   In every case, it is NOT `deets`.
 *
 * ⚠️ So don't use arrow functions as object methods that need `this`.
 */


// ============================================================
// 2. WHERE ARROW FUNCTIONS SHINE: CALLBACKS INSIDE A METHOD
// ============================================================
const team = {
    name: 'Mumbai Stars',
    players: ['Ana', 'Ben', 'Cy'],

    // The arrow callback has no `this` of its own, so it uses the `this`
    // of listPlayers(), which is `team`.
    listPlayers() {
        this.players.forEach((player) => {
            console.log(`${player} plays for ${this.name}`);
        });
    },

    // ⚠️ With a regular function as the callback, forEach calls it with no
    // object before the dot, so `this` is lost (undefined or the global object).
    listPlayersBroken() {
        this.players.forEach(function (player) {
            console.log(`${player} plays for ${this?.name}`);
        });
    },
};

team.listPlayers();         // Ana plays for Mumbai Stars, ...
team.listPlayersBroken();   // Ana plays for undefined (or an empty name in a browser)

// TRY IT: change someFunc in section 1 into a regular method so it prints
// "Anees 34". Then fix listPlayersBroken with .bind(this) instead of an arrow:
//     this.players.forEach(function (player) { ... }.bind(this));
