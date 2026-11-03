const moleContainers = document.querySelectorAll('.mole-container');
const moleGrid = document.querySelector('#mole-grid-container')
const scoreBoard = document.querySelector('#scoreboard');
const moleContainersArray = [...moleContainers];
const MIN_MOLE_CONTAINER = 1;
const MAX_MOLE_CONTAINER = 16;

let timeoutIDArray = new Array(16).fill(0);
let score = 0;

moleGrid.addEventListener('click',(event)=>{
    // if the click event is not done on an img, do nothing!
    if(event.target.localName !== 'img'){
        return;
    }
    // get the img index from its data-index attribute (set in moleSurfaced).
    // dataset values are strings, so convert to a number; -1 because
    // container ids run 1-16 but array indices run 0-15
    const index = Number(event.target.dataset.index) - 1;
    // cleat the timeout using tid
    clearTimeout(timeoutIDArray[index]);

    // set the element at the pos to be 0
    timeoutIDArray[index] = 0;
    
    // remove the element on which the event has occurred
    // aka remove the mole
    event.target.remove();

    // update the score 
    scoreBoard.textContent = `Score: ${++score}`;

});

function getRandomMoleContainer(){
    return Math.floor(Math.random() * (MAX_MOLE_CONTAINER - MIN_MOLE_CONTAINER + 1)) + MIN_MOLE_CONTAINER;
}

function moleSurfaced(){
    // get a random number
    let divID = getRandomMoleContainer();

    // search the list of containers and match the gotten
    // random number with the ID of every container
    for(const container of moleContainersArray){
        // once you got that container 
        if(divID === Number(container.id)){
            // add the mole image to that container
            if(container.querySelector('img')){
                return;
            }
            let img = document.createElement('img');
            img.src = 'mole.jpeg';
            img.classList.add('img-size'); // size the img
            // store which container this mole belongs to.
            // why not img.id = divID? the container div already has
            // that id, and ids must be unique on the page (with duplicate
            // ids, getElementById only ever returns the first match).
            //
            // dataset = custom data-* attributes. setting img.dataset.index = 5
            // adds data-index="5" to the HTML: <img data-index="5">.
            // they're meant for storing your own extra info on an element
            // without misusing built-in attributes like id or class.
            // note: dataset values are always strings, hence Number() when reading.
            img.dataset.index = divID;
            container.append(img); // add img to the div

            // set a timeout for how long the mole img is gonna be shown
            let tid = setTimeout(() => {
                container.removeChild(img);
            }, 5000);

            // append the timer id to list; this will be used 
            // when click event appers on the mole img
            timeoutIDArray[divID - 1] = tid;
        }
    }
}

function gameLoop(){
    setInterval(() => {
        moleSurfaced();
    }, 2000);
}

gameLoop();