let menuList = document.querySelector('.menu__list');
let headerButton = document.querySelector('.header__button');

// navMain.classList.remove('main-nav--nojs');

headerButton.addEventListener('click', function () {
   if (menuList.classList.contains('menu__list--close')) {
    menuList.classList.remove('menu__list--close');
    headerButton.classList.add('header__button--close');
    } else {
      menuList.classList.add('menu__list--close');
      headerButton.classList.remove('header__button--close');
    }
});
