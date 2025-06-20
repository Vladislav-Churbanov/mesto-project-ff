import './pages/index.css';
import { initialCards } from './cards.js';
import { createCard, deleteCard, like } from './cards.js';
import { openModal, closeModal, listener } from './modal.js';

const placesList = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');

initialCards.forEach(function (element) {
  const card = createCard(element, deleteCard, openImagePopup, like);
  placesList.append(card);
});

/* попап для редактирования профиля */
  const name = document.querySelector('.profile__title');
  const about = document.querySelector('.profile__description');
  const nameInput = document.querySelector('.popup__input_type_name');
  const aboutInput = document.querySelector('.popup__input_type_description');

profileEditButton.addEventListener('click', () => {

  const userName = name.textContent;
  const userAbout = about.textContent;

  nameInput.value = userName;
  aboutInput.value = userAbout;

  openModal(popupEdit);
});

function handleFormSubmit(evt) {
    evt.preventDefault();

    const newName = nameInput.value;
    const newAbout = aboutInput.value;

    name.textContent = newName;
    about.textContent = newAbout;

    closeModal(popupEdit);
}

popupEdit.addEventListener('submit', handleFormSubmit);
/* попап для создания новых карточек */
  const placeInput = document.querySelector('.popup__input_type_card-name');
  const linkInput = document.querySelector('.popup__input_type_url');

profileAddButton.addEventListener('click', () => {
  openModal(popupNewCard);
});

function handleFormSubmitTwo(evt) {
    evt.preventDefault();

    const newPlace = placeInput.value;
    const newLink = linkInput.value;

    const card = createCard({ name: newPlace, link: newLink }, deleteCard, openImagePopup, like);

  placesList.prepend(card);

  placeInput.value = '';
  linkInput.value = '';

  closeModal(popupNewCard);
}

popupNewCard.addEventListener('submit', handleFormSubmitTwo);
/* попап картинок */
const popupImageElement = popupImage.querySelector('.popup__image');
const popupCaption = popupImage.querySelector('.popup__caption');

function openImagePopup(imageSrc, imageAlt) {
  popupImageElement.src = imageSrc;
  popupImageElement.alt = imageAlt;
  popupCaption.textContent = imageAlt;

  openModal(popupImage);
}

const images = document.querySelectorAll('.card__image');

images.forEach((img) => {
  img.addEventListener('click', () => {
    openImagePopup(img.src, img.alt);
  });
});

listener(popupEdit);
listener(popupNewCard);
listener(popupImage);