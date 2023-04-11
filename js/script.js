// burger menu
const burger = document.querySelector('.header__burger');
const menu = document.querySelector('.header__menu');
const overlay = document.querySelector('.header__overlay');
const headerElements = [burger, menu, overlay];

headerElements.forEach((e) => {
  e.addEventListener('click', () => {
    burger.classList.toggle('active');
    menu.classList.toggle('active');
    document.body.classList.toggle('active');
    overlay.classList.toggle('active');
  });
});

// remove hash
window.addEventListener('scroll', () => {
  const removeHash = () => {
    history.pushState(
      '',
      document.title,
      window.location.pathname + window.location.search
    );
  };
  removeHash();
});

// self-rating
console.log(`
Ваша оценка - 106 баллов 
Отзыв по пунктам ТЗ:
Не выполненные/не засчитанные пункты:
1) сохраняется только одно предыдущее состояние. Т.е. при последовательном переходе два раза влево, а потом два раза вправо, мы получим набор карточек, отличный от исходного 

Выполненные пункты:
1) при ширине страницы меньше 768рх панель навигации скрывается, появляется бургер-иконка 

2) при нажатии на бургер-иконку, справа плавно появляется адаптивное меню шириной 320px, бургер-иконка плавно поворачивается на 90 градусов 

3) высота адаптивного меню занимает всю высоту экрана 

4) при повторном нажатии на бургер-иконку или на свободное от бургер-меню пространство адаптивное меню плавно скрывается уезжая за правую часть экрана, бургер-иконка плавно поворачивается на 90 градусов обратно 

5) бургер-иконка создана при помощи html+css, без использования изображений 

6) ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям, сохраняются заданные на первом этапе выполнения задания требования интерактивности элементов меню 

7) при клике по любой ссылке (интерактивной или неинтерактивной) в меню адаптивное меню плавно скрывается вправо, бургер-иконка поворачивается на 90 градусов обратно 

8) расположение и размеры элементов в бургер-меню соответствует макету (центрирование по вертикали и горизонтали элементов меню, расположение иконки). При этом на странице Pets цветовая схема может быть как темная, так и светлая 

9) область, свободная от бургер-меню, затемняется 

10) страница под бургер-меню не прокручивается 

11) при нажатии на стрелки происходит переход к новому блоку элементов 

12) смена блоков происходит с соответствующей анимацией карусели (способ выполнения анимации не проверяется) 

13) слайдер бесконечен, т.е. можно бесконечно много нажимать влево или вправо, и каждый раз будет прокрутка в эту сторону с новым набором карточек 

14) при переключении влево или вправо прокручивается ровно столько карточек, сколько показывается при текущей ширине экрана (3 для 1280px, 2 для 768px, 1 для 320px) 

15) в текущем блоке слайда карточки с питомцами не повторяются 

16) в следующем блоке нет дублирования карточек с текущим блоком. Например в слайдере из 3 элементов, следующий выезжающий слайд будет содержать 3 (из 8 доступных) новых карточки питомца, таких, каких не было среди 3х карточек на предыдущем уехавшем слайде 

17) при каждой перезагрузке страницы формируется новая последовательность карточек 

18) генерация наборов карточек происходит на основе 8 объектов с данными о животными 

19) при изменении ширины экрана (от 1280px до 320px и обратно), слайдер перестраивается и работает без перезагрузки страницы (набор карточек при этом может как изменяться, так и оставаться тем же, скрывая лишнюю или добавляя недостающую, и сохраняя при этом описанные для слайдера требования) 

20) при перезагрузке страницы всегда открывается первая страница пагинации 

21) при нажатии кнопок '>' или '<' открывается следующая или предыдущая страница пагинации соответственно 

22) при нажатии кнопок '>>' или '<<' открывается последняя или первая страница пагинации соответственно 

23) при открытии первой страницы кнопки '<<' и '<' неактивны 

24) при открытии последней страницы кнопки '>' и '>>' неактивны 

25) в кружке по центру указан номер текущей страницы. При переключении страниц номер меняется на актуальный 

26) при загрузке страницы формируется массив из 48 объектов питомцев. Каждый из 8 питомцев должен встречаться ровно 6 раз 

27) при каждой перезагрузке страницы формируется новый массив со случайной последовательностью 

28) карточки питомцев не должны повторяться на одной странице 

29) при переключении страницы данные меняются (для >1280px меняется порядок карточек, для остальных - меняется набор и порядок карточек) 

30) при неизменных размерах области пагинации, в том числе размерах окна браузера, и без перезагрузки страницы, возвращаясь на страницу под определенным номером, контент на ней всегда будет одинаков. Т.е. карточки питомцев будут в том же расположении, что и были до перехода на другие страницы 

31) общее количество страниц при ширине экрана 1280px - 6, при 768px - 8, при 320px - 16 страниц 

32) при изменении ширины экрана (от 1280px до 320px и обратно), пагинация перестраивается и работает без перезагрузки страницы (страница может оставаться той же или переключаться, при этом сформированный массив - общая последовательность карточек - не обновляется, сохраняются все остальные требования к пагинации) 

33) попап появляется при нажатии на любое место карточки с описанием конкретного животного 

34) часть страницы вне попапа затемняется 

35) при открытии попапа вертикальный скролл страницы становится неактивным, при закрытии - снова активным 

36) при нажатии на область вокруг попапа или на кнопку с крестиком попап закрывается, при этом при нажатии на сам попап ничего не происходит 

37) кнопка с крестиком интерактивная 

38) окно попапа (не считая кнопку с крестиком) центрировано по всем осям, размеры элементов попапа и их расположение совпадают с макетом 


`);
