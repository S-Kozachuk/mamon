const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
        const popupLink = popupLinks[index];
        popupLink.addEventListener("click", function (e) {
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const curentPopup = document.getElementById(popupName);
            popupOpen(curentPopup);
            e.preventDefault(); 
        });
    }
}

// Added close popup object
const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
        const el = popupCloseIcon[index];
        el.addEventListener('click', function (e) {
            popupClose(el.closest('.popup'));
            e.preventDefault();
        });
    }
}

// Open popup function
function popupOpen(curentPopup) {
    if (curentPopup && unlock) {
        const popupActive = document.querySelector('.popup.open');
        if (popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock(); // Scroll block
        }
        curentPopup.classList.add('open');
        curentPopup.addEventListener("click", function (e) {
            if (!e.target.closest('.popup__content')) {
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}

// Close popup
function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('open');
        if (doUnlock) {
            bodyUnLock();
        }
    }
}

// Blocking scroll
function bodyLock() {
    // Calculating the scrollbar width
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

    if (lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = lockPaddingValue;
        }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');
    // Added lock class

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}

// Unblocking scroll
function bodyUnLock() {
    setTimeout(function () {
        if (lockPadding.length > 0) {    
            for (let index = 0; index < lockPadding.length; index++) {
                const el = lockPadding[index];
                el.style.paddingRight = '0px';
            }
        }    
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
    }, timeout);

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}

// Close popup if Esc click
document.addEventListener ('keydown', function (e) {
    if (e.which == 27) {
        const popupActive = document.querySelector('.popup.open');
        popupClose(popupActive);
    }
});

// Polyfil (old browsers support)
(function () {
    // checked support
    if (!Element.prototype.closest) {
        // realize
        Element.prototype.closest = function (css) {
            var node = this;
            while (node) {
                if (node.mathes(css)) return node;
                else node = node.parentElement;
            }
            return null;
        };
    }
})();

(function () {
    // checked support
    if (!Element.prototype.matches) {
        // properties defining
        Element.prototype.matches = Element.prototype.webkitMatchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector;
    }
})();

// Form placeholder
const formInputs = document.querySelectorAll('.form-field');
for (let item of formInputs){
    const thisPlaceholder = item.nextElementSibling;
    
    item.addEventListener('focus', function(){
        thisPlaceholder.classList.add('active');
    });

    item.addEventListener('blur', function(){
        if(item.value == '') {
            thisPlaceholder.classList.remove('active');
        }
    }); 
}

// Form validate
$('#contacts-form').validate({
    rules: {
        email: {
            required: true,
            email: true
        },
        subject: {
            required: true
        },
        message: {
            required: true
        }
    },
    messages: {
        email: {
            required: 'Введите email',
            email: 'отсутствует символ @'
        },
        subject: {
            required: 'Введите тему сообщения'
        },
        message: {
            required: 'Введите текст сообщения'
        }
    },
    submitHandler: function (form) {
        ajaxFormSubmit();
    }
});

// Функция AJAX запроса на сервер
    
function ajaxFormSubmit() {

    let string = $("#contacts-form").serialize(); // Соханяем данные введенные в форму в строку.

    //Формируем ajax запрос
    $.ajax({
        type: "POST", // Тип запроса - POST
        url: "php/mail.php", // Куда отправляем запрос
        data: string, // Какие даные отправляем, в данном случае отправляем переменную string

        // Функция если все прошло успешно
        success: function (html) {
            $("#contacts-form").slideUp(800);
            $('#answer').html(html);
        }
    });

    // Чтобы по Submit больше ничего не выполнялось - делаем возврат false чтобы прервать цепчку срабатывания остальных функций
    return false;
}

