/**
 * PROJECT: Password checker
 * -------------------------
 * A login form that checks the username and password typed in against a
 * small list of users stored in this file.
 *
 * How it works:
 *   1. `users` is an array of objects, one per user.
 *   2. When the form is submitted, we read both inputs.
 *   3. A for...of loop looks for a user with that username.
 *   4. If one is found, we compare the passwords and show the result.
 *   5. The form is cleared, ready for the next attempt.
 *
 * ⚠️ FOR PRACTICE ONLY. Anyone can read these passwords: open DevTools ->
 * Sources, or view the page source. A real login sends the details to a
 * SERVER, which checks them against passwords stored in a scrambled
 * ("hashed") form. Never put real passwords in front-end JavaScript.
 *
 * HOW TO RUN: open index.html, open the Console (F12), and try logging in.
 * For example, username "abcd" with password "1234" is valid.
 */


// ============================================================
// 1. THE USERS
// ============================================================
// Each user is an object with the same two keys, so the loop below can
// read user.username and user.password from any of them.
const users = [
    { username: 'abcd', password: '1234' },
    { username: 'bcde', password: '2345' },
    { username: 'cdef', password: '2345' },   // two users can share a password
    { username: 'defg', password: '3456' },
];


// ============================================================
// 2. FIND THE FORM AND ITS INPUTS
// ============================================================
const userNameInput = document.querySelector('input#username');
const passInput = document.querySelector('input#pass');
const validationForm = document.getElementById('validation_form');
const pwCheckContainer = document.getElementById('password_check_container');
const resultElement = document.querySelector('.result');
// ============================================================
// 3. CHECK THE DETAILS WHEN THE FORM IS SUBMITTED
// ============================================================
// Listen for 'submit' on the FORM (see JS_and_DOM/working_with_inputs).
// It only fires once the browser's own checks pass. Here that's `required`
// on both inputs, so the code below never sees an empty field.
validationForm.addEventListener('submit', (event) => {
    // Stop the page from reloading, so we can handle the login in JS.
    event.preventDefault();

    // Read the values NOW, at submit time.
    const userName = userNameInput.value;
    const password = passInput.value;

    let userFound = false;

    for (const user of users) {
        if (user.username === userName) {
            userFound = true;
            console.log('User found');

            // === compares exactly: '1234' and '1234 ' (with a space) are different.
            
            if (password === user.password) {
                resultElement.textContent = 'Valid credentials';
                resultElement.classList.add('valid');
                resultElement.classList.remove('invalid');
            } else {
                resultElement.textContent = 'Invalid credentials! Try again';
                resultElement.classList.add('invalid');
                resultElement.classList.remove('valid');

            }
            // Usernames are unique, so stop looking once we've found it.
            break;
        }
    }
    
    if (!userFound) {
        // Show the SAME message as for a wrong password. If the page said
        // "no such user", an attacker could use it to find out which
        // usernames exist, and then only need to guess their passwords.
        resultElement.textContent = 'User not found!';
        resultElement.classList.add('invalid');
        resultElement.classList.remove('valid');

    }

    // Clear both fields for the next attempt.
    validationForm.reset();
    userNameInput.focus();
});

// TRY IT:
//   - Replace the for...of loop with
//         const user = users.find(u => u.username === userName);
//     find() returns the first matching object, or undefined if there's none.
//   - Show the result in a <p> under the form (with textContent) instead of
//     alert(). Make it green for success and red for failure using classList.
//   - Lock the form (disable the button) after 3 failed attempts.
