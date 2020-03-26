/**
 * caputre input from form field
 */

const inviteeForm = document.querySelector('#registrar');
const newGuestInput = document.querySelector('.registarar__input__name');
const mainDiv = document.querySelector('div.main');
const guestList = document.querySelector('#invitedList');

/**
 * Create a section for the guest list filter
 */

const div = document.createElement('div');
const filterCheckBox = document.createElement('input');
filterCheckBox.type = 'Checkbox';
const filterLabel = document.createElement('label');
filterLabel.textContent = `Hide those who haven't reponded`;

div.appendChild(filterCheckBox);
div.appendChild(filterLabel);
mainDiv.insertBefore(div, guestList );

/**
 * When selected, filter unconfirmed guests
 */
filterCheckBox.addEventListener('change', (e)=>{
    const isChecked = e.target.checked;
    const lis = guestList.children;
    if (isChecked){
        //hide unconfirmed guests
        for (let i = 0; i < lis.length; i += 1){
            let li = lis[i];
            if (li.className === 'responded') {
                li.style.display = '';
            } else {
                li.style.display = 'none';
            }
        }
    } else {
        //show all guests, including unconfirmed guests
        for (let i = 0; i < lis.length; i += 1){
            let li = lis[i];
            li.style.display = '';
        }
    }
});

/**
 * Build guest entry function(s)
 */
function buildGuestListEntry(newGuest) {
    //Build a new guest list entry
    const guestListEntry = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = newGuest;
    guestListEntry.appendChild(span);
    
    ////Add a 'Confirmed' label with corresponding checkbox
    const confirmLabel = document.createElement('label');
    confirmLabel.textContent = 'Confirmed';
    
    const confirmCheckbox = document.createElement('input');
    confirmCheckbox.type = 'Checkbox';
    confirmLabel.appendChild(confirmCheckbox);
    guestListEntry.appendChild(confirmLabel);

    ////Option to edit guest list entry
    const editGuestButton = document.createElement('button');
    editGuestButton.textContent = 'Edit';
    editGuestButton.className = 'guestListEntry__editGuestButton';
    guestListEntry.appendChild(editGuestButton);
    
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
 * Change the style of the guest list entry when status is confirmed
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

guestList.addEventListener('click', (e) =>{
    const button = e.target;
    const li = e.target.parentNode;

    //remove guest
    if (button.className === 'guestListEntry__removeGuestButton'){
        const li = e.target.parentNode;
        const ul = li.parentNode;
        ul.removeChild(li);
    } 
    //edit guest 
    else if (button.className === 'guestListEntry__editGuestButton') {
        const span = li.firstElementChild;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = span.textContent;
        li.insertBefore(input, span);
        li.removeChild(span);
        button.textContent = 'Save';
        button.className = 'guestListEntry__editGuestButton--save';
    }
    //save updated guest name
    else if (button.className === 'guestListEntry__editGuestButton--save'){
        const input = li.firstElementChild;
        const span = document.createElement('span');
        span.textContent = input.value;
        li.insertBefore(span, input);
        li.removeChild(input);
        button.textContent = 'Edit';
        button.className = 'guestListEntry__editGuestButton';
    }
});