/**
 * TOPIC: Arrays (sequences) and loops (iteration)
 * -----------------------------------------------
 * An ARRAY is an ordered list of values:  const nums = [10, 20, 30];
 *   - Items are numbered from 0 (the INDEX): nums[0] is 10, nums[2] is 30
 *   - nums.length is the number of items (3), so the last index is length - 1
 *
 * A LOOP repeats a block of code. This file covers:
 *   1. Array basics
 *   2. while loops
 *   3. break and continue
 *   4. Classic for loops (counting backwards)
 *   5. for...of loops
 *   6. Spread syntax (...) and destructuring
 *
 * Sections 3-5 end with a ⚠️ buggy version of the same code, commented out.
 * Read it and work out what goes wrong before you try running it.
 *
 * HOW TO RUN: open index.html in a browser and open the Console (F12),
 * or run `node seq_n_iteration.js`.
 */

const students = ['Alice', 'Bob', 'Charlie', 'Dana'];
const scores = [98, 95, 95, 100];   // scores[i] belongs to students[i]


// ============================================================
// 1. ARRAY BASICS
// ============================================================
console.log(students[0]);        // Alice   (first item is index 0)
console.log(students[1]);        // Bob
console.log(students[2]);        // Charlie
console.log(students[3]);        // Dana    (last index is length - 1)
console.log(students.length);    // 4
console.log(students[4]);        // undefined (no item there; this is not an error)


// ============================================================
// 2. WHILE LOOP
// ============================================================
// Repeats while the condition is true. You manage the counter yourself:
// start it, check it, and update it.
let idx = 0;                                 // 1. start
while (idx < students.length) {              // 2. check
    console.log(`Student: ${students[idx]} Score: ${scores[idx]}`);
    idx += 1;                                // 3. update (forget this and it never ends!)
}


// ============================================================
// 3. BREAK AND CONTINUE
// ============================================================
//   continue -> skip the REST of this iteration and jump to the next check
//   break    -> leave the loop completely
// Prints 0 1 2 4 5 6 7  (3 is skipped, and the loop stops at 8)
let i = 0;
while (i < 10) {
    if (i === 3) {
        i += 1;      // update BEFORE continue, or i stays 3 forever
        continue;
    }
    if (i === 8) {
        break;
    }
    console.log(i);
    i += 1;
}

// ⚠️ BUGGY VERSION: an infinite loop that will freeze the tab.
// When i is 3, `continue` jumps back to the check before `i += 1` runs,
// so i stays 3 forever.
//
// let j = 0;
// while (j < 10) {
//     if (j == 3) continue;
//     if (j == 8) break;
//     console.log(j);
//     j += 1;
// }


// ============================================================
// 4. FOR LOOP (counting backwards)
// ============================================================
// for (start; check; update) puts all three parts on one line.
// Start at the last index and count DOWN to 0.
for (let k = students.length - 1; k >= 0; k--) {
    console.log(students[k]);    // Dana, Charlie, Bob, Alice
}

// ⚠️ BUGGY VERSION: k++ instead of k--.
// k starts at 3 and goes UP, so `k >= 0` is always true. Infinite loop.
//
// for (let k = students.length - 1; k >= 0; k++) {
//     console.log(students[k]);
// }


// ============================================================
// 5. FOR...OF LOOP
// ============================================================
// The simplest way to visit every item when you don't need the index.
for (const student of students) {
    console.log(student);
}

// ⚠️ BUGGY VERSION: the loop variable isn't declared.
// In sloppy mode this silently creates a GLOBAL variable `student`.
// In strict mode or a module it throws a ReferenceError.
// Always write `const` (or `let`).
//
// for (student of students) {
//     console.log(student);
// }


// ============================================================
// 6. SPREAD SYNTAX AND DESTRUCTURING
// ============================================================
// SPREAD (...arr) unpacks the items of an array in place.
const arr = [1, 2, 3, 4, 5];

// The items of `arr` are inserted where ...arr is written: one flat array.
const withSpread = [10, 20, ...arr, 30, 40, 50];
console.log(`With spread syntax: ${withSpread}`);    // 10,20,1,2,3,4,5,30,40,50
console.log(`withSpread[2]: ${withSpread[2]}`);       // 1
console.log(`withSpread.length: ${withSpread.length}`); // 10

// Without the dots, the whole array is inserted as ONE item (a nested array).
const withoutSpread = [10, 20, arr, 30, 40, 50];
console.log(`Without spread syntax: ${withoutSpread}`);   // looks the same when printed as text...
console.log(`withoutSpread[2]: ${withoutSpread[2]}`);     // ...but index 2 is the whole array 1,2,3,4,5
console.log(`withoutSpread.length: ${withoutSpread.length}`); // 6, not 10
// TRY IT: console.log(withoutSpread) (no template literal) to see the nesting.

// Spread is also the easy way to COPY an array.
// `copy` is a new array, so changing it doesn't change `arr`.
const copy = [...arr];
copy.push(6);
console.log(`arr: ${arr} | copy: ${copy}`);   // arr: 1,2,3,4,5 | copy: 1,2,3,4,5,6
// ⚠️ `const alias = arr;` would NOT copy: both names would point to the same array.

// DESTRUCTURING pulls items out of an array into separate variables, by position.
// Here ... is called the REST element: it collects everything that's left
// into a new array. It must be the last item.
const [firstElement, secondElement, ...remainingElements] = arr;
console.log(`firstElement: ${firstElement}`);           // 1
console.log(`secondElement: ${secondElement}`);         // 2
console.log(`remainingElements: ${remainingElements}`); // 3,4,5
