/* валидация форм */ 
export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const showInputError = (formElement, inputElement, errorMessage, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const isValidInput = (formElement, inputElement, validationConfig) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig.errorClass);
  } else {
    hideInputError(formElement, inputElement, validationConfig.errorClass);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => !input.validity.valid);
};

const toggleButtonState = (inputList, button, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    button.disabled = true;
    button.classList.add(inactiveButtonClass);
  } else {
    button.disabled = false;
    button.classList.remove(inactiveButtonClass);
  }
};

export const setEventListenersForForm = (formElement, validationConfig) => {
  const { inputSelector, submitButtonSelector, inactiveButtonClass } = validationConfig;
  
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const submitButton = formElement.querySelector(submitButtonSelector);

  toggleButtonState(inputList, submitButton, inactiveButtonClass);

  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      isValidInput(formElement, input, validationConfig);
      toggleButtonState(inputList, submitButton, inactiveButtonClass);
    });
  });
};

export const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  
  formList.forEach((form) => {
    setEventListenersForForm(form, validationConfig);
  });
};

export function clearValidation(formElement, validationConfig) {
  const {
    inputSelector,
    submitButtonSelector,
  } = validationConfig;

  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const submitButton = formElement.querySelector(submitButtonSelector);

  inputList.forEach((input) => {
    hideInputError(formElement, input);
  });

  toggleButtonState(inputList, submitButton);
}