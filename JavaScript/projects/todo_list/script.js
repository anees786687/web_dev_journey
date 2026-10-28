/**
 * PROJECT: ToDo list
 * ------------------
 * Add todos, tick the ones you've finished and mark them complete, or
 * clear the whole list. Everything is saved in localStorage, so the list
 * is still there after a refresh or after closing the browser.
 *
 * How it works:
 *   1. `todos` (an array of objects) is the ONE source of truth. Every
 *      change is made to `todos` first, then the whole array is saved to
 *      localStorage as JSON.
 *   2. localStorage is only READ once, when the page loads, to fill
 *      `todos` and draw the saved list.
 *   3. Each todo looks like:
 *        { taskNo: 3, taskID: 'task_3', task: 'Eat', status: 'incomplete' }
 *      `taskID` is also the id of its checkbox, which is how a ticked
 *      checkbox is matched back to its object.
 *   4. A complete todo is drawn without a checkbox and with a green label.
 *
 * HOW TO RUN: open index.html in a browser. To see what's saved, open
 * DevTools (F12) → Application → Local storage.
 */


// ============================================================
// 1. FIND THE ELEMENTS AND SET UP THE STATE
// ============================================================
const todoContainer = document.querySelector('.todo_container');
const todoList = todoContainer.querySelector('ol');
const submitButton = todoContainer.querySelector('#submit_btn');
const removeButton = todoContainer.querySelector('#remove_btn');
const resetButton = todoContainer.querySelector('#reset_btn');
const todoForm = todoContainer.querySelector('form');
const info = todoContainer.querySelector('#info');

// The number the NEXT todo will get. localStorage only stores strings, so
// Number() turns "5" back into 5. On the first visit getItem returns null,
// Number(null) is 0, and `|| 1` starts the count at 1.
let taskNo = Number(localStorage.getItem('task_no')) || 1;

// The master list of todo objects. Filled in by loadToDoList().
let todos;


// ============================================================
// 2. LOAD THE SAVED LIST WHEN THE PAGE OPENS
// ============================================================
function loadToDoList(){
    // JSON.parse turns the saved string back into an array of objects.
    todos = JSON.parse(localStorage.getItem('todos')); 
    // if the above returns null, then set the todo to an empty array
    todos = todos ?? [];
    if(todos === undefined || todos.length === 0) return;
    // Only DRAW the saved todos here. Calling makeToDo() would push them
    // into `todos` again while we're looping over it (an endless loop).
    for(const todo of todos){
        renderTodo(todo.task, todo.taskNo, todo.status);
    }
}


// ============================================================
// 3. HELPERS
// ============================================================

// Shows a message under the textarea for 3 seconds, then hides it again.
function printMsg(msg){
    info.textContent = msg;
    info.removeAttribute('hidden')
    setTimeout(()=>{
        info.setAttribute('hidden','');
    }, 3000);
}

// Draws ONE todo on the page. It doesn't touch `todos` or localStorage.
function renderTodo(task, task_no, task_status){
   
    // li -> div -> (input,label)
    let taskLabel = `task_${task_no}`;
    const listElement = document.createElement('li');
    const divElement = document.createElement('div');
    // The div gets a DIFFERENT id from the checkbox. If both had the same
    // id, the label's `for` would point at the div (the first match), and
    // clicking the label wouldn't tick the box.
    divElement.setAttribute('id', `div_${taskLabel}`);

    const checkboxLabel = document.createElement('label');
    checkboxLabel.htmlFor = taskLabel;
    // textContent (not innerHTML), so typed text is never run as HTML.
    checkboxLabel.textContent = task;
    
    if(task_status === 'complete'){
        // Finished todos get no checkbox, so they can't be completed twice.
        checkboxLabel.style.backgroundColor = 'lightgreen';
    }
    else{
        const checkboxInput = document.createElement('input');
        checkboxInput.type = 'checkbox';
        checkboxInput.id = taskLabel;
        checkboxInput.name = taskLabel;
        divElement.appendChild(checkboxInput);
    }

    divElement.appendChild(checkboxLabel);
    listElement.appendChild(divElement);
    todoList.append(listElement);
    
}


// ============================================================
// 4. ADD A TODO
// ============================================================
function makeToDo(task){
    // displaying the task visually
    renderTodo(task, taskNo);

    // adding the task to local storage
    // `{taskNo, task}` is shorthand for `{taskNo: taskNo, task: task}`.
    todos.push({taskNo,taskID:`task_${taskNo}`,task, status: 'incomplete'});
    localStorage.setItem("todos", JSON.stringify(todos));
    // Increment BEFORE saving the counter, so the saved number is the next
    // free one. Saving first would make the next todo reuse this number.
    taskNo++;
    localStorage.setItem('task_no', taskNo);
    
    printMsg('ToDo added to list!');
}


// ============================================================
// 5. MARK TICKED TODOS AS COMPLETE
// ============================================================
// `checked` is an array of the ticked checkbox elements.
function removeToDo(checked){

    for(const check of checked){
        // Change the object inside `todos` itself, not a fresh copy read
        // from localStorage. Otherwise `todos` falls out of date, and the
        // next makeToDo() saves the old statuses over the new ones.
        let taskId = check.id;
        const todo = todos.find(t => t.taskID === taskId);
        todo.status = 'complete';
        // Hide the checkbox now. After a reload, renderTodo() leaves it out.
        check.setAttribute('hidden','');
        check.nextElementSibling.style.backgroundColor = 'lightgreen'
    }
    // Save once, after all the changes.
    localStorage.setItem('todos',JSON.stringify(todos));
    printMsg('Checked ToDos are marked as complete!')
}


// ============================================================
// 6. BUTTONS
// ============================================================

// "Add ToDo" is the form's submit button.
todoForm.addEventListener('submit',(event)=>{
    // A form submit reloads the page by default. Stop that.
    event.preventDefault();
    const todoTextArea = todoContainer.querySelector('#todo_txtarea');
    // Ignore empty or spaces-only todos.
    if(todoTextArea.value.trim() === "") return;
    makeToDo(todoTextArea.value);
    todoTextArea.value = '';
});

// "Remove ToDo" is type="button" in the HTML, so it doesn't submit the form.
removeButton.addEventListener('click', ()=>{
    // :checked matches only the ticked boxes. querySelectorAll returns a
    // NodeList, and [...doneList] turns it into a real array.
    const doneList = todoList.querySelectorAll('input[type="checkbox"]:checked');
    if(doneList.length === 0) return;
    removeToDo([...doneList]);
});

// "Reset ToDo list" clears the page, the saved data and the counter.
resetButton.addEventListener('click',()=>{
    todoList.innerHTML = '';
    // Note: clear() deletes EVERYTHING saved for this origin, not just this
    // app's two keys. removeItem('todos') / removeItem('task_no') wouldn't.
    localStorage.clear();
    taskNo = 1;
    todos = [];
    printMsg('ToDo list cleared')
})


// ============================================================
// 7. START
// ============================================================
loadToDoList();
