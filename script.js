function popup(){
    const popupContainer = document.createElement("div");

    popupContainer.innerHTML = `
    <div id="popupContainer">
    <h1>New Note</h1>
    <textarea id="note-text" placeholder="Enter your note..."></textarea>
    
    <div id="btn-container">
    <button id="submitBtn" onclick="createNote()">Create Note</button>
    <button id="closeBtn" onclick="closePopup()">Close</button>
    </div>
</div>
    `;
    document.body.appendChild(popupContainer);
} 

function closePopup(){
    const popupContainer = document.getElementById("popupContainer");           // we are getting the popContainer element by Id so that we can close it in our func.

    if(popupContainer){
        popupContainer.remove();
    }
}

function createNote(){
    const popupContainer = document.getElementById("popupContainer");              // First we will get the references of the popupContainer and textarea element with id "note-text"
    const noteText = document.getElementById("note-text").value;
    
    if(noteText.trim() !== ''){                                                  // We are checking if noteText is not empty, if it is not empty then create "note" object in which we have "timestamp" as 'id' and "noteText" as 'text'.
        const note = {
            id: new Date().getTime(),
            text: noteText
        };

    const existingNotes = JSON.parse(localStorage.getItem('notes')) || [];              // Here we are retrieving or getting existing notes from the local storage and storing it into existingNotes OR if we are not able to get notes from the local storage then create new array i.e []
    existingNotes.push(note); 

    localStorage.setItem('notes', JSON.stringify(existingNotes));                       // Whatever notes we have edited, store it in the Local Storage. We are basically saving or storing the updated notes in the local storage. Note - whenever we set items in the local storage, set it as key-value pair

    document.getElementById('note-text').value = '';                                    // We are clearing the "note-text" value or input. We are basically clearing the whole "textarea" 

    popupContainer.remove();                                                            // Close the popup
    displayNotes();                                                                     // after closing popup container we are going to refresh displayNotes by calling the display notes function.
  }
}

function displayNotes(){
    const notesList = document.getElementById("notes-list");
    notesList.innerHTML = '';                                                          // Empty or clear the contents of the existing notes.
    
    const notes = JSON.parse(localStorage.getItem('notes')) || [];                     // After creating notes or updating notes, return the notes present in the local storage and display it on page OR if no notes are there then create empty object i.e empty array 
    
    notes.forEach(note => {
        const listItem = document.createElement("li");                                 // We are going to iterate over each note and create a listItem for each note.

        listItem.innerHTML = `      
        <span>${note.text.replace(/\n/g, '<br>')}</span>
        <div id="noteBtns-container">
        <button id="editBtn" onclick="editNote(${note.id})"><i class="fa-solid fa-pen"></i></button>         
        <button id="deleteBtn" onclick="deleteNote(${note.id})"><i class="fa-solid fa-trash"></i></button>
        </div>    
        `;
        notesList.appendChild(listItem);          // for every note, we are creating listItem and for every listItem there will be Notes in text format and two buttons - one is edit btn and other is delete btn so we are creating each each buttons using java script and on clicking those btns we are calling their functions are parsing the value in the parenthesis which is coming from "note" object that we have created while creating the new notes. NOte - Inside buttons we are putting "<i>" i.e icons or fonts from fa (font awesome). For editing btn, we are using "pen" symbol and for deleting button, we are using "Trash can" symbol
    });
}

function editNote(noteId){
    const notes = JSON.parse(localStorage.getItem('notes')) || [];       // return all the existing notes in the local storage
    const noteToEdit = notes.find(note => note.id == noteId);          // In Notes, find the node to edit based on the Id i.e if any note's id match with required noteId, then edit that 'note'
    const noteText =  noteToEdit ? noteToEdit.text : '';                 // If note to edit is present then return its text otherwise return an empty string
    const editingPopup = document.createElement('div');                  // creating new div element to hold the editing popup content

    editingPopup.innerHTML = `
    <div id="editing-container" data-note-id="${noteId}">
    <h1>Edit Note</h1>
    <textarea id="note-text">${noteText}</textarea>
    <div id="btn-container">
        <button id="submitBtn" onclick="updateNote()">Done</button>
        <button id="closeBtn" onclick="closeEditPopup()">Cancel</button>
    </div>
</div>
    `;
    document.body.appendChild(editingPopup);                                  // append the editing popup to the body of the document
}

function closeEditPopup(){                                                      // We are creating this function to close edit note popup so for that first we are getting div element called "editing-contaienr" by id and then we are checking if it is present or not
    const editingPopup = document.getElementById("editing-container");

    if(editingPopup){
        editingPopup.remove();
    }
}

function updateNote(){
  const noteText = document.getElementById("note-text").value.trim();                 // Second thing we need is updated/edited note text which we will get from the "textarea"
  const editingPopup = document.getElementById("editing-container");                  // To create the update note func. we are gonna need two things, first is editing popup container which we will get by its id
  
  if (noteText !== '') {
    // if the updated note text is not empty then we will first get the "id of Note" from the "data-note-id" attribute which i have created inside the "editing-container" div
    const noteId = editingPopup.getAttribute("data-note-id");
    let notes = JSON.parse(localStorage.getItem("notes")) || [];                       // Then get the updated or edited notes form the local storage, if not present then create or return an empty array

    // Find the note to update
    const updatedNotes = notes.map(note => {
      if (note.id == noteId) {
        return { id: note.id, text: noteText };                                        // We are iterating through the notes to find note with id as noteID and if we get the note which we want to update then we will replace its text with the updated text
      }
      return note;
    });

    // Update the notes in the local storage
    localStorage.setItem("notes", JSON.stringify(updatedNotes));

    // Close the editing popup container
    editingPopup.remove();

    // Refresh the displayed notes by calling displayNotes() again
    displayNotes();
  }
}

function deleteNote(noteId){
    let notes = JSON.parse(localStorage.getItem('notes')) || [];                               // retrive all the existing notes from the local storage
    
    notes = notes.filter(note => note.id !== noteId);                                          // Filter out the note with the specified Id

    localStorage.setItem("notes", JSON.stringify(notes));                                       // save the updated notes to the local storage
    displayNotes();                                                                             // refresh the display notes again by calling it out. 
}

displayNotes();                                                                                 // Outside all the functions, don't forget to call displayNotes() so that when the page loads, it will display all the notes




