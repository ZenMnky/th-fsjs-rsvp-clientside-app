document.addEventListener('DOMContentLoaded', () => {
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
     * Build Guest-Entry functions
     */
    function buildGuestListEntry(newGuest) {
        
        /**
         * createElement fuction
         */
        function createElement(elementName, propertyName, propertyValue, assignClass){
            const element = document.createElement(elementName);
            element[propertyName] = propertyValue;
            if (assignClass != ''){
                element.className = assignClass;
            }
            return element;
        }

        /**
         * Function to append to Guest List
         */
        function appendToGuestList(elementName, propertyName, propertyValue, assignClass){
            const element = createElement(elementName, propertyName, propertyValue, assignClass);
            guestListEntry.appendChild(element);
            return element;
        }
        
        //Build a new guest list entry
        const guestListEntry = document.createElement('li');
        appendToGuestList('span', 'textContent', newGuest, '');
        
        ////Add a 'Confirmed' label with corresponding checkbox
        appendToGuestList('label', 'textContent', 'Confirmed', '')
            .appendChild(createElement('input', 'type', 'Checkbox', ''));

        ////Option to edit guest list entry
        appendToGuestList('button', 'textContent', 'Edit', 'guestListEntry__editGuestButton');
                
        ////Option to remove guest from guest list with the click of a button
        appendToGuestList('button', 'textContent', 'Remove Guest', 'guestListEntry__removeGuestButton');
        
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
        const ul = li.parentNode;
        const action = button.className;

        const nameActions = {
            remove: () => {
                ul.removeChild(li);
            },
            edit: () => {
                const span = li.firstElementChild;
                const input = document.createElement('input');
                input.type = 'text';
                input.value = span.textContent;
                li.insertBefore(input, span);
                li.removeChild(span);
                button.textContent = 'Save';
                button.className = 'guestListEntry__editGuestButton--save';
            },
            save: () => {
                const input = li.firstElementChild;
                const span = document.createElement('span');
                span.textContent = input.value;
                li.insertBefore(span, input);
                li.removeChild(input);
                button.textContent = 'Edit';
                button.className = 'guestListEntry__editGuestButton';
            }
        };   

        //Select and run conditional button action
        if (action === 'guestListEntry__removeGuestButton'){  
            nameActions.remove();
        } else if (action === 'guestListEntry__editGuestButton') {
            nameActions.edit();
        } else if (action === 'guestListEntry__editGuestButton--save'){
            nameActions.save();
        }
    });
});