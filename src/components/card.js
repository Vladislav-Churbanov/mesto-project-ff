import { DeleteMyCard, removeLike, sendLike  } from './api.js';
const cardTemplate = document.querySelector('#card-template').content;
/* создание карточек */
export function createCard (card, deleteCard, openImagePopup, userId) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const imageElement = cardElement.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');

  cardElement.querySelector('.card__title').textContent = card.name;
  imageElement.src = card.link; 
  imageElement.alt = card.name;

  const userLiked = card.likes.some(like => like._id === userId);
  if (userLiked) {
    likeButton.classList.add('card__like-button_is-active');
  }

  likeCounter.textContent = card.likes.length;

  if (card.owner && card.owner._id !== userId) {
    deleteButton.style.display = 'none';
  } else {
    deleteButton.style.display = '';
    deleteButton.addEventListener('click', () => {
      deleteCard(card, cardElement);
    });
  }

  imageElement.addEventListener('click', () => {
    openImagePopup(card.link, card.name);
  });

  likeButton.addEventListener('click', (evt) => {
  toggleLike(evt, card);
});

  return cardElement;
}

/* удаление карточек */
export function deleteCard(cardData, cardDom) {
  DeleteMyCard(cardData._id)
    .then(res => {
      if (res.ok) {
        cardDom.remove();
      } else {
        return Promise.reject(`Ошибка при удалении: ${res.status}`);
      }
    })
    .catch(err => {
      console.error(err);
      alert('Не удалось удалить карточку. Попробуйте позже.');
    });
}

/* лайк карточек */
export function toggleLike(evt, cardData) {
  const likeButton = evt.currentTarget;
  const cardId = cardData._id;
  const likeCounter = likeButton.closest('.places__item').querySelector('.card__like-counter');

  if (likeButton.classList.contains('card__like-button_is-active')) {
    removeLike(cardId)
      .then(updatedCard => {
        likeButton.classList.remove('card__like-button_is-active');
        likeCounter.textContent = updatedCard.likes.length;
      })
      .catch((err) => {
    console.log(err);
  });
  } else {
    sendLike(cardId)
      .then(updatedCard => {
        likeButton.classList.add('card__like-button_is-active');
        likeCounter.textContent = updatedCard.likes.length;
      })
      .catch((err) => {
    console.log(err);
  });
  }
}