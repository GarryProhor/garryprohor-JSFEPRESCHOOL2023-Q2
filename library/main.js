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

document.addEventListener("DOMContentLoaded", function () {
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

    closeButton.addEventListener("click", function () {
        closeModal(modalLog);
    });

    closeButtonRegister.addEventListener("click", function () {
        closeModal(modalRegister);
        closeModal(modalLog);
    });

    logInLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            openLogInModal();
        });
    });

    registerLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            openRegisterModal();
        });
    });

    overlay.addEventListener("click", function () {
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

document.getElementById("registrationForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Отменяем отправку формы для ручной обработки

    // Получаем значения полей
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Генерируем девятизначный Card Number
    const cardNumber = generateCardNumber();

    // Создаем объект пользователя
    const user = {
        firstName,
        lastName,
        email,
        password,
        cardNumber,
    };

    // Сохраняем данные пользователя в localStorage
    saveUserData(user);

    // Очищаем форму после сохранения данных
    clearForm();
});

function generateCardNumber() {
    // Генерируем случайное 9-значное число в 16-ричном формате
    return Math.floor(Math.random() * 0x100000000).toString(16).substring(0, 9).toUpperCase();
}

function saveUserData(user) {
    // Преобразуем объект пользователя в строку JSON и сохраняем в localStorage
    localStorage.setItem("user", JSON.stringify(user));
}

function clearForm() {
    // Очищаем поля формы
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
}



// Переменная для отслеживания статуса авторизации
let isLoggedIn = false; // Изначально пользователь не авторизован

// Элементы меню
const dropMenu = document.querySelector(".drop-menu");
const dropProfile = document.querySelector(".drop-profile");


// Обработчик для кнопки "Log In"
const loginLink = document.querySelector(".open-login");
const loginModal = document.querySelector(".modal");

loginLink.addEventListener("click", function (e) {
    e.preventDefault();
    loginModal.style.display = "block";
});

// Закрытие модального окна при клике на крестик
const closeButton = document.querySelector(".close-button");

closeButton.addEventListener("click", function () {
    loginModal.style.display = "none";
});

// Обработчик отправки формы
const loginForm = document.querySelector("#loginForm");

loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Получение введенных данных
    const emailInput = document.querySelector("#emailInput");
    const passwordInput = document.querySelector("#passwordInput");
    const email = emailInput.value;
    const password = passwordInput.value;

    // После успешной авторизации, можно перенаправить пользователя на нужную страницу
    // или выполнить другие действия.
    if (isValidLogin(emailInput, passwordInput)) {
        // Если вход валиден, выполните действия для успешного входа
        // Например, установите статус авторизации и перенаправьте на другую страницу
        isLoggedIn = true;
        updateMenuDisplay();
    }
    // Устанавливаем статус как авторизован
    isLoggedIn = true;

    // Обновляем отображение меню
    updateMenuDisplay();
});

// Функция для обновления отображения элементов в зависимости от статуса авторизации
function updateMenuDisplay() {
    if (isLoggedIn) {
        // Если пользователь авторизован, скрываем форму входа и регистрации, показываем профиль
        dropMenu.style.display = "none";
        dropProfile.style.display = "block";
        document.querySelector('.find-section-open').style.display = 'none';
        document.querySelector('.find-section-close').style.display = 'block';
    } else {
        // Если пользователь не авторизован, показываем форму входа и регистрации, скрываем профиль
        dropMenu.style.display = "none";
        dropProfile.style.display = "none";
        document.querySelector('.find-section-open').style.display = 'block';
        document.querySelector('.find-section-close').style.display = 'none';
    }
}

// Инициализация отображения элементов при загрузке страницы
updateMenuDisplay();

// Обработчик для элемента, который открывает меню
const iconProfile = document.querySelector(".icon-profile");

iconProfile.addEventListener("click", function () {
    if (isLoggedIn) {
        // Если пользователь авторизован, при клике открываем или скрываем .drop-profile
        dropProfile.style.display = dropProfile.style.display === "none" ? "block" : "none";
    } else {
        // Если пользователь не авторизован, при первом клике открываем .drop-register
        if (dropMenu.style.display === "none") {
            dropMenu.style.display = "none";
        } else {
            dropMenu.style.display = "block";
        }
    }
});

