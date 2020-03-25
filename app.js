/**
 * caputre input from form field
 */

const inviteeForm = document.querySelector('#registrar');
const newGuestInput = document.querySelector('.registarar__input__name');
const guestList = document.querySelector('#invitedList');

/**
 * Build guest entry function(s)
 */
function buildGuestListEntry(newGuest) {
    //Build a new guest list entry
    const guestListEntry = document.createElement('li');
    guestListEntry.textContent = newGuest;
    
    ////Add a 'Confirmed' label with corresponding checkbox
    const confirmLabel = document.createElement('label');
    confirmLabel.textContent = 'Confirmed';
    
    const confirmCheckbox = document.createElement('input');
    confirmCheckbox.type = 'Checkbox';
    confirmLabel.appendChild(confirmCheckbox);
    guestListEntry.appendChild(confirmLabel);
    
    ////Option to remove guest from guest list with the click of a button
    const removeGuestButton = document.createElement('button');
    removeGuestButton.textContent = 'Remove Guest';
    removeGuestButton.className = 'guestListEntry__removeGuestButton';
    guestListEntry.appendChild(removeGuestButton);

    return guestListEntry;
}

/**
 * add guest to the guest list
 */
inviteeForm.addEventListener('submit', (e) => {
    //prevent form from refresing when submitted
    e.preventDefault();
    
    //capture name of new guest, then reset input field
    const newGuest = newGuestInput.value;
    newGuestInput.value = '';
    
    //build new guest list entry
    const guestListEntry = buildGuestListEntry(newGuest);
   
    //add to the existing guest list :)
    guestList.appendChild(guestListEntry);
});

/**
 * Change the style of confirmLabel when the checkbox is clicked (changed)
 */
guestList.addEventListener('change', (e) =>{
    const checkBox = e.target;
    const checked = checkBox.checked;
    const guestListEntry = checkBox.parentNode.parentNode;
    
    if (checked) {
        guestListEntry.className = 'responded';
    } else {
        guestListEntry.className = '';
    }
});

/**
 * Remove guest from the list when the button is clicked
 */
guestList.addEventListener('click', (e) =>{
    if (e.target.className === 'guestListEntry__removeGuestButton'){
        const li = e.target.parentNode;
        const ul = li.parentNode;
        ul.removeChild(li);
    }
});