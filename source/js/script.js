let menuList = document.querySelector('.menu__list');
let headerButton = document.querySelector('.header__button');
let header = document.querySelector('.header');

header.classList.remove('header--nojs');

headerButton.addEventListener('click', function () {
  if (menuList.classList.contains('menu__list--close')) {
    menuList.classList.remove('menu__list--close');
    headerButton.classList.add('header__button--close');
    } else {
      menuList.classList.add('menu__list--close');
      headerButton.classList.remove('header__button--close');
    }
});

let likeButton = document.querySelector('.photos__like-button');
let likeCount = document.querySelector('.photos__like-count');
let value = parseFloat(likeCount.innerHTML);

likeButton.addEventListener('click', () => {
    if(likeButton.classList.contains('photos__like-button--liked')) {
      likeButton.classList.remove('photos__like-button--liked');
      value -= 1;
      likeCount.innerHTML = value;
    }
    else {
      value += 1;
      likeCount.innerHTML = value;
      likeButton.classList.add('photos__like-button--liked');
    }
});
