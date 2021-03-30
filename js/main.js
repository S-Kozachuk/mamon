$(document).ready(function () {

    const menuToggle = document.querySelector('.toggle-menu');
    const mobMenu = document.querySelector('.nav');
    const overlayEl = document.querySelector('#overlay');
    const bodyEl = document.body;

    //Click to Hamburger icon
    menuToggle.addEventListener('click', function(){
        this.classList.toggle('active');
        mobMenu.classList.toggle('active');
        overlayEl.classList.toggle('active');
        bodyEl.classList.toggle('noscroll');
    });

    //Click to Mobile memu
    mobMenu.addEventListener('click', function(){
        this.classList.remove('active');
        menuToggle.classList.remove('active');
        overlayEl.classList.remove('active');
        bodyEl.classList.remove('noscroll');
    });
    
    //Closing Mobile menu if screen resizing
    window.addEventListener('resize', function() {
        mobMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        overlayEl.classList.remove('active');
        bodyEl.classList.remove('noscroll');
    });
    
    //Closing Mobile menu if click to overlay
    overlayEl.addEventListener('click', function(){
        this.classList.remove('active');
        mobMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        bodyEl.classList.remove('noscroll');
    });

    // Fixed header menu
    const fixMenu = document.querySelector('.fix-menu');
    window.addEventListener('scroll', function(){
        if(this.pageYOffset > 10){
            fixMenu.classList.add('active');
        }
        else{
            fixMenu.classList.remove('active');    
        }
    });

    // Fixed header by scroll
    const fixHeader = document.querySelector('.header');
    window.addEventListener('scroll', function(){
        if(this.pageYOffset > 10){
            fixHeader.classList.add('active');
        }
        else{
            fixHeader.classList.remove('active');    
        }
    });

    // Call the Owl Carousel plugin, 1-st slider
        $(".slider-1").owlCarousel({
            items: 1,
            nav: true,
            dots: false,
            loop: true,
            navSpeed: 1000
        });

    // Call the Owl Carousel plugin, 2-nd slider    
       /* $(".slider-2").owlCarousel({
            items: 1,
            nav: true,
            dots: false,
            loop: false,
            navSpeed: 2000,
        });
        */

    // Hide Owl Carousel if sreen size more than 768px
    $(window).resize(function(){
        
        if ($(this).width() > 768) {
            $('.slider-2').trigger('destroy.owl.carousel');
        } else {
            $('.slider-2').owlCarousel({
                items: 1,
                nav: false,
                dots: true,
                loop: false,
                navSpeed: 2000
            });
        }

    });

})

// == PopUp ==

const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll(".lock-padding");

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
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrap').offsetWidth + 'px';

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