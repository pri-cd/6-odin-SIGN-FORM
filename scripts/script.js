const IDFname = "fname";
const IDLname = "lname";
const IDEmail = "email";
const IDPhone = "phoneNumber";
const IDPasswd = "passwd";
const IDCnfPasswd = "passwdCF";
const DEBUG = true;

let inputPassword = "";
let validInput = false;

function debug(...args) {
    console.log(...args);
}

/**
 * @param {HTMLInputElement} element 
 * @param {string} message 
 */
function handleInputErrors(element, message) {
    if (element.parentElement instanceof HTMLElement) {
        const errElement = element.parentElement.querySelector('span');
        errElement.textContent = message;
        errElement.style.display = "inline";
        element.style.border = "2px solid red";
    }
}

/**
 * 
 * @param {HTMLElement} element 
 */
function clearErrors(element) {
    if (element.parentElement instanceof HTMLElement) {
        const errElement = element.parentElement.querySelector('span');
        errElement.textContent = "";
        errElement.style.display = "none";
        element.style.border = "";
    }
}

/**
 * Handles validation for First & Last Names.
 * @param {HTMLInputElement} input 
 */
function validateName(input) {
    const value = input.value;

    if (value.length > 2 && value.length < 20) {
        if (!/^[A-Za-z' -]+$/.test(value)) {
            handleInputErrors(input, "Only letters, spaces, apostrophe, and hyphen are allowed");
            validInput = false;
            return;
        }
        validInput = true;
        clearErrors(input);
        return;
    }
    handleInputErrors(input, "Name should be between 2 or 20 aplhabets.");
    validInput = false;
}

/**
 * Handles validation for Email.
 * @param {HTMLInputElement} input 
 */
function validateEmail(input) {
    if (input.validity.typeMismatch) {
        handleInputErrors(input, "The entered email is invalid.");
        validInput = false;
        return;
    }
    clearErrors(input);
    validInput = true;
}

/**
 * Handles validation for Phone Number.
 * @param {HTMLInputElement} input 
 */
function validatePhone(input) {
    if (input.validity.patternMismatch) {
        handleInputErrors(input, "The entered phone number is invalid");
        validInput = false;
        return;
    }

    clearErrors(input);
    validInput = true;
}

/**
 * 
 * @param {HTMLInputElement} input 
 * @param {boolean} confirm 
 */
function validatePasswd(input, confirm = false) {


    if (confirm) {
        debug(input.value.trim().localeCompare(inputPassword));
        if (input.value.localeCompare(inputPassword) !== 0) {
            handleInputErrors(input, "The field doesn't match 'Password' field.");
            validInput = false;
            return;
        }
        clearErrors(input);
        validInput = true;
    }
    else {
        if (input.validity.tooLong || input.validity.tooShort) {
            handleInputErrors(input, "Password should be between 5 to 15 characters long.");
            validInput = false;
            return;
        }

        inputPassword = input.value;
        clearErrors(input);
    }
}

/**
 * This function validates all fields.
 * @param {Event} event 
 */
function handleInputValidation(event) {
    const input = event.target;
    if (input instanceof HTMLInputElement) {

        switch (input.id) {
            case IDFname:
                validateName(input);
                break;
            case IDLname:
                validateName(input);
                break;
            case IDEmail:
                validateEmail(input);
                break;
            case IDPhone:
                validatePhone(input);
                break;
            case IDPasswd:
                validatePasswd(input);
                break;
            case IDCnfPasswd:
                validatePasswd(input, confirm = true);
                break;
            default:
                break;
        }

    }
}

/**
 * Handles submission of form.
 * @param {Event} event 
 */
function handleSubmission(event) {
    if (validInput === false) {
        event.preventDefault();
    }
    debug(validInput);
}

function main() {
    const form = document.querySelector("#signup-form");
    const btnSubmit = document.querySelector("#submit-form");

    btnSubmit.addEventListener('click', handleSubmission);
    form.addEventListener('input', handleInputValidation);

}

main();