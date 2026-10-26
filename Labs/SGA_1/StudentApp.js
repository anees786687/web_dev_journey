const nameInput = document.querySelector('#name');
const dobInput = document.querySelector('#dob');
const mobileInput = document.querySelector('#mobile_number');
const ageOutput = document.querySelector('#age')
const emailInput = document.querySelector('#email_id');

// shows the message in the <p> right after the input, red if invalid, green if valid
function showResult(notif, valid, message) {
    notif.textContent = message;
    notif.classList.toggle('red', !valid);
    notif.classList.toggle('green', valid);
}

// checking name: only alphabets and spaces, not blank
nameInput.addEventListener('focusout', () => {
    let pattern = /^[a-zA-Z ]+$/;
    let notif = document.querySelector('#name + p');
    let valid = pattern.test(nameInput.value) && nameInput.value.trim() !== '';
    if(!valid){
        showResult(notif, false, 'Invalid name! Use only alphabets and spaces');
    }
    else{
        showResult(notif, true, 'Valid name');
    }
});

// checking DOB (dd/mm/yyyy) and calculating age
dobInput.addEventListener('focusout', () => {
    let pattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    let notif = document.querySelector('#dob + p');
    let match = dobInput.value.match(pattern);

    if(!match){
        showResult(notif, false, 'Invalid date! Use dd/mm/yyyy');
        ageOutput.textContent = '';
        return;
    }

    let selectedDay = Number(match[1]);
    let selectedMonth = Number(match[2]);
    let selectedYear = Number(match[3]);

    // new Date() rolls over bad dates (31/02 becomes 03/03), so check it didn't change
    let selected = new Date(selectedYear, selectedMonth - 1, selectedDay);
    let now = new Date();
    if(selected.getDate() !== selectedDay || selected.getMonth() + 1 !== selectedMonth || selected > now){
        showResult(notif, false, 'Invalid date! Use dd/mm/yyyy');
        ageOutput.textContent = '';
        return;
    }

    let nowDay = now.getDate();
    let nowMonth = now.getMonth() + 1;
    let nowYear = now.getFullYear();
    let age;

    if(nowMonth > selectedMonth || (nowMonth == selectedMonth && nowDay >= selectedDay) ){
        age = nowYear - selectedYear
    }
    else{
        age = nowYear - selectedYear - 1;
    }

    showResult(notif, true, 'Valid date');
    ageOutput.textContent = age;
})

// checking mobile number: exactly 10 digits, cannot start with 0
mobileInput.addEventListener('focusout', () => {
    let pattern = /^[1-9][0-9]{9}$/;
    let notif = document.querySelector('#mobile_number + p');
    let valid = pattern.test(mobileInput.value);
    if(!valid){
        mobileInput.value = '';
        showResult(notif, false, 'Invalid mobile number! Must be 10 digits, cannot start with 0');
    }
    else{
        showResult(notif, true, 'Valid mobile number');
    }
})

// checking email: has '@', doesn't start with '@', ends with .com or .in
emailInput.addEventListener('focusout', () => {
    let pattern = /^[^@]+@[^@]+\.(com|in)$/;
    let notif = document.querySelector('#email_id + p');
    let valid = pattern.test(emailInput.value);
    if(!valid){
        emailInput.value = '';
        showResult(notif, false, 'Invalid email! Must contain @ and end with .com or .in');
    }
    else{
        showResult(notif, true, 'Valid email');
    }
})

class Student {
    constructor(name, dob, age, mobile, email) {
        this.name = name;
        this.dob = dob;
        this.age = age;
        this.mobile = mobile;
        this.email = email;
    }
}

// on submit: save the student in a cookie (named after the mobile number) and go to the next page
document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();

    // every field shows a green message only once it has passed its check
    let notifs = document.querySelectorAll('.input_n_warning p');
    let allValid = [...notifs].every(notif => notif.classList.contains('green'));
    if(!allValid){
        alert('Please fill in all the fields correctly before submitting');
        return;
    }

    let student = new Student(
        nameInput.value.trim(),
        dobInput.value,
        ageOutput.textContent,
        mobileInput.value,
        emailInput.value
    );

    document.cookie = 'student_' + student.mobile + '=' + encodeURIComponent(JSON.stringify(student)) + '; max-age=86400; path=/';

    // move to the next page: hide the form, show the retrieve section
    document.querySelector('form').hidden = true;
    retrievePage.hidden = false;
})

const retrievePage = document.querySelector('#retrieve_page');
const retrieveMobileInput = document.querySelector('#retrieve_mobile');
const retrieveButton = document.querySelector('#retrieve');

// returns the value of the cookie with this name, or null if there isn't one
function getCookie(name) {
    let cookies = document.cookie.split('; ');
    for(let cookie of cookies){
        let [key, value] = cookie.split('=');
        if(key === name){
            return decodeURIComponent(value);
        }
    }
    return null;
}

retrieveButton.addEventListener('click', () => {
    let saved = getCookie('student_' + retrieveMobileInput.value.trim());
    if(saved === null){
        alert('No details found for this mobile number');
        return;
    }

    let student = JSON.parse(saved);
    alert(
        'Name: ' + student.name + '\n' +
        'Date of Birth: ' + student.dob + '\n' +
        'Age: ' + student.age + '\n' +
        'Mobile Number: ' + student.mobile + '\n' +
        'Email ID: ' + student.email
    );
})
