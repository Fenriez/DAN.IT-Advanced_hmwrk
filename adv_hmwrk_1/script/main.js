let burger = document.querySelector('.burger_btn'),
    main_menu = document.querySelector('.main_menu');
    
console.log(burger);
burger.addEventListener('click', () => {
    if (main_menu.style['display'] == 'none') {
        main_menu.style['display'] = 'block';
    } else {
        main_menu.style['display'] = 'none';
    };
});
