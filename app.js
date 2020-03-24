/**
 * caputre input from form field
 */

const inviteeForm = document.querySelector('#registrar');
const newGuestInput = document.querySelector('.registarar__input__name');
const guestList = document.querySelector('#invitedList');


/**
 * add guest to the guest list
 */
inviteeForm.addEventListener('submit', (e) => {
    //prevent form from refresing when submitted
    e.preventDefault();
    
    //capture name of new guest, then reset input field
    const newGuest = newGuestInput.value;
    newGuestInput.value = '';
    
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
    guestListEntry.appendChild(removeGuestButton);
    /**
     * Taking a break. Still need to add functionality to the removeGuestButton.
     */
   
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