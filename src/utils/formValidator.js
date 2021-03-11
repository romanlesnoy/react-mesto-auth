import { validationElements } from '../utils/utils.js';


class FormValidator {
    constructor (settings, form) {
        this._form = document.querySelector(form);
        console.log(this._form);
        this._inputElements = Array.from(this._form.querySelectorAll(settings.inputSelector));
        this._submitButton = this._form.querySelector(settings.submitButtonSelector);
        this._inactiveButtonStatus = settings.inactiveButtonClass;
        this._inputError = settings.inputErrorClass;
    }

    _showError(inputElement) {
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
        errorElement.textContent = inputElement.validationMessage;
        console.log(inputElement.validationMessage)
        inputElement.classList.add(this._inputError);
    }
    
    _hideError(inputElement) {
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
        errorElement.textContent = " ";
        inputElement.classList.remove(this._inputError);
    }

    _checkInputValidity(inputElement) {
        console.log(inputElement)
        if (inputElement.checkValidity()) {
            this._hideError (inputElement);
        } else {
            this._showError(inputElement);
        }
    }

    toggleButtonState() {
        if (this._form.checkValidity()) {
            this._submitButton.classList.remove(this._inactiveButtonStatus);
            this._submitButton.disabled = false;
        } else {
            this._submitButton.classList.add(this._inactiveButtonStatus);
            this._submitButton.disabled = true;
        }
    }

    resetErrorMessage() {
        this._inputElements.forEach((inputElement) => {
            this._hideError(inputElement);
        })
    }

    _setEventListeners() {
        this._form.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        this._inputElements.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                console.log('input');
                this._checkInputValidity(inputElement);
                this.toggleButtonState();
            });
        });
    }
    
    enableValidation() {
        console.log("work")
        this._setEventListeners();
    }
}

const validationForm = () =>  {
    const formsValidator = new FormValidator(validationElements, validationElements.formSelector);
    formsValidator.enableValidation();
}

export default validationForm;