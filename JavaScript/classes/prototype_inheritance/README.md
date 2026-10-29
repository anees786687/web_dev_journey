# Prototypes and prototype inheritance

Every JavaScript object has a hidden link to another object, called its **prototype**. When a
property isn't found on an object, JavaScript looks for it on the prototype, then on the
prototype's prototype, and so on. This is how objects share methods, and it's what the `class`
keyword (see [../basics/](../basics/)) is built on.

## Files

| File | What it is |
|------|------------|
| [script.js](script.js) | `Object.prototype`, the prototype chain, constructor functions and `Constructor.prototype`, shadowing, `Object.create()`, and inheritance between two constructors |
| [index.html](index.html) | An empty page that loads `script.js` with `defer` |

## How to run

- **Browser:** open `index.html` and press `F12` → *Console*. Expand the logged objects and look for `[[Prototype]]` to follow the chain.
- **Node.js:** `node script.js`. Node prints `Object.prototype` as `[Object: null prototype] {}`.

## What the code covers

### 1. The Object prototype
An object literal's prototype is `Object.prototype`. That's why `student.toString()` and
`student.hasOwnProperty('name')` work even though `student` never defined them.

```js
Object.getPrototypeOf(student) === Object.prototype; // true
student.hasOwnProperty('name');      // true  (own property)
student.hasOwnProperty('toString');  // false (inherited)
```

### 2. The prototype chain
Property lookup checks the object first, then walks up the chain until it finds the property
or reaches `null`, in which case the result is `undefined`.

```
student   -> Object.prototype -> null
student_2 -> Student.prototype -> Object.prototype -> null
```

The `do...while` loop in the script prints every link in `student_2`'s chain.

### 3. Constructor functions and `Constructor.prototype`
Every regular function has a `prototype` object. `new Student(...)` creates an object whose
`[[Prototype]]` is `Student.prototype`.

- Properties set with `this.x = ...` inside the constructor are **own** properties, so each instance gets its own copy.
- Methods added to `Student.prototype` are stored **once** and **shared** by every instance, including instances created before the method was added.
- `Student.prototype` is *not* the prototype of the `Student` function. It's the prototype that `Student`'s instances get.
- Use `Object.getPrototypeOf(obj)`. `obj.__proto__` also works but is deprecated.

### 4. Shadowing
An own property with the same name as an inherited one is found first and hides the inherited
one. Giving `student_2` its own `toString` changes only `student_2`. Other objects still use
`Object.prototype.toString`.

### 5. Custom prototypes with `Object.create()`
`Object.create(proto)` makes a new, empty object whose prototype is `proto`. Any plain object
(like `Employee`) can act as a prototype.

```js
const emp_1 = Object.create(Employee); // emp_1 -> Employee -> Object.prototype -> null
emp_1.slogan();          // found on Employee
emp_1.changeName('X');   // `this` is emp_1, so emp_1.name changes and Employee is untouched
```

### 6. Inheritance between constructors
To make `EngineeringStudent` inherit from `Student`, you need three steps:

```js
function EngineeringStudent(name, age, profession, stream) {
    Student.call(this, name, age, profession); // 1. copy the parent's OWN properties
    this.stream = stream;
}
EngineeringStudent.prototype = Object.create(Student.prototype); // 2. share the parent's methods
EngineeringStudent.prototype.constructor = EngineeringStudent;   // 3. restore constructor
```

```
lala -> EngineeringStudent.prototype -> Student.prototype -> Object.prototype -> null
```

`lala instanceof Student` is `true` because `Student.prototype` is in `lala`'s chain.

### 7. The two meanings of "prototype"
The word "prototype" is used for two different things, and mixing them up is the most common
source of confusion.

**Meaning 1: an object's prototype.** This is the object it inherits from, read with
`Object.getPrototypeOf(obj)`. Every object has one. Property lookup follows these links
**up** until it finds the property or reaches `null`.

**Meaning 2: a function's `.prototype` property.** This is an ordinary property that only
functions have. It holds an object that waits to become the prototype (meaning 1) of every
object that `new` creates.

```
   ┌───────────────────┐
   │  Student          │
   │  (a function)     │         ┌───────────────────┐
   │  .prototype  ─────┼───────► │ Student.prototype │
   └───────────────────┘         │   getName()       │
                                 └───────────────────┘
                                          ▲
                        new Student()     │  "my prototype"
                        makes this ──► student_2
```

So `Student.prototype` does **not** mean "the prototype of `Student`". It means "the prototype
`Student` gives to the objects it makes":

```js
Object.getPrototypeOf(student_2) === Student.prototype;  // true:  student_2 inherits from Student.prototype
Object.getPrototypeOf(Student) === Function.prototype;   // true:  Student is a function, so it inherits from Function.prototype
Object.getPrototypeOf(student_2) === Student;            // false: the function itself isn't in student_2's chain
```

`Student.prototype` and `Function.prototype` are separate objects, and neither is in the other's
chain. They're like siblings: both have `Object.prototype` as their prototype.

