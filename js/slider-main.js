// CAROUSEL

// main
const carouselMain = document.querySelector('.carousel_main');
const prevArrowMain = document.querySelector('.carousel__arrow_left');
const nextArrowMain = document.querySelector('.carousel__arrow_right');

// random

// pets data
async function getPets() {
  const pets = 'pets.json';
  const res = await fetch(pets);
  const data = await res.json();

  const shuffle = () => {
    return [0, 1, 2, 3, 4, 5, 6, 7].sort(() => 0.5 - Math.random()).slice(0, 3);
  };

  let arrayOfCards = [];
  const randomizeNumbersMain = () => {
    arrayOfCards = [];
    for (let i = 0; i < 24; i++) {
      let threeRandomCards = shuffle();
      let j = 0;
      while (j < 3) {
        if (i !== 0) {
          if (arrayOfCards[i - 1].includes(threeRandomCards[j])) {
            threeRandomCards = shuffle();
            j = 0;
          } else {
            j++;
          }
        } else {
          break;
        }
      }
      if (i === 23) {
        j = 0;
        while (j < 3) {
          if (
            arrayOfCards[0].includes(threeRandomCards[j]) ||
            arrayOfCards[i - 1].includes(threeRandomCards[j])
          ) {
            i = 0;
            arrayOfCards = [];
            break;
          } else {
            j++;
          }
        }
      }
      arrayOfCards.push(threeRandomCards);
    }
  };
  randomizeNumbersMain();

  let arrayOfCardsHtml = [];
  const randomizeCardsMain = () => {
    arrayOfCardsHtml = [];
    for (let i = 0; i < 24; i++) {
      arrayOfCardsHtml[i] = `
        <div class="carousel__item">
          <img src="${data[arrayOfCards[i][0]].img}" alt="${
        data[arrayOfCards[i][0]].name
      }" class="carousel__img">
          <h3 class="carousel__title">
            ${data[arrayOfCards[i][0]].name}
          </h3>
          <button class="carousel__btn">Learn more</button>
        </div>
        <div class="carousel__item">
          <img src="${data[arrayOfCards[i][1]].img}" alt="${
        data[arrayOfCards[i][1]].name
      }" class="carousel__img">
          <h3 class="carousel__title">
            ${data[arrayOfCards[i][1]].name}
          </h3>
          <button class="carousel__btn">Learn more</button>
        </div>
        <div class="carousel__item carousel__item_hide">
          <img src="${data[arrayOfCards[i][2]].img}" alt="${
        data[arrayOfCards[i][2]].name
      }" class="carousel__img">
          <h3 class="carousel__title">
            ${data[arrayOfCards[i][2]].name}
          </h3>
          <button class="carousel__btn">Learn more</button>
        </div>
      `;
    }
  };
  randomizeCardsMain();

  let pageMain = 0;
  carouselMain.innerHTML = arrayOfCardsHtml[pageMain];

  const showModal = () => {
    let modal = document.querySelector('.modal');
    let modalOverlay = document.querySelector('.modal__overlay');
    let cards = document.querySelectorAll('.carousel__item');
    cards = document.querySelectorAll('.carousel__item');
    cards.forEach((card, i) => {
      card.addEventListener('click', () => {
        modal.innerHTML = `
          <div class="modal__wrapper">
            <img src="${data[arrayOfCards[pageMain][i]].img}" alt="${
          data[arrayOfCards[pageMain][i]].name
        }" class="modal__img">
            <div class="modal__text">
              <h3 class="modal__name">${
                data[arrayOfCards[pageMain][i]].name
              }</h3>
              <h4 class="modal__breed">${
                data[arrayOfCards[pageMain][i]].type
              } - ${data[arrayOfCards[pageMain][i]].breed}</h4>
              <p class="modal__description">${
                data[arrayOfCards[pageMain][i]].description
              }</p>
              <ul class="modal__list">
                <li class="modal__item"><span>Age:</span> ${
                  data[arrayOfCards[pageMain][i]].age
                }</li>
                <li class="modal__item"><span>Inoculations:</span> ${
                  data[arrayOfCards[pageMain][i]].inoculations
                }</li>
                <li class="modal__item"><span>Diseases:</span> ${
                  data[arrayOfCards[pageMain][i]].diseases
                }</li>
                <li class="modal__item"><span>Parasites:</span> ${
                  data[arrayOfCards[pageMain][i]].parasites
                }</li>
              </ul>
            </div>
          </div>
          <button class="modal__close">
            <img src="assets/svg/close.svg" alt="close">
          </button>
          `;
        modal.classList.add('active');
        modalOverlay.classList.add('active');
        document.body.classList.add('active');
        let modalClose = document.querySelector('.modal__close');
        modalClose.classList.add('active');

        modalOverlay.addEventListener('click', () => {
          modal.classList.remove('active');
          modalOverlay.classList.remove('active');
          document.body.classList.remove('active');
          modalClose.classList.remove('active');
        });

        modalClose.addEventListener('click', () => {
          modal.classList.remove('active');
          modalOverlay.classList.remove('active');
          document.body.classList.remove('active');
          modalClose.classList.remove('active');
        });
      });
    });
  };
  showModal();

  const nextPrevPage = (num1, num2, num3, activeClass1, activeClass2) => {
    carouselMain.classList.add(`${activeClass1}`);
    if (pageMain === num1) {
      pageMain = num2;
    } else {
      pageMain += num3;
    }
    setTimeout(() => {
      carouselMain.classList.add(`${activeClass2}`);
      carouselMain.classList.remove(`${activeClass1}`);
    }, 500);
    setTimeout(() => {
      carouselMain.style.transition = 'none';
    }, 500);
    setTimeout(() => {
      carouselMain.innerHTML = arrayOfCardsHtml[pageMain];
      carouselMain.classList.add(`${activeClass2}`);
      carouselMain.classList.remove(`${activeClass1}`);
    }, 500);
    setTimeout(() => {
      carouselMain.style.transition = '1.5s all';
      carouselMain.classList.remove(`${activeClass2}`);
      showModal();
    }, 600);
  };

  nextArrowMain.addEventListener('click', () => {
    nextPrevPage(23, 0, 1, 'active_next', 'active_prev');
  });

  prevArrowMain.addEventListener('click', () => {
    nextPrevPage(0, 23, -1, 'active_prev', 'active_next');
  });
}
getPets();
