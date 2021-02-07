$(document).ready(function () {

    const menuToggle = document.querySelector('.toggle-menu');
    const mobMenu = document.querySelector('.nav');

    menuToggle.addEventListener('click', function(){
        this.classList.toggle('active');
        mobMenu.classList.toggle('active');
    });

})