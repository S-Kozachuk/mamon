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

    // Call the Owl Carousel plugin
        $(".owl-carousel").owlCarousel({
            items: 1
        });

})