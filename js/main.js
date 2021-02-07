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
    })

})