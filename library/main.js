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

document.addEventListener("DOMContentLoaded", function() {
    const overlay = document.querySelector(".overlay");
    const modalLog = document.querySelector(".modal");
    const modalRegister = document.querySelector(".modal-register");
    const closeButton = document.querySelector(".close-button");
    const closeButtonRegister = document.querySelector("#close-button-register");
    const logInLinks = document.querySelectorAll(".open-login");
    const registerLinks = document.querySelectorAll(".open-register");

    function openModal(modal) {
        modal.style.display = "block";
        overlay.style.display = "block";
    }

    function closeModal(modal) {
        modal.style.display = "none";
        overlay.style.display = "none";
    }

    function openLogInModal() {
        closeModal(modalRegister); // Закрываем окно "Register", если оно открыто
        openModal(modalLog); // Открываем окно "Login"
    }

    function openRegisterModal() {
        closeModal(modalLog); // Закрываем окно "Login", если оно открыто
        openModal(modalRegister); // Открываем окно "Register"
    }

    closeButton.addEventListener("click", function() {
        closeModal(modalLog);
    });

    closeButtonRegister.addEventListener("click", function() {
        closeModal(modalRegister);
        closeModal(modalLog);
    });

    logInLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            openLogInModal();
        });
    });

    registerLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            openRegisterModal();
        });
    });

    overlay.addEventListener("click", function(event) {
        closeModal(modalLog);
        closeModal(modalRegister);
    });
});


// Получаем ссылки на радиокнопки выбора сезона
const seasonRadios = document.querySelectorAll('.season-item input[type="radio"]');

// Получаем ссылки на блоки карточек для каждого сезона
const seasonCards = {
    winter: document.querySelectorAll('.winter-cards'),
    spring: document.querySelectorAll('.spring-cards'),
    summer: document.querySelectorAll('.summer-cards'),
    autumn: document.querySelectorAll('.autumn-cards'),
};

// Функция для скрытия всех блоков карточек
function hideAllCards() {
    for (const season in seasonCards) {
        seasonCards[season].forEach(card => card.classList.remove('active'));
    }
}

// Функция для отображения блоков карточек соответствующего выбранному сезону
function showCardsForSeason(season) {
    hideAllCards();
    seasonCards[season].forEach(card => card.classList.add('active'));
}

function toggleCardAnimation(season) {
    const allCards = document.querySelectorAll('.cards');

    allCards.forEach(card => {
        card.classList.remove('fade-in');
        card.classList.add('fade-out');
    });

    // Задержка перед применением новых классов
    setTimeout(() => {
        allCards.forEach(card => {
            card.classList.remove('fade-out');
            if (card.classList.contains(season + '-cards')) {
                card.classList.add('fade-in');
            }
        });
    }, 100); // 100 миллисекунд, чтобы браузер обновил стили
}



// Обработчики событий для радиокнопок выбора сезона
seasonRadios.forEach(radio => {
    radio.addEventListener('click', () => {
        const selectedSeason = radio.getAttribute('data-season');
        toggleCardAnimation(selectedSeason); // Вызываем функцию анимации
        showCardsForSeason(selectedSeason);
    });
});


// По умолчанию отображаем карточки для выбранного сезона (например, для зимы)
const defaultSeason = document.querySelector('.season-item input[type="radio"]:checked').getAttribute('data-season');
showCardsForSeason(defaultSeason);

window.addEventListener('scroll', function () {
    const seasonInputs = document.querySelector('.season-navigation');
    const favoritesSection = document.querySelector('#favorites');
    const scrollPosition = window.scrollY;

    if (window.innerWidth <= 768) {
        if (scrollPosition >= favoritesSection.offsetTop) {
            seasonInputs.classList.add('sticky');
        } else {
            seasonInputs.classList.remove('sticky');
        }
    } else {
        seasonInputs.classList.remove('sticky');
    }
});

//Валидация формы Register
document.getElementById("registrationForm").addEventListener("submit", function (event) {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!firstName || !lastName || !email || !password) {
        alert("All fields must be filled out");
        event.preventDefault();
    }

    if (password.length < 8) {
        alert("Password must be at least 8 characters long");
        event.preventDefault();
    }
});













