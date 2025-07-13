/* валидация форм */ 
const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
  inputElement.setCustomValidity("");
}; 

const isValidInput = (formElement, inputElement, validationConfig) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => !input.validity.valid);
};

export const toggleButtonState = (inputList, button, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    button.disabled = true;
    button.classList.add(inactiveButtonClass);
  } else {
    button.disabled = false;
    button.classList.remove(inactiveButtonClass);
  }
};

const setEventListenersForForm = (formElement, validationConfig) => {
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
    inactiveButtonClass
  } = validationConfig;

  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const submitButton = formElement.querySelector(submitButtonSelector);

  inputList.forEach((input) => {
    hideInputError(formElement, input, validationConfig);
  });

  toggleButtonState(inputList, submitButton, inactiveButtonClass);
}