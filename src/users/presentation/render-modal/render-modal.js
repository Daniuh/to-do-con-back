import modalHtml from './render-modal.html?raw';
import { User } from '../../models/user';
import { getUserById } from '../../use-cases/get-user-by-id';
import './render-modal.css';

let modal, form;
let loadedUser = {};

/**
 * @param {string|number} id
 */
export const showModal = async (id) => {
    modal?.classList.remove('hide-modal');
    loadedUser = {};

    if(!id) return;
    const user = await getUserById(id);
    setFormValues(user);
}

export const hideModal = () => {
    modal?.classList.add('hide-modal');
    form?.reset();
}

/**
 * @param {User} user 
 */
const setFormValues = (user) => {
    form.querySelector('[name="firstName"]').value = user.firstName;
    form.querySelector('[name="lastName"]').value = user.lastName;
    form.querySelector('[name="gender"]').value = user.gender;
    form.querySelector('[name="balance"]').value = user.balance;
    form.querySelector('[name="isActive"]').checked = user.isActive;
    loadedUser = user;
}

/**
 * @param {HTMLDivElement} element
 * @param {(userLike) => Promise<void>} saveUserCallback
 */
export const renderModal = (element, saveUserCallback) => {
    if(modal) return;

    modal = document.createElement('div');
    modal.innerHTML = modalHtml;
    modal.className = 'modal-container hide-modal';

    form = modal.querySelector('form');

    const modalDialog = modal.querySelector('.modal-dialog');

    modal.addEventListener('click', (event) => {
        if(event.target.classList.contains('modal-container') || event.target.classList.contains('span-x') || event.target.classList.contains('span-img')){
            modalDialog.classList.add('hide-animated');

            setTimeout(() => {
            hideModal();
            modalDialog.classList.remove('hide-animated');
            }, 300);
        }
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const formData = new FormData(form);
        const userLike = {...loadedUser};

        if(!formData.get('isActive')){
            formData.append('isActive', 'off');
        }

        for(const [key, value] of formData){
            if(key === 'balance'){
                userLike[key] = +value;
                continue;
            }

            if(key === 'isActive'){
                userLike[key] = (value === 'on') ? true : false;
                continue;
            }

            userLike[key] = value;
        }
        console.log(userLike);
        
        await saveUserCallback(userLike);
        //console.log(userLike);
        hideModal();
    });

    element.append(modal);
}