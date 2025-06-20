
/* закрытие esc */
const handleEscKeyUp = (e) => {
  if (e.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened');
    if (popup) {
      closeModal(popup);
    }
  }
};
/* открытие */
export const openModal = (modal) => {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscKeyUp);
};
/* закрытие */
export const closeModal = (modal) => {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscKeyUp);
};
/* слушатель с закрытием на крестик */
export const setPopupEventListeners = (popup) => {
  const closeButtons = popup.querySelectorAll('.popup__close');
  closeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      closeModal(popup);
    });
  });
/* закрытие на оверлей */
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closeModal(popup);
    }
  });
};