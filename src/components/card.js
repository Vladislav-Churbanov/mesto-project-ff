const cardTemplate = document.querySelector('#card-template').content;
/* создание карточек */
export function createCard (card, deleteCard, openImagePopup, like) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const imageElement = cardElement.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardElement.querySelector('.card__title').textContent = card.name;
  imageElement.src = card.link; 
  imageElement.alt = card.name;

  deleteButton.addEventListener('click', function() {
    deleteCard(cardElement);
  });

  imageElement.addEventListener('click', () => {
    openImagePopup(card.link, card.name);
  });

  likeButton.addEventListener('click', like);

  return cardElement;
}

/* удаление карточек */
export function deleteCard(cardElement) {
  cardElement.remove();
}

/* лайк карточек */
export function like (evt) {
  const likeButton = evt.currentTarget;
  likeButton.classList.toggle('card__like-button_is-active'); 
}