# Truthy vs Falsy in JavaScript

## The core idea

Whenever JavaScript needs a boolean but gets some other kind of value, it **coerces** the value to `true` or `false`. Values that become `false` are **falsy**; everything else is **truthy**.

"Truthy" doesn't mean the value *is* `true`. It means the value *behaves like* `true` in a boolean context.

## The complete falsy list

There are exactly **8** falsy values. Memorize these, because **everything else is truthy**.

| Value | Type | Note |
|---|---|---|
| `false` | Boolean | The obvious one |
| `0` | Number | |
| `-0` | Number | Yes, negative zero exists |
| `0n` | BigInt | BigInt zero |
| `""` | String | Empty string only (also `''` and ``` `` ```) |
| `null` | Null | |
| `undefined` | Undefined | |
| `NaN` | Number | Not-a-Number |

One trivia exception: `document.all` in browsers is falsy for legacy reasons. You'll never need it, but it occasionally shows up in interviews.

## Surprising truthy values

These catch people constantly:

| Value | Why it surprises people |
|---|---|
| `"0"` | Non-empty string, even though it looks like zero |
| `"false"` | Non-empty string, even though it says false |
| `" "` | A space is still a character |
| `[]` | An empty array is still an object |
| `{}` | An empty object is still an object |
| `function(){}` | Functions are objects |
| `new Boolean(false)` | A wrapper **object**, so it's truthy |
| `-1`, `Infinity`, `-Infinity` | Any non-zero number |
| `new Date()` | Objects are always truthy |

The rule behind most of these: **all objects are truthy**, including arrays, functions, and wrapper objects, whatever they contain.

## Where coercion happens (boolean contexts)

- `if (x)`, `while (x)`, `do...while`, and the condition of a `for` loop
- Ternary: `x ? a : b`
- Logical NOT: `!x`
- Logical operators: `&&`, `||`
- Explicit conversion: `Boolean(x)` or `!!x`

```js
Boolean("hello"); // true
!!0;              // false
!![];             // true
```

`!!x` is common shorthand. The first `!` coerces and negates, and the second negates back.

## `&&` and `||` return operands, not booleans

This is the most misunderstood part. These operators **short-circuit** and return **one of the original values**:

- `a || b` returns `a` if `a` is truthy; otherwise it returns `b`.
- `a && b` returns `a` if `a` is falsy; otherwise it returns `b`.

```js
"hi" || "default";  // "hi"
""   || "default";  // "default"
0    && "never";    // 0
"ok" && "yes";      // "yes"
null || 0 || "";    // "" (no truthy value found, so the last one is returned)
```

## Truthy is NOT the same as `== true`

Loose equality (`==`) doesn't use truthiness. It converts both sides toward **numbers**, which gives contradictory-looking results:

```js
if ([]) { }      // runs, because [] is truthy
[] == false;     // true! ([] → "" → 0, and false → 0)

if ("0") { }     // runs, because "0" is truthy
"0" == false;    // true! ("0" → 0, and false → 0)

null == false;   // false (null only loosely equals undefined)
NaN == NaN;      // false (NaN equals nothing, including itself)
```

The lesson is to never compare to `true` or `false` with `==`. Either rely on truthiness (`if (x)`) or compare explicitly with `===`.

## Common pitfalls

### 1. `||` defaults overwrite valid falsy values

```js
function setVolume(v) {
  const volume = v || 50;
}
setVolume(0); // volume = 50, so the user's 0 is lost!
```

The fix is the **nullish coalescing operator `??`** (ES2020), which only falls back on `null` or `undefined`:

```js
const volume = v ?? 50; // 0 stays 0, "" stays ""
```

| Expression | `\|\|` result | `??` result |
|---|---|---|
| `0 ?? 50` | 50 | **0** |
| `"" ?? "x"` | "x" | **""** |
| `false ?? true` | true | **false** |
| `null ?? 5` | 5 | 5 |
| `undefined ?? 5` | 5 | 5 |

### 2. Empty arrays and objects pass `if` checks

```js
const items = [];
if (items) { }              // always runs!
if (items.length) { }       // correct: 0 is falsy

const obj = {};
if (Object.keys(obj).length) { } // checks for an empty object
```

### 3. `0` leaking into rendered output

Frameworks like React render numbers, so this is a classic bug:

```js
{count && <Badge />}        // renders "0" when count is 0
{count > 0 && <Badge />}    // correct
```

### 4. Checking whether a number exists

```js
if (user.age) { }               // fails for age 0
if (user.age !== undefined) { } // explicit
if (user.age != null) { }       // catches both null and undefined
```

`x != null` is the one widely accepted use of loose equality, because it's a concise way to check for "not null and not undefined."

### 5. `NaN` hides in calculations

```js
const n = parseInt("abc"); // NaN
if (n) { }                 // skipped, but so is a real 0
Number.isNaN(n);           // true, the precise check
```

## Useful patterns

```js
// Remove all falsy values from an array
[0, "a", "", null, 42, undefined].filter(Boolean); // ["a", 42]

// Guard clause
if (!user) return;

// Safe nested access with a default
const city = user?.address?.city ?? "Unknown";

// Logical assignment (ES2021)
config.retries ??= 3;   // assign only if null/undefined
config.name ||= "anon"; // assign if falsy
config.debug &&= false; // assign only if truthy
```

## Best practices

1. **Know the 8 falsy values cold.** Everything else follows from "not on the list means truthy."
2. **Use `??` instead of `||` for defaults** whenever `0`, `""`, or `false` are valid values.
3. **Be explicit when the distinction matters.** Write `arr.length > 0`, `str !== ""`, or `x !== undefined` instead of a bare `if (x)` that might reject legitimate values.
4. **Use bare truthiness for simple existence checks**, where any falsy value really means "nothing here": `if (!user) return;`
5. **Never use `== true` or `== false`.** Use `===`, or just the value itself.
6. **Remember that `&&` and `||` return values, not booleans.** Wrap with `Boolean()` if you need an actual `true`/`false`, for example when storing a flag.

## Check your understanding

1. What does `[] + [] || "empty"` evaluate to? Work out the `+` first.
2. Why does `if ("false")` run its block, but `if (false)` doesn't?
3. A function receives `discount`, which can legitimately be `0`. Which line is buggy, and why?
   ```js
   const d1 = discount || 10;
   const d2 = discount ?? 10;
   ```
4. Predict the output: `console.log(null || undefined || 0 || "done" || "never")`