// Обработчик клика на документе для закрытия .drop-profile
document.addEventListener("click", function (event) {
    const target = event.target;
    // Проверяем, был ли клик выполнен вне .drop-profile
    if (!dropProfile.contains(target) && target !== iconProfile) {
        dropProfile.style.display = "none";
    }
});


// Функция для отображения значения счетчика входов в элементе
function displayLoginCounter() {
    // Получаем значение счетчика из localStorage
    let loginCounter = localStorage.getItem("loginCounter");

    // Преобразуем значение в число и увеличиваем на 1
    loginCounter = parseInt(loginCounter) + 1;

    // Проверяем, является ли loginCounter числом, иначе устанавливаем его в 0
    if (isNaN(loginCounter)) {
        loginCounter = 0;
    } else {
        loginCounter = parseInt(loginCounter);
    }

    // Сохраняем обновленное значение счетчика в localStorage
    localStorage.setItem("loginCounter", loginCounter);

    // Отображаем значение счетчика в элементе
    const visitsElement = document.querySelector(".modal-profile-card-number.visits");
    const visitsElementBottom = document.querySelector(".card-profile-number.visits");
    const visitesElementBottom = document.querySelector(".card-profile-number.visites");
    if (visitsElement && visitsElementBottom && visitesElementBottom) {
        visitsElement.textContent = loginCounter.toString();
        visitsElementBottom.textContent = loginCounter.toString();
        visitesElementBottom.textContent = loginCounter.toString();
    }
}

// Вызываем функцию для отображения счетчика при загрузке страницы
displayLoginCounter();


// Обработчик отправки формы
loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Получение введенных данных
    const emailInput = document.querySelector("#emailInput");
    const passwordInput = document.querySelector("#passwordInput");
    const overlay = document.querySelector(".overlay");
    const email = emailInput.value;
    const password = passwordInput.value;

    // Здесь можно добавить код для отправки данных на сервер и обработки авторизации
    // После успешной авторизации, можно перенаправить пользователя на нужную страницу
    // или выполнить другие действия.

    // Устанавливаем статус как авторизован
    isLoggedIn = true;



    // Обновляем отображение меню
    updateMenuDisplay();

    // Скрываем модальное окно и overlay после успешной авторизации
    loginModal.style.display = "none";
    overlay.style.display = "none";

    // Обновляем текст элемента "profileTitle" с данными из localStorage и применяем стиль
    const profileTitle = document.querySelector("#profileTitle");
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && userData.cardNumber) {
        profileTitle.textContent = userData.cardNumber;
        profileTitle.style.fontSize = "10px"; // Применяем размер шрифта 10px
    }

    const readerNameInput = document.getElementById('reader-name');
    const cardNumberInput = document.getElementById('card-number');

