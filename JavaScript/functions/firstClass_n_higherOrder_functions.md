# First-Class Functions and Higher-Order Functions

## First-class functions

MDN defines a language as having first-class functions when it treats functions just like any other variable: you can pass them as arguments to other functions, return them from functions, and assign them to variables.

In JavaScript, a function is simply a **value**, specifically a special kind of object. Anything you can do with a number or a string, you can do with a function:

| You can... | Example |
|---|---|
| Assign it to a variable | `const greet = () => "Hi";` |
| Pass it as an argument | `setTimeout(greet, 1000);` |
| Return it from a function | `return () => "Hi";` |
| Store it in an array or object | `const ops = { add: (a, b) => a + b };` |
| Give it properties | `greet.version = 2;` |

"First-class" describes a property of the **language**: functions are first-class citizens, with no special restrictions compared to other values.

### The three core abilities

**1. Assigning to a variable**

```js
const shout = function (msg) {
  return msg.toUpperCase();
};
shout("hello"); // "HELLO"
```

The variable now *holds* the function, and adding `()` calls it. Even if the function has its own name, you call it through the variable; MDN notes that the name mainly helps with debugging.

**2. Passing as an argument (callbacks)**

```js
function run(task) {
  task();          // call whatever function was passed in
}
run(() => console.log("Running!"));
```

A function passed into another function this way is called a callback function.

**3. Returning from a function**

```js
function makeGreeter(greeting) {
  return (name) => `${greeting}, ${name}!`;
}
const hello = makeGreeter("Hello");
hello("Anees"); // "Hello, Anees!"
```

## Higher-order functions

MDN calls a function that takes other functions as arguments, or returns a function, a higher-order function.

The relationship between the two terms:
- **First-class functions** are the language **feature** (functions are values).
- **Higher-order functions** are what the feature **enables** (functions that operate on other functions).

In the examples above, `run` and `makeGreeter` are higher-order functions. The functions passed in (or returned) are the callbacks or the results.

### Built-in higher-order functions you'll use constantly

| Function | What the callback does | Example |
|---|---|---|
| `arr.map(fn)` | Transforms each item | `[1, 2].map(n => n * 2)` gives `[2, 4]` |
| `arr.filter(fn)` | Decides keep or drop | `[1, 2, 3].filter(n => n > 1)` gives `[2, 3]` |
| `arr.reduce(fn, init)` | Combines into one value | `[1, 2, 3].reduce((sum, n) => sum + n, 0)` gives `6` |
| `arr.forEach(fn)` | Runs for each item | Side effects such as logging |
| `arr.find(fn)` | Tests for a match | The first item that passes |
| `arr.sort(fn)` | Compares two items | `nums.sort((a, b) => a - b)` |
| `setTimeout(fn, ms)` | Runs later | Delayed execution |
| `el.addEventListener("click", fn)` | Runs on an event | UI interaction |
| `promise.then(fn)` | Runs when async work finishes | API calls |

Chaining them is a very common pattern:

```js
const total = orders
  .filter(o => o.paid)
  .map(o => o.amount)
  .reduce((sum, a) => sum + a, 0);
```

### Why returning functions matters: closures

When a function returns another function, the inner one **remembers the variables of the outer scope**, even after the outer function has finished. This is called a **closure**:

```js
function makeMultiplier(factor) {
  return (n) => n * factor;   // "remembers" factor
}
const double = makeMultiplier(2);
const triple = makeMultiplier(3);
double(5); // 10
triple(5); // 15
```

This is the foundation for function factories, private state, memoization, and much of how modern frameworks work.

## Common pitfalls

### 1. Calling a function instead of passing it

```js
setTimeout(greet(), 1000);  // calls greet NOW and passes its return value
setTimeout(greet, 1000);    // passes the function itself
```

Without `()`, you're referring to the function; with `()`, you're running it. This is the #1 beginner mistake with callbacks.

If you need to pass arguments, wrap the call in another function:

```js
setTimeout(() => greet("Anees"), 1000);
```

### 2. Forgetting to `return` in `map`

```js
[1, 2].map(n => { n * 2 });   // [undefined, undefined], since braces need an explicit return
[1, 2].map(n => n * 2);       // [2, 4]
```

### 3. Callbacks receive more arguments than you expect

```js
["1", "2", "3"].map(parseInt); // [1, NaN, NaN]
```

`map` passes `(value, index, array)`, and `parseInt` treats the second argument as a number base. The fix is to be explicit: `.map(s => parseInt(s, 10))`, or use `.map(Number)`.

## Best practices

1. **Prefer built-in higher-order functions** (`map`, `filter`, `reduce`) over manual `for` loops for transforming data. They're declarative and harder to get wrong.
2. **Keep callbacks small and focused.** If one grows large, give it a name and define it separately: `orders.filter(isPaid)`.
3. **Name your functions** when it helps readability or debugging; named functions show up clearly in stack traces.
4. **Avoid side effects inside `map` and `filter`.** Use `forEach` when the goal is the side effect itself.
5. **Use closures deliberately** for factories and private state, and be aware of what variables a returned function keeps alive.

## Check your understanding

1. Is `map` a first-class function, a higher-order function, or both? What about the arrow function you pass into it?
2. What's the difference between `button.addEventListener("click", save)` and `button.addEventListener("click", save())`?
3. Imagine a function `increase()` that does `let clicks = 0; clicks++;` every time it's called. Its count resets to `0` on every call and isn't visible outside. Using what you now know about **returning functions** and closures, how could you write a `makeCounter()` that produces a counter which actually remembers its count between calls? (Check your answer against [firstClass_n_higherOrder_functions.js](firstClass_n_higherOrder_functions.js).)

Sources:
- [First-class function - Glossary | MDN](https://developer.mozilla.org/en-US/docs/Glossary/First-class_Function)