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
 *
 * Each section ends with a ⚠️ buggy version of the same code, commented out.
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
