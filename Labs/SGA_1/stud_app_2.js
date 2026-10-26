const nameInput = document.querySelector('#name');
const dobInput = document.querySelector('#dob');
const ageOutput = document.querySelector('#age');
const mobileNumberInput = document.querySelector('#mobile_number');
const emailIDInput = document.querySelector('#email_id');
const submitButton = document.querySelector('#submit_btn');
const retrievePage = document.querySelector('#retrieve_page');
// nameInput.
const rules = {
    name: {
        pattern: /^[a-zA-Z ]+$/,
        ok: 'Valid name!',
        not_ok: 'Invalid name!'
    },

    mobile_number: {
        pattern: /^[1-9][0-9]{9}$/,
        ok: 'Valid mobile number!',
        not_ok: 'Invalid mobile number!'
    },
    
    email_id: {
        pattern: /^[^@]+@[^@]+\.(com|in)$/,
        ok: 'Valid email!',
        not_ok: 'Invalid email!'
    }
}
function printOutput(notif,valid,message){
    notif.textContent = message;
    notif.classList.toggle('red', !valid);
    notif.classList.toggle('green', valid);
}

function checkSubmissionValid(){
    let inputResults = document.querySelectorAll('.input_n_warning p')
    let valid = [...inputResults].every(inputResults=>inputResults.classList.contains('green'));
    submitButton.disabled = !valid;
}


// adding event delegation to events that occurs from name, email, mobile inputs
document.querySelector('form').addEventListener('focusout',(event)=>{
    let input = event.target;
    let rule = rules[input.id];
    if(!rule) return;
    console.log(input);
    let valid = rule.pattern.test(input.value);
    let notif = input.nextElementSibling;
    printOutput(notif,valid, valid ? rule.ok : rule.not_ok);
    checkSubmissionValid();
})

// validating DOB
dobInput.addEventListener('focusout', ()=>{
    let pattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    let notif = document.querySelector('#dob + p');
    let match = dobInput.value.match(pattern);

    if(!match){
        printOutput(notif,match,'Invalid DOB! Please try again!');
        dobInput.value = '';
        ageOutput.textContent = '';
        return;
    }

   
    let selectedDay = Number(match[1]);
    let selectedMonth = Number(match[2]);
    let selectedYear = Number(match[3]);

    let selectedDate = new Date(selectedYear,selectedMonth - 1,selectedDay);
    let now = new Date();

    if(selectedDay !== selectedDate.getDate() || selectedMonth !== selectedDate.getMonth() + 1 || selectedDate > now){
        printOutput(notif,false,'Invalid DOB! Please try again!');
        dobInput.value = '';
        ageOutput.textContent = '';
        return;
    }

    let nowDay = now.getDate();
    let nowMonth = now.getMonth() + 1;
    let nowYear = now.getFullYear();

    let age;
    if(nowMonth > selectedMonth || (selectedMonth === nowMonth && nowDay >= selectedDay)){
        age = nowYear - selectedYear;
    }
    else{
        age = nowYear - selectedYear - 1;
    }

    ageOutput.textContent = age;
    printOutput(notif, true, 'Valid age!');
    checkSubmissionValid();
})



//student class
class Student{
    constructor(name,dob,age,mobile,email){
        this.name = name;
        this.dob = dob;
        this.age = age;
        this.mobile = mobile;
        this.email = email;
    }
}

// form submission; only possible once the submit button is enabled
document.querySelector('form').addEventListener('submit',(event)=>{
    event.preventDefault();

    let student = new Student(
        nameInput.value.trim(),
        dobInput.value,
        ageOutput.textContent,
        mobileNumberInput.value,
        emailIDInput.value
    );

    document.cookie = "student_" + student.mobile + "=" + encodeURIComponent(JSON.stringify(student)) + "; max-age=86400; path=/";

    document.querySelector('form').hidden = true;
    retrievePage.hidden = false;
})

let retrieveMobileNumber = document.querySelector('#retrieve_mobile');
let retrieveButton = document.querySelector('#retrieve');

function getCookie(name){
    let cookies = document.cookie.split('; ');

    for(const cookie of cookies){
        let [key,value] = cookie.split('=');
        if(key === name)
            return decodeURIComponent(value);
    }

    return null
}

retrieveButton.addEventListener('click',()=>{
    let studentCookie = getCookie('student_' + retrieveMobileNumber.value);
    if(studentCookie === null){
        alert('No such student information is stored as a cookie!');
        return;
    }

    let student = JSON.parse(studentCookie);
    alert(`
        Name: ${student.name} \n
        Date of Birth: ${student.dob} \n
        Age: ${student.age} \n
        Mobile Number: ${student.mobile} \n
        Email ID: ${student.email}
    `);
});