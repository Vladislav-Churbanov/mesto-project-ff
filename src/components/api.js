import { createCard, deleteCard } from './card.js';
import { openImagePopup } from './index.js';

const avatarEditButton = document.querySelector('.profile__image');
const placesList = document.querySelector('.places__list');
/* отображение данных пользователя */
export function loadUserprofile() {
  fetch('https://nomoreparties.co/v1/wff-cohort-42/users/me', {
    method: 'GET',
    headers: {
      authorization: '9dbc0cf6-bc48-4ed0-8261-5139301ceaaf',
      'Content-Type': 'application/json'
    }
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
  })
  .then(userData => {
    document.querySelector('.profile__title').textContent = userData.name;
    document.querySelector('.profile__description').textContent = userData.about;
    avatarEditButton.style.backgroundImage = `url(${userData.avatar})`;
  })
  .catch((err) => {
    console.log(err);
  }); 
}

/* отображение карточек */
export let userId = null;

export function loadInitialData() {
  const userPromise = fetch('https://nomoreparties.co/v1/wff-cohort-42/users/me', {
    method: 'GET',
    headers: {
      authorization: '9dbc0cf6-bc48-4ed0-8261-5139301ceaaf',
      'Content-Type': 'application/json'
    }
  }).then(res => {
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка данных пользователя: ${res.status}`);
  });

  const cardsPromise = fetch('https://nomoreparties.co/v1/wff-cohort-42/cards', {
    method: 'GET',
    headers: {
      authorization: '9dbc0cf6-bc48-4ed0-8261-5139301ceaaf',
      'Content-Type': 'application/json'
    }
  }).then(res => {
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка карточек: ${res.status}`);
  });

  Promise.all([userPromise, cardsPromise])
    .then(([userData, cardsData]) => {
      userId = userData._id;

      cardsData.forEach(card => {
        const cardElement = createCard(card, deleteCard, openImagePopup, userId);
        placesList.append(cardElement);
      });
    })
    .catch((err) => {
      console.error(err);
    });
}

/* редактирование данных пользователя */
export function updateUserProfile({ name, about }) {
  return fetch('https://nomoreparties.co/v1/wff-cohort-42/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '9dbc0cf6-bc48-4ed0-8261-5139301ceaaf',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, about })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка при редактировании профиля: ${res.status}`);
  });
}

/* создание новой карточки */
export function addNewCard({ name, link }) {
  return fetch('https://nomoreparties.co/v1/wff-cohort-42/cards', {
    method: 'POST',
    headers: {
      authorization: '9dbc0cf6-bc48-4ed0-8261-5139301ceaaf', // ваш токен
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, link })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка при добавлении карточки: ${res.status}`);
  });
}

/* удаление карточек */
export function DeleteMyCard(cardId) {
  const url = `https://nomoreparties.co/v1/wff-cohort-42/cards/${cardId}`;

  return fetch(url, {
    method: 'DELETE',
    headers: {
      authorization: '9dbc0cf6-bc48-4ed0-8261-5139301ceaaf',
      'Content-Type': 'application/json'
    }
  });
}

/* лайк карточек */
export function sendLike(cardId) {
  const url = `https://nomoreparties.co/v1/wff-cohort-42/cards/likes/${cardId}`;
  return fetch(url, {
    method: 'PUT',
    headers: {
      authorization: '9dbc0cf6-bc48-4ed0-8261-5139301ceaaf',
      'Content-Type': 'application/json'
    }
  }).then(res => {
    if (res.ok) {
      return res.json(); 
    }
    return Promise.reject(`Ошибка при постановке лайка: ${res.status}`);
  });
}

export function removeLike(cardId) {
  const url = `https://nomoreparties.co/v1/wff-cohort-42/cards/likes/${cardId}`;
  return fetch(url, {
    method: 'DELETE',
    headers: {
      authorization: '9dbc0cf6-bc48-4ed0-8261-5139301ceaaf',
      'Content-Type': 'application/json'
    }
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка при снятии лайка: ${res.status}`);
  });
}

/* обновление аватара */
export function updateUserAvatar(avatarUrl) {
  return fetch('https://nomoreparties.co/v1/wff-cohort-42/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: '9dbc0cf6-bc48-4ed0-8261-5139301ceaaf',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ avatar: avatarUrl })
  })
  .then(res => {
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}