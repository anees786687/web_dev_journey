/**
 * TOPIC: Nullish coalescing (??), optional chaining (?.) and ??=
 * -------------------------------------------------------------
 *   a ?? b    -> gives `b` only if `a` is null or undefined, otherwise `a`
 *   obj?.prop -> reads `prop`, but stops and gives `undefined` (instead
 *                of crashing) if `obj` is null or undefined
 *   a ??= b   -> assigns `b` to `a` only if `a` is null or undefined
 *
 * Unlike ||, the ?? operator does NOT replace other falsy values such as
 * 0, "" or false. Read nullish_coalescing.md for the full explanation.
 *
 * HOW TO RUN: open index.html in a browser and open the Console (F12),
 * or run `node nullish_coalescing.js`.
 */


// ============================================================
// 1. CHAINING ?? TO PICK THE FIRST VALUE THAT EXISTS
// ============================================================
// These two objects stand in for real settings. In Node.js, real
// environment variables live in `process.env`.
const env = {
    PORT: 123
};
const config = {};

// Read left to right: use env.PORT if it exists, otherwise config.port,
// otherwise 3000.
const port = env.PORT ?? config.port ?? 3000;
console.log(`Chaining ?? : ${port}`);   // 123
// TRY IT: delete PORT from `env` and you'll get 3000.


// ============================================================
// 2. OPTIONAL CHAINING ?. WITH A ?? FALLBACK
// ============================================================
const user = {};   // this user has no address

// ⚠️ Common mistake: `user?.address.city` only protects `user`.
// `user.address` is undefined, and reading `.city` of undefined throws:
//     TypeError: Cannot read properties of undefined (reading 'city')
// Commented out so the rest of the file keeps running:
// const brokenCity = user?.address.city ?? 'Untagged';

// Fix: put ?. on every step that might be missing.
const city = user?.address?.city ?? 'Untagged';
console.log(`Optional chaining fixed: ${city}`);   // Untagged


// ============================================================
// 3. OPTIONAL CHAINING ON A FUNCTION CALL: fn?.()
// ============================================================
const ops = {
    // fetchData: function (name) {
    //     return `Data fetched ${name}`;
    // },
};

// fetchData doesn't exist, so ?.() skips the call and gives undefined,
// and ?? replaces that with 'no data'.
console.log(ops.fetchData?.('anees') ?? 'no data');
// TRY IT: uncomment fetchData above and run again.


// ============================================================
// 4. NULLISH ASSIGNMENT ??=
// ============================================================
const settings = {};
console.log(`Before nullish assignment: ${settings.retries}`);   // undefined

settings.retries ??= 3;   // retries was undefined, so it becomes 3
console.log(`After nullish assignment: ${settings.retries}`);    // 3

settings.retries ??= 10;  // retries is already 3, so nothing changes
console.log(`Assigning again does nothing: ${settings.retries}`); // 3


// ============================================================
// 5. DEFAULT PARAMETERS vs ??
// ============================================================
// A default parameter is only used when the argument is `undefined`.
function greet(name = 'Guest') {
    return name;
}
console.log(`No argument (undefined): ${greet()}`);      // Guest
console.log(`null as argument:        ${greet(null)}`);  // null (the default is NOT used!)

// APIs often send `null` for a missing value. Using ?? inside the
// function handles BOTH null and undefined.
function greet2(name) {
    return name ?? 'Guest';
}
console.log(`greet2(null):      ${greet2(null)}`);       // Guest
console.log(`greet2(undefined): ${greet2(undefined)}`);  // Guest
