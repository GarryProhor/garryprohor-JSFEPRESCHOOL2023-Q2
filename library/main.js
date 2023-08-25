document.querySelector('.burger').addEventListener('click', () => {
    const burger = document.querySelector('.burger');
    burger.classList.toggle('active');
    const burgerList = document.querySelector('.burger-list');
    const burgerLines = document.querySelector('.burger-lines');
    const buggerClose = document.querySelector('.burger-close');
    if (burger.classList.contains('active')) {
        burgerList.style.right = '0';
        burgerList.style.top = '90px';
        burgerLines.style.display = 'none';
        buggerClose.style.display = 'block';
    } else {
        burgerList.style.right = '-332px';
        burgerList.style.top = '90px';
        buggerClose.style.display = 'none';
        burgerLines.style.display = 'block';
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector(".about-slider");
    const carouselItems = carousel.querySelectorAll(".about-item");
    const prevButton = carousel.querySelector(".arrow-left");
    const nextButton = carousel.querySelector(".arrow-right");
    const paginationItems = carousel.querySelectorAll(".pagination-item");

    let currentIndex = 0;

    function updateCarousel() {
        // Определяем, сколько картинок нужно отображать на текущем слайде
        let itemsPerScreen =
            window.innerWidth > 1430
                ? 3
                : window.innerWidth >= 1081
                    ? 2
                    : 1;

        carouselItems.forEach((item, index) => {
            if (index >= currentIndex && index < currentIndex + itemsPerScreen) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });

        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex + itemsPerScreen >= carouselItems.length;

        // Обновляем активную пагинацию
        paginationItems.forEach((item, index) => {
            item.style.backgroundColor = index === currentIndex ? "var(--color-brawn)" : "var(--color-black-2)";
        });
    }

    // Обработчики событий для стрелок
    prevButton.addEventListener("click", function () {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    nextButton.addEventListener("click", function () {
        // Определяем, сколько картинок нужно пролистнуть вперед
        let itemsPerScreen =
            window.innerWidth > 1430
                ? 3
                : window.innerWidth >= 1081
                    ? 2
                    : 1;

        if (currentIndex + itemsPerScreen < carouselItems.length) {
            currentIndex += itemsPerScreen;
            updateCarousel();
        }
    });

    // Обработчики событий для элементов пагинации
    paginationItems.forEach((item, index) => {
        item.addEventListener("click", () => {
            currentIndex = index;
            updateCarousel();
        });
    });

    // Первоначальная настройка и обновление карусели
    updateCarousel();

    // Обработчик события изменения размера окна
    window.addEventListener("resize", function () {
        updateCarousel();
    });
});


// Получаем ссылки на элементы DOM
const profileIcon = document.querySelector('.icon-profile');
const profileMenu = document.querySelector('.drop-menu');

// При клике на иконку профиля, показываем/скрываем выпадающее меню
profileIcon.addEventListener('click', () => {
    if (profileMenu.style.display === 'block') {
        profileMenu.style.display = 'none';
    } else {
        profileMenu.style.display = 'block';
    }
});

// Закрываем выпадающее меню при клике вне него
document.addEventListener('click', (event) => {
    if (!profileMenu.contains(event.target) && event.target !== profileIcon) {
        profileMenu.style.display = 'none';
    }
});







