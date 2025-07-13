const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-42',
  headers: {
    authorization: '9dbc0cf6-bc48-4ed0-8261-5139301ceaaf',
    'Content-Type': 'application/json'
  }
};

function getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
}

/* отображение карточек и данных пользователя */
export let userPromise = null;
export let cardsPromise = null;

export function loadInitialData() {
  userPromise = fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers
  }).then(getResponseData);

  cardsPromise = fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
  }).then(getResponseData);
}

/* редактирование данных пользователя */
export function updateUserProfile({ name, about }) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ name, about })
  })
  .then(getResponseData);
}

/* создание новой карточки */
export function addNewCard({ name, link }) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({ name, link })
  }).then(getResponseData);
}

/* удаление карточек */
export function deleteMyCard(cardId) {
  const url = `${config.baseUrl}/cards/${cardId}`;

  return fetch(url, {
    method: 'DELETE',
    headers: config.headers
  }).then(getResponseData);
}

/* лайк карточек */
export function sendLike(cardId) {
  const url = `${config.baseUrl}/cards/likes/${cardId}`;
  return fetch(url, {
    method: 'PUT',
    headers: config.headers
  }).then(getResponseData);
}

export function removeLike(cardId) {
  const url = `${config.baseUrl}/cards/likes/${cardId}`;
  return fetch(url, {
    method: 'DELETE',
    headers: config.headers
  }).then(getResponseData);
}

/* обновление аватара */
export function updateUserAvatar(avatarUrl) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ avatar: avatarUrl })
  })
  .then(getResponseData);
}