```
                     Object.prototype
                     (toString, hasOwnProperty)
                    ▲                 ▲
                    │                 │
     Function.prototype        Student.prototype
     (call, bind, apply)       (getName)
            ▲                         ▲
            │                         │
         Student                  student_2
       (the function)             (the object)
```

That's why:
- `student_2.toString()` works, because `Object.prototype` is in its chain.
- `student_2.call` is `undefined`, because `Function.prototype` is **not** in its chain.
- `Student.call(this, ...)` works, because `Student` is a function.

The prototype is **linked, not copied**. Every instance points at the same single
`Student.prototype` object. A method added to it later still appears on objects created earlier,
and `student_2.hasOwnProperty('getName')` is `false`.

Where the prototype comes from depends on how the object was made:

| Object | How it was made | Its prototype |
|---|---|---|
| `student` | object literal `{...}` | `Object.prototype` |
| `student_2` | `new Student(...)` | `Student.prototype` |
| `lala` | `new EngineeringStudent(...)` | `EngineeringStudent.prototype` (whose prototype is `Student.prototype`) |
| `emp_1` | `Object.create(Employee)` | `Employee` itself (no `.prototype` involved) |

### 8. What "is an object of" really means: `instanceof`
`x instanceof Y` asks: **"Does `Y.prototype` appear anywhere in `x`'s prototype chain?"**
It can appear anywhere in the chain, not only as the direct prototype.

```
lala -> EngineeringStudent.prototype -> Student.prototype -> Object.prototype -> null
```

```js
lala instanceof EngineeringStudent; // true  (direct prototype)
lala instanceof Student;            // true  (one level further up)
lala instanceof Object;             // true  (almost every chain ends at Object.prototype)
lala instanceof Function;           // false (Function.prototype isn't in the chain)
```

It's purely a chain check. JavaScript doesn't remember which constructor built an object, so
changing the link changes the answer:

```js
const fake = {};
Object.setPrototypeOf(fake, Student.prototype);
fake instanceof Student; // true, even though Student() never ran and fake has no name or age
```

So "is a Student" means "inherits from `Student.prototype`", not "was built by `Student`".

## Fixes made to the original code

| Problem | Fix |
|---------|-----|
| The overriding `student_2.toString` called `getDeets()` but returned nothing, so `console.log(student_2.toString())` printed `undefined` | It now **returns** a string. `toString` must return a string, which is also what template literals like `` `${student_2}` `` use |
| `EngineeringStudent.prototype = Object.create(...)` removed the `constructor` property, so `lala.constructor` pointed to `Student` | Added `EngineeringStudent.prototype.constructor = EngineeringStudent` |
| The constructor was named `engineeringStudent` | Renamed to `EngineeringStudent`: constructors start with a capital letter by convention, as a reminder to use `new` |
| A comment called `Object.create` "the create method of the Object prototype" | It's a **static** method on the `Object` constructor, not on `Object.prototype` |
| The pasted browser console output was hard to read | Reformatted it as an indented tree |

## Key ideas

- **Prototype**: the object another object inherits from. Read it with `Object.getPrototypeOf(obj)`.
- **Prototype chain**: object → prototype → prototype's prototype → … → `null`.
- Lookup goes **up** the chain. Assigning (`obj.x = 1`) always creates or changes an **own** property and never changes the prototype.
- `hasOwnProperty(key)` tells you whether a property is the object's own or inherited.
- `new Student()` creates an object whose prototype is `Student.prototype`, **not** `Student`. The `Student` function's own prototype is `Function.prototype`.
- `x instanceof Y` is `true` when `Y.prototype` is **anywhere** in `x`'s chain.
- Put shared methods on `Constructor.prototype`, not inside the constructor, so they're stored once.
- Use regular `function`s for prototype methods. An arrow function doesn't get its own `this`, so `this` won't refer to the calling object.
- `Object.create(proto)` makes an object with a prototype you choose.
- Inheritance with constructors needs `Parent.call(this, ...)`, `Child.prototype = Object.create(Parent.prototype)`, and a restored `constructor`.
- `class Child extends Parent` does all of this for you behind the scenes.

## Try it

1. Move `getDeets` out of the `Student` constructor and onto `Student.prototype`. Check `student_2.hasOwnProperty('getDeets')` before and after.
2. Add a `getStream` method to `EngineeringStudent.prototype` instead of creating it inside the constructor. Does `student_2.getStream` exist? Why not?
3. Comment out the `constructor` fix line and log `lala.constructor.name`. What do you get?
4. Create `const manager = Object.create(emp_1)`. What does `manager.getDeets()` print, and why? Write out the chain.
5. Predict the result of `student_2 instanceof Function` and `Student instanceof Function` before running them, then explain each using the sibling diagram in section 7.
6. Rewrite `Student` and `EngineeringStudent` using `class` and `extends`, then confirm `Object.getPrototypeOf(EngineeringStudent.prototype) === Student.prototype` is still `true`.

### Resources

- [MDN: Object prototypes](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Advanced_JavaScript_objects/Object_prototypes)
- [MDN: Inheritance and the prototype chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
- [MDN: Object.create()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
- [MDN: Object.getPrototypeOf()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf)
- [MDN: Function.prototype.call()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
- [MDN: instanceof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof)