// Проверьте, есть ли данные пользователя в localStorage
    if (userData) {
        // Если данные есть, установите их в соответствующие поля
        readerNameInput.value = user.firstName + ' ' + user.lastName;
        cardNumberInput.value = user.cardNumber;
    }

    // После успешной авторизации, скрыть картинку и показать текст
    if (isLoggedIn) {
        const iconProfileImg = document.querySelector(".icon-profile-img");
        const iconProfileText = document.querySelector(".icon-profile-text");

        iconProfileImg.style.display = "none";
        iconProfileText.style.display = "block";

        // Получаем данные пользователя из localStorage
        const userData = JSON.parse(localStorage.getItem("user"));

        if (userData) {
            const initials = getInitials(userData.firstName, userData.lastName);

            // Функция для получения первой буквы из каждого слова и объединения их
            function getInitials(firstName, lastName) {
                const firstInitial = firstName.charAt(0).toUpperCase();
                const lastInitial = lastName.charAt(0).toUpperCase();
                return `${firstInitial}${lastInitial}`;
            }

            // Получаем элемент .icon-profile-text
            const iconProfileText = document.querySelector(".icon-profile-text");

            // Устанавливаем текстовое содержимое элемента
            iconProfileText.textContent = initials;

            // Показываем .icon-profile-text
            iconProfileText.style.display = "block";


            // После успешной авторизации также вызываем функцию для обновления отображения счетчика
            displayLoginCounter();
        }

        // Получаем элемент .icon-profile
        const iconProfile = document.querySelector(".icon-profile");


        // Функция для получения полного имени
        function getFullName(user) {
            return user ? `${user.firstName} ${user.lastName}` : "User";
        }

        // Устанавливаем атрибут title на полное имя пользователя, если пользователь авторизован
        iconProfile.setAttribute("title", getFullName(userData));

// Получаем первые заглавные буквы имени и фамилии
        const firstNameInitial = userData.firstName.charAt(0);
        const lastNameInitial = userData.lastName.charAt(0);

// Устанавливаем первые заглавные буквы в элемент .modal-profile-icon-text
        const iconTextElement = document.querySelector(".modal-profile-icon-text");
        iconTextElement.textContent = `${firstNameInitial}${lastNameInitial}`;


// Получаем полное имя пользователя и устанавливаем его в элемент .modal-profile-name-title
        const fullName = `${userData.firstName} ${userData.lastName}`;
        const nameTitleElement = document.querySelector(".modal-profile-name-title");
        nameTitleElement.textContent = fullName;
        nameTitleElement.style.fontSize = "12px";


// Получаем cardNumber и устанавливаем его в элемент .modal-profile-number-card
        const cardNumber = userData.cardNumber;
        const cardNumberElement = document.querySelector(".modal-profile-number-card");
        cardNumberElement.textContent = cardNumber;

// Получаем элемент с изображением для копирования
        const copyIconElement = document.querySelector(".modal-profile-icon-copy");


// Добавляем обработчик события для копирования cardNumber при клике на изображение
        copyIconElement.addEventListener("click", function () {
            // Копируем cardNumber в буфер обмена
            const cardNumberToCopy = userData.cardNumber;
            navigator.clipboard.writeText(cardNumberToCopy);
        });

    }

    if (isLoggedIn) {
        // Если пользователь авторизован, отображаем секцию для авторизованных
        document.getElementById('find-section-open').style.display = 'none';
        document.getElementById('find-section-close').style.display = 'block';
    }

    // Очищаем поля ввода
    emailInput.value = "";
    passwordInput.value = "";



});

// Обработчик для кнопки "Log Out" в меню
const logoutButton = document.querySelector("#logoutButton");

logoutButton.addEventListener("click", function () {
    // Здесь можно добавить код для выхода пользователя
    // Например, сбросить статус авторизации и перенаправить на страницу входа
    isLoggedIn = false;

    const iconProfileImg = document.querySelector(".icon-profile-img");
    const iconProfileText = document.querySelector(".icon-profile-text");

    iconProfileImg.style.display = "block";
    iconProfileText.style.display = "none";
    // Обновляем отображение меню
    updateMenuDisplay();

    // Очищаем текст в элементе "profileTitle" и возвращаем его к "Profile"
    const profileTitle = document.querySelector("#profileTitle");
    profileTitle.textContent = "Profile";
});

// Получаем ссылку на "My profile" и модальное окно профиля
const myProfileLink = document.querySelector(".myProfileLink");
const myProfileLink2 = document.querySelector(".myProfileLink-2");
const modalProfile = document.querySelector(".modal-profile");
const overlay = document.querySelector(".overlay");

// Обработчик для открытия модального окна профиля
myProfileLink.addEventListener("click", function () {
    modalProfile.style.display = "block";
    overlay.style.display = "block";
});

myProfileLink2.addEventListener("click", function () {
    modalProfile.style.display = "block";
    overlay.style.display = "block";
});

// Обработчик для закрытия модального окна профиля
const closeModalButton = document.querySelector(".close-modal");

closeModalButton.addEventListener("click", function () {
    modalProfile.style.display = "none";
    overlay.style.display = "none";
});

// Обработчик для закрытия модального окна при клике вне него
overlay.addEventListener("click", function (e) {
    if (e.target === overlay) {
        modalProfile.style.display = "none";
        overlay.style.display = "none";
    }
});





