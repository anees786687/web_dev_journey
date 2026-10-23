/**
 * PROJECT: Image viewer
 * ---------------------
 * A large image with a row of thumbnails under it. Click a thumbnail to
 * show it in the big view, add your own images from your computer, and
 * remove the selected one.
 *
 * How it works:
 *   1. The selected thumbnail has the class "selected" (style.css draws an
 *      outline around it). Exactly one thumbnail has it at any time.
 *   2. ONE click listener on the <ul> handles clicks on every thumbnail,
 *      including ones added later (event delegation).
 *   3. "Add" opens a hidden <input type="file">. Each chosen file becomes
 *      a new <li><img></li> at the end of the list.
 *   4. "Remove" deletes the selected thumbnail and selects the next one.
 *      When the last one is gone, the big image is hidden and a message
 *      is shown instead.
 *
 * HOW TO RUN: open index.html in a browser. Images you add are only kept
 * until the page is refreshed.
 */


// ============================================================
// 1. FIND THE ELEMENTS
// ============================================================
const mainImg = document.querySelector('.current_animal img');
// querySelectorAll returns a snapshot: it does NOT update by itself when
// thumbnails are added or removed, so it's re-queried after every change.
let thumbnailList = document.querySelectorAll('.animal_thumbnails img');
const addBtn = document.querySelector('.add');
const removeBtn = document.querySelector('.remove');
/** @type {HTMLInputElement} */
const filePicker = document.querySelector('#file_picker');
const thumbnailUl = document.querySelector('.animal_thumbnails ul');
const finalMsg = document.querySelector('.display_container > p');

let thumbnailListLen = thumbnailList.length;


// ============================================================
// 2. CLICK A THUMBNAIL TO SHOW IT
// ============================================================
// The listener is on the <ul>, not on each <img>. A click on an image
// "bubbles up" to the <ul>, and event.target tells us which image it was.
// This way, images added later work too, with no extra listeners.
thumbnailUl.addEventListener('click',(event)=>{
    // Ignore clicks on the gaps between thumbnails.
    if(event.target.tagName === 'IMG'){
        const previous = thumbnailUl.querySelector('.selected');
        if(previous)
            previous.classList.remove('selected');

        event.target.classList.add('selected');
        // Copy alt as well as src, so screen readers describe the right image.
        mainImg.src = event.target.src;
        mainImg.alt = event.target.alt;

    }
})


// ============================================================
// 3. ADD IMAGES FROM THE USER'S COMPUTER
// ============================================================
// The file input is `hidden` in index.html because it's hard to style.
// The Add button "clicks" it for us, which opens the file dialog.
addBtn.addEventListener('click',()=>{
    filePicker.click();
});

// 'change' fires once the user has picked one or more files.
filePicker.addEventListener('change',()=>{
    for(const file of filePicker.files){
        // `accept` in the HTML only filters what the dialog shows; the user
        // can still pick any file. So check the type here as well.
        if(file.type !== 'image/jpeg' && file.type !== 'image/png'){
            alert('invalid file type!');
            continue;
        }

        const li = document.createElement('li');
        const img = document.createElement('img');
        // A temporary "blob:" URL that points at the file in memory.
        // It only lasts until the page is closed or refreshed.
        img.src = URL.createObjectURL(file);
        // Use the file name without its extension as the alt text.
        img.alt = file.name.slice(0,file.name.lastIndexOf('.'));
        li.appendChild(img);
        thumbnailUl.appendChild(li);

        // If the list was empty, this image becomes the selected one.
        if(thumbnailListLen === 0){
            finalMsg.textContent = '';
            mainImg.src = img.src;
            mainImg.alt = img.alt
            img.classList.add('selected');
            mainImg.hidden = false;
        }
        thumbnailListLen++;
    }
    // Clear the input. Otherwise picking the same file twice in a row
    // wouldn't fire 'change', because the value wouldn't have changed.
    filePicker.value = ''
    thumbnailList = document.querySelectorAll('.animal_thumbnails img');
    thumbnailListLen = thumbnailList.length

});


// ============================================================
// 4. REMOVE THE SELECTED IMAGE
// ============================================================
removeBtn.addEventListener('click',()=>{
    // Nothing to remove. Without this, selectedElement below would be
    // undefined and the page would throw a TypeError.
    if(!thumbnailListLen) return;

    let selectedElement,newSelectedElement, selectedParentElement;
    for(let i = 0; i < thumbnailList.length; i++){
        if(thumbnailList[i].classList.contains('selected')){
            selectedElement = thumbnailList[i];
            // The next thumbnail gets selected. % wraps around, so removing
            // the last one selects the first.
            newSelectedElement = thumbnailList[(i + 1) % thumbnailList.length]
            selectedParentElement = thumbnailList[i].parentElement;

            break;
        }
    }
    // Remove the whole <li>, not just the <img>, so no empty list item is left.
    selectedElement.classList.remove('selected');
    selectedElement.remove();
    selectedParentElement.remove();
    newSelectedElement.classList.add('selected');
    mainImg.setAttribute('src',newSelectedElement.getAttribute('src'));
    mainImg.setAttribute('alt',newSelectedElement.getAttribute('alt'));



    thumbnailList = document.querySelectorAll('.animal_thumbnails img');
    thumbnailListLen = thumbnailList.length;

    // This check must come AFTER the removal. When only one image was left,
    // newSelectedElement is the image that was just removed, so the big
    // image would otherwise keep showing it.
    if(thumbnailListLen === 0){
        mainImg.hidden = true;
        finalMsg.textContent = 'No more images! Please refresh or add new images!';
    }
})

// TRY IT:
//   - Add "Previous" and "Next" buttons, or use the arrow keys
//     (listen for 'keydown' on document and check event.key).
//   - Free the memory of a removed image with URL.revokeObjectURL(src),
//     but only for images that were added (their src starts with "blob:").
//   - Drop the thumbnailList / thumbnailListLen variables and read the DOM
//     when you need it: thumbnailUl.querySelector('.selected') and
//     thumbnailUl.children.length.
//   - Wrap each thumbnail in a <button> so it can be reached with Tab
//     (use event.target.closest('button') in the click listener).
