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
