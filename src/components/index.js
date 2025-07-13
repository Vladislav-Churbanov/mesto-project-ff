import '../pages/index.css';
import { createCard, deleteCard } from './card.js';
import { openModal, closeModal, setPopupEventListeners } from './modal.js';
import { enableValidation, clearValidation, toggleButtonState } from './validation.js';
import { loadInitialData, updateUserProfile, addNewCard, updateUserAvatar, userPromise, cardsPromise  } from './api.js';

const placesList = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const newPlaceForm = document.forms['new-place'];
const newAvatarForm = document.forms['new-avatar'];
const avatarEditButton = document.querySelector('.profile__image');
const popupAvatarEdit = document.querySelector('.popup_type_new-avatar');
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
export let userId = null;

/* попап для редактирования профиля */
  const name = document.querySelector('.profile__title');
  const about = document.querySelector('.profile__description');
  const nameInput = document.querySelector('.popup__input_type_name');
  const aboutInput = document.querySelector('.popup__input_type_description');
  const profileSaveButton = document.querySelector('.popup_type_edit .popup__button')

profileEditButton.addEventListener('click', () => {
  clearValidation(popupEdit, validationConfig);
  const userName = name.textContent;
  const userAbout = about.textContent;

  nameInput.value = userName;
  aboutInput.value = userAbout;

  openModal(popupEdit);

  const formElement = popupEdit.querySelector('.popup__form');
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const submitButton = formElement.querySelector(validationConfig.submitButtonSelector);
  
  toggleButtonState(inputList, submitButton, validationConfig.inactiveButtonClass);
});

function submitEditProfileForm(evt) {
  evt.preventDefault();

  renderLoading(profileSaveButton, true);

  const newName = nameInput.value;
  const newAbout = aboutInput.value;

  updateUserProfile({ name: newName, about: newAbout })
    .then(updatedUserData => {
      name.textContent = updatedUserData.name;
      about.textContent = updatedUserData.about;
      
      closeModal(popupEdit);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      renderLoading(profileSaveButton, false);
    });
}

popupEdit.addEventListener('submit', submitEditProfileForm);
/* попап для создания новых карточек */
  const placeInput = document.querySelector('.popup__input_type_card-name');
  const linkInput = document.querySelector('.popup__input_type_url');
  const cardSaveButton = document.querySelector('.popup_type_new-card .popup__button')

profileAddButton.addEventListener('click', () => {
  newPlaceForm.reset();
  clearValidation(popupNewCard, validationConfig);
  openModal(popupNewCard);
});

function submitNewCardForm(evt) {
  evt.preventDefault();

  renderLoading(cardSaveButton, true);

  const newPlace = placeInput.value;
  const newLink = linkInput.value;

  addNewCard({ name: newPlace, link: newLink })

    .then(newCardData => {
      const card = createCard(newCardData, deleteCard, openImagePopup, userId);
      placesList.prepend(card);
      newPlaceForm.reset();
      closeModal(popupNewCard);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      renderLoading(cardSaveButton, false);
    });
}

popupNewCard.addEventListener('submit', submitNewCardForm);
/* попап картинок */
const popupImageElement = popupImage.querySelector('.popup__image');
const popupCaption = popupImage.querySelector('.popup__caption');

export function openImagePopup(imageSrc, imageAlt) {
  popupImageElement.src = imageSrc;
  popupImageElement.alt = imageAlt;
  popupCaption.textContent = imageAlt;

  openModal(popupImage);
}

const images = document.querySelectorAll('.card__image');

/* попап редактирования аватара */
const avatarInput = document.querySelector('.popup__input_type_avatar_url');
const avatarSaveButton = document.querySelector('.popup_type_new-avatar .popup__button')

avatarEditButton.addEventListener('click', () => {
  newAvatarForm.reset();
  clearValidation(popupAvatarEdit, validationConfig);
  openModal(popupAvatarEdit);
});

popupAvatarEdit.addEventListener('submit', (evt) => {
  evt.preventDefault();

  renderLoading(avatarSaveButton, true);

  const avatarUrl = avatarInput.value;

  updateUserAvatar(avatarUrl)
    .then((userData) => {
      avatarEditButton.style.backgroundImage = `url(${userData.avatar})`;

      closeModal(popupAvatarEdit);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      renderLoading(avatarSaveButton, false);
    });
});

setPopupEventListeners(popupEdit);
setPopupEventListeners(popupNewCard);
setPopupEventListeners(popupImage);
setPopupEventListeners(popupAvatarEdit);
/* вызов функции для валидации */
enableValidation(validationConfig);

/* API */
loadInitialData()
  Promise.all([userPromise, cardsPromise])
  .then(([userData, cardsData]) => {
    userId = userData._id;
    document.querySelector('.profile__title').textContent = userData.name;
    document.querySelector('.profile__description').textContent = userData.about;
    avatarEditButton.style.backgroundImage = `url(${userData.avatar})`;
    cardsData.forEach(card => {
      const cardElement = createCard(card, deleteCard, openImagePopup, userId);
      placesList.append(cardElement);
    });
  })
  .catch((err) => {
    console.error(err);
  });

/* уведомление о процессе загрузки */
function renderLoading(button, isLoading) {
  if (isLoading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = 'Сохранить';
  }
}