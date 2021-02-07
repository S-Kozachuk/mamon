$(document).ready(function () {

    const menuToggle = document.querySelector('.toggle-menu');
    const mobMenu = document.querySelector('.nav');
    const overlayEl = document.querySelector('#overlay');
    const bodyEl = document.body;

    menuToggle.addEventListener('click', function(){
        this.classList.toggle('active');
        mobMenu.classList.toggle('active');
        overlayEl.classList.toggle('active');
        bodyEl.classList.toggle('noscroll');
    });

})