const buyButtons = document.querySelectorAll('.card-button');
const modalBuyCard = document.querySelector('.modal-buy-card');
const modalBuyCardClose = document.querySelector('.modal-buy-card-close');

// Добавляем обработчики клика на кнопки "Buy"
buyButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        if (isLoggedIn) {
            // Если пользователь авторизован, открываем модальное окно для покупки
            modalBuyCard.style.display = 'block';
            overlay.style.display = 'block';
        } else {
            // Если пользователь не авторизован, открываем модальное окно для входа
            const loginModal = document.querySelector('.modal');
            loginModal.style.display = 'block';
            overlay.style.display = 'block';
        }
    });
});

// Добавляем обработчик клика на крестик в модальном окне для покупки
modalBuyCardClose.addEventListener('click', function () {
    modalBuyCard.style.display = 'none';
    overlay.style.display = 'none';
});

// Добавляем обработчик клика на overlay
overlay.addEventListener('click', function (e) {
    if (e.target === overlay) {
        modalBuyCard.style.display = 'none';
        overlay.style.display = 'none';
    }
});



const checkCardButton = document.querySelector(".check-button");
const readerNameInput = document.querySelector(".reader-name");
const cardNumberInput = document.querySelector(".card-number");
const cardsProfileContainer = document.querySelector(".cards-profile-container");

// Получаем данные пользователя из localStorage
const user = getUserFromLocalStorage();

// Устанавливаем обработчик события на поле .reader-name
readerNameInput.addEventListener("blur", function () {
    if (!readerNameInput.value) {
        readerNameInput.placeholder = "Reader's name";
    }
});

checkCardButton.addEventListener("click", function () {
    const readerName = readerNameInput.value;
    const cardNumber = cardNumberInput.value;

    // Проверяем, совпадают ли введенные данные с данными пользователя в localStorage
    if (user && user.firstName + " " + user.lastName === readerName && user.cardNumber === cardNumber) {
        // Сохраняем введенные данные
        // const savedReaderName = readerName;
        // const savedCardNumber = cardNumber;

        // Скрываем кнопку "Check the card" и показываем контейнер с информацией
        checkCardButton.style.display = "none";
        cardsProfileContainer.style.display = "block";

        displayUserProfile(user);

        setTimeout(() => {
            // После 10 секунд сбрасываем информацию и кнопку, а также очищаем поля формы
            resetUserProfile();
            readerNameInput.value = "";
            cardNumberInput.value = "";
        }, 10000);
    }
});

function getUserFromLocalStorage() {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
}

function displayUserProfile(user) {
    // Обновляем все элементы .card-profile-number
    const profileNumbers = document.querySelectorAll(".card-profile-number");
    profileNumbers.forEach((element) => {
        const dataType = element.getAttribute("data-type");
        if (user[dataType]) {
            element.textContent = user[dataType];
        }
    });
}

function resetUserProfile() {
    // Сбрасываем информацию о карте и возвращаем кнопку "Check the card"
    checkCardButton.style.display = "block";
    cardsProfileContainer.style.display = "none";
}



function isValidLogin(email, password) {
    // Получите данные пользователя из LocalStorage
    const userData = JSON.parse(localStorage.getItem("user"));

    // Проверьте, существует ли пользователь с указанным email и паролем
    return userData && userData.email === email && userData.password === password;
}

