const fruitList = document.querySelector('#fruits');
const updateButton = document.querySelector('#update_list');
const removeButton = document.querySelector('#remove_fruit');
const removeAllButton = document.querySelector('#remove_all');
let updateCount = 1;



updateButton.addEventListener('click',()=>{

    let newFruit = document.createElement('li');
    
    switch(updateCount++){
        case 1:
            newFruit.textContent = 'Mango';
            fruitList.append(newFruit); // add element as the last child of the parent
            break;

        case 2:
            newFruit.textContent = 'Sitaphal';
            fruitList.prepend(newFruit); // add element as the first child of the parent
            break;
        default:
            break;
    }
    
});

// removing an element from the page;
// we can use remove method, but this only removes the element from the DOM tree
// the element still sits in the memory but is not visible as it is removed from the DOM tree
removeButton.addEventListener('click',()=>{
    const fruitList = document.querySelectorAll('#fruits li');
    if(!fruitList.length) return; // fruit list is empty
    let lastElement = [...fruitList].pop(); // spread the NodeList to an array, then pop the last element
    lastElement.remove();
});

// all the elements can be removed from a list 
// by setting the innerHTML of the list as an empty string
// this is the only place where the use of innerHTML is acceptable
removeAllButton.addEventListener('click',()=>{
    fruitList.innerHTML = ''
})

const listEl = document.querySelector('#add_here');

// inserting element before the  the selected element
let newElement = document.createElement('li');
newElement.textContent = 'Two';
listEl.before(newElement);

// inserting element after the  the selected element
let newElement_2 = document.createElement('li');

newElement_2.textContent = 'Four';
listEl.after(newElement_2);


// building a list from JS it self
const names = ['Ann','Camile','Bob','Jeery','Zed'];


document.body.append(document.createElement('hr')); // add a horizontal line

const nameList = document.createElement('ul'); // creating a list element
document.body.append(nameList); // add name list to the document

for(const name of names){
    let listElement = document.createElement('li');
    listElement.textContent = name;
    nameList.append(listElement);
}