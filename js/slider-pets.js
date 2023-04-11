const carousel = document.querySelector('.carousel_pets');

async function getPets() {
  const pets = 'pets.json';
  const res = await fetch(pets);
  const data = await res.json();

  let arrayOfPets = [];
  let arrayOfCards = [0, 1, 2, 3, 4, 5, 6, 7];
  let flag = false;
  let i = 0;
  let bunch = [];

  while (i < 9) {
    if (arrayOfCards[0] === 0 && arrayOfCards[i] === 0 && flag === true) {
      break;
    }
    if (arrayOfCards[0] === 0 && arrayOfCards[i] === 0 && flag === false) {
      flag = true;
    }
    if (i === 8) {
      bunch.sort(() => 0.5 - Math.random());
      arrayOfPets.push(...bunch);
      bunch = [];
      let lastEl = arrayOfCards.pop();
      arrayOfCards.unshift(lastEl);
      i = 0;
    } else {
      bunch.push(data[i]);
      i++;
    }
  }
  arrayOfPets.splice(-16);

  const queryMin1080 = window.matchMedia('(min-width: 1080px)');
  const queryMin620 = window.matchMedia(
    '(max-width: 1080px) and (min-width: 620px)'
  );
  const queryMax620 = window.matchMedia('(max-width: 620px)');

  let petsPages = [];
  let petsPage = [];
  let petsPageRender = [];
  let petsPagesRender = [];

  const render = (maxCards) => {
    petsPages = [];
    petsPagesRender = [];
    for (let i = 0; i <= arrayOfPets.length; i++) {
      if (i % maxCards === 0 && i !== 0) {
        petsPages.push(petsPage);
        petsPagesRender.push(petsPageRender);
        petsPage = [];
        petsPageRender = [];
      }
      if (arrayOfPets[i] !== undefined) {
        petsPage.push(arrayOfPets[i]);
        petsPageRender.push(`
          <div class="carousel__item carousel__item_pets">
            <img src="${arrayOfPets[i].img}" alt="${arrayOfPets[i].name}" class="carousel__img">
            <h3 class="carousel__title">${arrayOfPets[i].name}</h3>
            <button class="carousel__btn">Learn more</button>
          </div>
        `);
      }
    }
  };

  let currPage = 0;

  const showModal = () => {
    let modal = document.querySelector('.modal');
    let modalOverlay = document.querySelector('.modal__overlay');
    let cards = document.querySelectorAll('.carousel__item_pets');
    cards = document.querySelectorAll('.carousel__item_pets');
    cards.forEach((card, i) => {
      card.addEventListener('click', () => {
        modal.innerHTML = `
          <div class="modal__wrapper">
            <img src="${petsPages[currPage][i].img}" alt="${petsPages[currPage][i].name}" class="modal__img">
            <div class="modal__text">
              <h3 class="modal__name">${petsPages[currPage][i].name}</h3>
              <h4 class="modal__breed">${petsPages[currPage][i].type} - ${petsPages[currPage][i].breed}</h4>
              <p class="modal__description">${petsPages[currPage][i].description}</p>
              <ul class="modal__list">
                <li class="modal__item"><span>Age:</span> ${petsPages[currPage][i].age}</li>
                <li class="modal__item"><span>Inoculations:</span> ${petsPages[currPage][i].inoculations}</li>
                <li class="modal__item"><span>Diseases:</span> ${petsPages[currPage][i].diseases}</li>
                <li class="modal__item"><span>Parasites:</span> ${petsPages[currPage][i].parasites}</li>
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

  render(8);
  carousel.innerHTML = petsPagesRender[currPage].join('');
  showModal();

  window.onload = () => {
    if (queryMin1080.matches) {
      render(8);
      carousel.innerHTML = petsPagesRender[currPage].join('');
      showModal();
    }
    if (queryMin620.matches) {
      render(6);
      carousel.innerHTML = petsPagesRender[currPage].join('');
      showModal();
    }
    if (queryMax620.matches) {
      render(3);
      carousel.innerHTML = petsPagesRender[currPage].join('');
      showModal();
    }
  };

  const btnFirst = document.querySelector('.controls__btn_first');
  const btnPrev = document.querySelector('.controls__btn_prev');
  const btnPage = document.querySelector('.controls__btn_page');
  const btnNext = document.querySelector('.controls__btn_next');
  const btnLast = document.querySelector('.controls__btn_last');

  queryMin1080.onchange = (e) => {
    if (e.matches) {
      render(8);
      currPage = 0;
      carousel.innerHTML = petsPagesRender[currPage].join('');
      btnPage.innerHTML = currPage + 1;
      btnPrev.disabled = true;
      btnFirst.disabled = true;
      btnNext.disabled = false;
      btnLast.disabled = false;
      showModal();
    }
  };
  queryMin620.onchange = (e) => {
    if (e.matches) {
      render(6);
      currPage = 0;
      carousel.innerHTML = petsPagesRender[currPage].join('');
      btnPage.innerHTML = currPage + 1;
      btnPrev.disabled = true;
      btnFirst.disabled = true;
      btnNext.disabled = false;
      btnLast.disabled = false;
      showModal();
    }
  };
  queryMax620.onchange = (e) => {
    if (e.matches) {
      render(3);
      currPage = 0;
      carousel.innerHTML = petsPagesRender[currPage].join('');
      btnPage.innerHTML = currPage + 1;
      btnPrev.disabled = true;
      btnFirst.disabled = true;
      btnNext.disabled = false;
      btnLast.disabled = false;
      showModal();
    }
  };

  btnPage.innerHTML = currPage + 1;

  btnNext.addEventListener('click', () => {
    if (currPage < petsPages.length - 1) {
      btnNext.disabled = false;
      btnLast.disabled = false;
      currPage++;
      btnPage.innerHTML = currPage + 1;
      carousel.innerHTML = petsPagesRender[currPage].join('');
    }
    if (currPage === petsPages.length - 1) {
      btnNext.disabled = true;
      btnLast.disabled = true;
    }
    if (currPage > 0) {
      btnPrev.disabled = false;
      btnFirst.disabled = false;
    } else {
      btnPrev.disabled = true;
      btnFirst.disabled = true;
    }
    showModal();
  });

  btnPrev.addEventListener('click', () => {
    if (currPage > 0) {
      btnPrev.disabled = false;
      btnFirst.disabled = false;
      currPage--;
      btnPage.innerHTML = currPage + 1;
      carousel.innerHTML = petsPagesRender[currPage].join('');
    }
    if (currPage === 0) {
      btnPrev.disabled = true;
      btnFirst.disabled = true;
    }
    if (currPage < petsPages.length - 1) {
      btnNext.disabled = false;
      btnLast.disabled = false;
    } else {
      btnNext.disabled = true;
      btnLast.disabled = true;
    }
    showModal();
  });

  btnFirst.addEventListener('click', () => {
    currPage = 0;
    btnPage.innerHTML = currPage + 1;
    carousel.innerHTML = petsPagesRender[currPage].join('');
    btnPrev.disabled = true;
    btnFirst.disabled = true;
    btnNext.disabled = false;
    btnLast.disabled = false;
    showModal();
  });

  btnLast.addEventListener('click', () => {
    currPage = petsPages.length - 1;
    btnPage.innerHTML = currPage + 1;
    carousel.innerHTML = petsPagesRender[currPage].join('');
    btnPrev.disabled = false;
    btnFirst.disabled = false;
    btnNext.disabled = true;
    btnLast.disabled = true;
    showModal();
  });
}
getPets();
