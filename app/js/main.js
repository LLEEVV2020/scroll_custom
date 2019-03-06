let scroll = document.querySelectorAll(".scroll");
let slider = $(".slider");

// ставим ползунок при загрузке странницы
$.each(scroll, function(key, val){ creatuRerunner(val) });

// курсор выходит за гранницу палзунка 
slider.on('mouseout', function(e){
    let flag_bga= this.querySelectorAll(".bga");
    // если таблица не вмещается в контейнер, то 
    // создаём скролл
    if(ifWider(this) && flag_bga.length !== 0 ){

        /*Находим координаты курсора по оси Х*/
        var x = getPosition(e).x;

        /* Добавляем в бегунок правильную ширину*/
        creatuRerunner(this);

        /* Сдвигаем ползунок если сдвигаем курсор*/
        makeScrollAdd(this, x); 
    }
});

// Событие mousedown срабатывает, когда кнопка 
// мыши нажата над элементом.
slider.on('mousedown', function(eventObject){
    
    /*Находим координаты курсора по оси Х*/
    
    $(this).prepend('<div class="bga"></div>');
    
    $( this ).find(".bga").mousemove( function (e) {
        
        if(ifWider(this) ){
            
            var x = getPosition(e).x;

            /* Добавляем в бегунок правильную ширину*/
            creatuRerunner(this.closest(".wrapper"));

            /* Сдвигаем ползунок если сдвигаем курсор*/
            //makeScrollJs(this.closest(".wrapper"), x); 
            makeScroll($(this).parents(".wrapper"), x); 
            
            //console.log( x + ' - Вы нажали на кнопку мыши, над элементом "foo". Код нажатой клавиши - ' + eventObject.which);
        }
    });
    
});
slider.on('mouseup ', function(eventObject){
    $(this).find(".bga").remove();
});

// Math.abs(-2); // --> 2