document.addEventListener('DOMContentLoaded', function () {
    const cardNumberInput = document.getElementById('cardNumberInput');
    const expirationInput1 = document.getElementById('expirationInput');
    const expirationInput2 = document.getElementById('expirationInput-2');
    const cvcInput = document.getElementById('cvcInput');
    const buyButton = document.getElementById('buyButton');
    const modal = document.querySelector('.modal-buy-card');
    const cardButton = document.querySelector('.card-button');

    let isModalOpen = false;

    function validateCard() {
        const cardNumber = cardNumberInput.value.trim();
        const expiration1 = expirationInput1.value.trim();
        const expiration2 = expirationInput2.value.trim();
        const cvc = cvcInput.value.trim();

        if (cardNumber.length !== 16 || !/^\d+$/.test(cardNumber)) {
            alert('Bank card number should contain 16 digits.');
            return false;
        }

        if (expiration1.length !== 2 || expiration2.length !== 2 || !/^\d+$/.test(expiration1) || !/^\d+$/.test(expiration2)) {
            alert('Expiration code should contain 2 digits each.');
            return false;
        }

        if (cvc.length !== 3 || !/^\d+$/.test(cvc)) {
            alert('CVC should contain 3 digits.');
            return false;
        }

        return true;
    }

    function closeModalAndModifyButton() {
        if (!isModalOpen && validateCard()) {
            closeModal(); // Закрываем модальное окно после успешной валидации

            // Добавляем класс и изменяем текст кнопки
            cardButton.classList.add('card-button-own');
            cardButton.textContent = 'Own';

            // Устанавливаем флаг, указывающий, что модальное окно открыто
            isModalOpen = true;
        }
    }

    buyButton.addEventListener('click', function () {
        if (!cardButton.classList.contains('card-button-own')) {
            closeModalAndModifyButton();
        }
    });

    const closeModalButton = document.querySelector('.modal-buy-card-close');

    function closeModal() {
        modal.style.display = 'none';
        overlay.style.display = 'none';

        // Сбрасываем флаг, указывающий, что модальное окно закрыто
        isModalOpen = false;
    }

    closeModalButton.addEventListener('click', closeModal);

    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });
});

/*document.addEventListener('DOMContentLoaded', function () {
    const cardButtons = document.querySelectorAll('.card-button');
    const modal = document.querySelector('.modal-buy-card');
    const cardButton = document.querySelector('.card-button-own');
    const cardNumberInput = document.getElementById('cardNumberInput');
    const expirationInput1 = document.getElementById('expirationInput');
    const expirationInput2 = document.getElementById('expirationInput-2');
    const cvcInput = document.getElementById('cvcInput');

    // Функция валидации карточки
    function validateCard() {
        const cardNumber = cardNumberInput.value.trim();
        const expiration1 = expirationInput1.value.trim();
        const expiration2 = expirationInput2.value.trim();
        const cvc = cvcInput.value.trim();

        if (cardNumber.length !== 16 || !/^\d+$/.test(cardNumber)) {
            alert('Bank card number should contain 16 digits.');
            return false;
        }

        if (expiration1.length !== 2 || expiration2.length !== 2 || !/^\d+$/.test(expiration1) || !/^\d+$/.test(expiration2)) {
            alert('Expiration code should contain 2 digits each.');
            return false;
        }

        if (cvc.length !== 3 || !/^\d+$/.test(cvc)) {
            alert('CVC should contain 3 digits.');
            return false;
        }

        return true;
    }

    // Функция, которая будет вызываться при нажатии на кнопку "Buy"
    function handleBuyButtonClick(event) {
        event.preventDefault(); // Предотвращаем стандартное действие кнопки (если оно есть)

        // Выполняем валидацию карточки
        if (!validateCard()) {
            return; // Если валидация не прошла, не открываем модальное окно
        }

        // Открываем модальное окно .modal-buy-card
        modal.style.display = 'block';

        // Запоминаем, какая кнопка была нажата
        cardButton.dataset.currentButtonId = event.currentTarget.id;
    }

    // Функция, которая будет вызываться при закрытии модального окна
    function closeModal() {
        modal.style.display = 'none';
        const currentButtonId = cardButton.dataset.currentButtonId;

        // Проверяем, была ли нажата какая-либо кнопка "Buy"
        if (currentButtonId) {
            // Находим кнопку по ID и добавляем ей класс .card-button-own
            const buttonToOwn = document.getElementById(currentButtonId);
            if (buttonToOwn) {
                buttonToOwn.classList.add('card-button-own');
                buttonToOwn.textContent = 'Own';
            }
        }

        // Очищаем данные о текущей кнопке
        cardButton.dataset.currentButtonId = '';
    }

    // Назначаем обработчики событий на все кнопки "Buy"
    cardButtons.forEach(function (button) {
        button.addEventListener('click', handleBuyButtonClick);
    });

    // Назначаем обработчик события на закрытие модального окна
    modal.addEventListener('click', function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });
});*/


























