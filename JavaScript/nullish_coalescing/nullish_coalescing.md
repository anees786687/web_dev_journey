# Nullish Coalescing (`??`)

## What it does

```js
a ?? b
```

This returns `b` **only if `a` is `null` or `undefined`**. Otherwise it returns `a`.

"Nullish" means exactly those two values: `null` and `undefined`. Nothing else counts, not even other falsy values like `0`, `""`, `false`, or `NaN`.

It was introduced in ES2020 and works in all modern browsers and Node 14+.

## Why it exists: the `||` problem

Before `??`, people used `||` for defaults. But `||` falls back on **any falsy** value, which throws away legitimate data:

```js
const volume = settings.volume || 50;
// settings.volume = 0 gives 50, so the user's mute setting is ignored!

const volume = settings.volume ?? 50;
// settings.volume = 0 gives 0, which is correct
```

## `??` vs `||` side by side

| Left side | `left \|\| "default"` | `left ?? "default"` |
|---|---|---|
| `null` | "default" | "default" |
| `undefined` | "default" | "default" |
| `0` | "default" | **0** |
| `""` | "default" | **""** |
| `false` | "default" | **false** |
| `NaN` | "default" | **NaN** |
| `"hello"` | "hello" | "hello" |

Mental model:
- `||` asks: "Is the left side **falsy**?"
- `??` asks: "Is the left side **missing**?"

## Short-circuiting

The right side is evaluated **only when needed**:

```js
const value = cached ?? expensiveComputation();
// expensiveComputation() never runs if cached is non-nullish
```

## Chaining

```js
const port = process.env.PORT ?? config.port ?? 3000;
```

This returns the first value that isn't `null` or `undefined`, reading left to right.

## Pairing with optional chaining (`?.`)

This is the most common real-world combination. `?.` safely returns `undefined` when part of a path is missing, and `??` then supplies the fallback:

```js
const city = user?.address?.city ?? "Unknown";
const firstTag = post?.tags?.[0] ?? "untagged";
const result = api.fetchData?.() ?? null; // calls the method only if it exists
```

The next few sections build `?.` up one step at a time, starting with the problem it solves.

## The problem: reading a property of something that doesn't exist

```js
const user = {};          // no address
user.address;             // undefined (fine)
user.address.city;        // TypeError: Cannot read properties of undefined
```

`user.address` is `undefined`, and asking `undefined` for `.city` crashes. This happens constantly with API data, where some fields may be missing.

The old fix was to check every step by hand:

```js
const city = user && user.address && user.address.city;
```

That works, but it gets ugly quickly.

## The fix: `?.` means "only continue if this exists"

`?.` checks the value on its **left**:
- If it's `null` or `undefined`, it **stops** and gives back `undefined`, with no crash.
- Otherwise it continues with the property access as normal.

Here's `user?.address?.city` evaluated for three different users:

| `user` value | Step-by-step | Result |
|---|---|---|
| `{ address: { city: "Mumbai" } }` | user exists → address exists → read city | `"Mumbai"` |
| `{}` | user exists → address is `undefined` → **stop** | `undefined` |
| `null` | user is `null` → **stop** immediately | `undefined` |

No case crashes; the worst result is `undefined`.

## Adding `??`: turn that `undefined` into something useful

`undefined` isn't great to display, so `??` supplies a fallback:

```js
const city = user?.address?.city ?? "Unknown";
```

Read it as: "Try to get the city. If anything along the way is missing, use `"Unknown"`."

| `user` value | `user?.address?.city` | After `?? "Unknown"` |
|---|---|---|
| has a city | `"Mumbai"` | `"Mumbai"` |
| `{}` | `undefined` | `"Unknown"` |
| `null` | `undefined` | `"Unknown"` |

So `?.` prevents the crash, and `??` provides the default.

## The other two lines are the same idea in different syntax

`?.` has three forms, depending on what you're accessing:

| Form | Used for | Example |
|---|---|---|
| `obj?.prop` | Properties | `user?.address` |
| `obj?.[expr]` | Bracket access, like array indexes | `post?.tags?.[0]` |
| `fn?.()` | Calling a function that might not exist | `api.fetchData?.()` |

**Line 2:** `post?.tags?.[0] ?? "untagged"`
If `post` is missing, or `tags` is missing, you get `"untagged"` instead of a crash. Otherwise you get the first tag. (If `tags` is an empty array, `[0]` is `undefined`, so you also get `"untagged"`.)

**Line 3:** `api.fetchData?.() ?? null`
If `fetchData` isn't a function on `api`, it isn't called and you get `null`. If it exists, it's called normally. Note that `api` itself has no `?.`, so `api` must exist.


## Logical nullish assignment (`??=`)

Introduced in ES2021, this assigns **only if** the variable is currently nullish:

```js
config.retries ??= 3;
// equivalent to: config.retries ?? (config.retries = 3)
```

If `config.retries` is already `0`, it stays `0`.

The assignment itself is short-circuited too. If the value isn't nullish, no assignment happens at all, so setters aren't triggered.

## The precedence gotcha

You **cannot** mix `??` directly with `&&` or `||` without parentheses. It's a `SyntaxError`:

```js
a || b ?? c;      // SyntaxError
a ?? b && c;      // SyntaxError

(a || b) ?? c;    // fine
a ?? (b && c);    // fine
```

This was a deliberate language design choice to prevent ambiguity about which operator groups first.

## `??` vs default parameters

These are similar but **not identical**:

```js
function greet(name = "Guest") {
  return name;
}
greet(undefined); // "Guest"
greet(null);      // null  (default params only trigger on undefined)

function greet2(name) {
  return name ?? "Guest";
}
greet2(null);     // "Guest"  (?? catches null too)
```

If an API might send `null` for a missing value, a default parameter alone won't catch it.

## Use cases

- **Config and settings** where `0`, `false`, or `""` are meaningful choices: `timeout ?? 5000`, `darkMode ?? true`
- **API responses** where fields may be `null` or absent: `response.data?.count ?? 0`
- **Form values** where `0` or an empty string is valid input
- **Lazy initialization**: `cache[key] ??= compute(key)`
- **Environment variables** with fallbacks: `process.env.HOST ?? "localhost"`

## When NOT to use it

Use `||` (or an explicit check) when you **want** to reject empty or falsy values:

```js
const username = input.trim() || "Anonymous";
// an empty string should fall back, so || is correct here
```

If `NaN` might appear, `??` won't help, because `NaN` isn't nullish. Validate with `Number.isNaN()` instead.

## Best practices

1. **Default to `??` for fallback values.** Reach for `||` only when you deliberately want falsy values replaced.
2. **Combine it with `?.`** for safe access to deep or optional data.
3. **Always parenthesize** when combining with `&&` or `||`; the language requires it anyway.
4. **Use `??=`** for "set if not already set" instead of writing `if (x == null) x = ...`.
5. **Remember that `??` only checks `null` and `undefined`.** For any other validation (empty strings, `NaN`, negative numbers), write an explicit check.

## Check your understanding

1. What do these return?
   ```js
   false ?? "yes"
   null ?? undefined ?? "end"
   "" || null ?? "x"
   ```
   One of these is a trick.
2. Given `let count = 0; count ??= 10;`, what's the final value of `count`, and why?
3. A form has an optional "discount %" field where `0` is valid and an empty field arrives as `null`. Would you use `discount || 0`, `discount ?? 0`, or a default parameter? Why?