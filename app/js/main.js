'use strict';

var scroll = $(".scroll");
var slider = $(".slider");
var step = 1;

$.each(scroll, function(key, val){ creatuRerunner($(val)) });

/**********************************************************/
/*Если мы навели курсором на всю полосу скролла, 
то передвигаем бегунок*/
scroll.hover(
    function () {
        /*Привязываем событие передвижения мыши */
        $(this).on('mousemove', function(e) {
            

            // если таблица не вмещается в контейнер, то 
            // создаём скролл
            if(ifWider($(this)) == false){

                /*Находим координаты курсора по оси Х*/
                var x = getPosition(e).x;
                
                /* Добавляем в бегунок правильную ширину*/
                creatuRerunner($(this));

                /* Сдвигаем ползунок если сдвигаем курсор*/
                makeScroll($(this), x); 

            }

           // console.log(" // x pos: " + x);
        });
    },
    function () {
        /*Отвязываем событие передвижения мыши */
        $(this).off('mousemove'); // наверно удалить
    }
);

slider.on('mousemove', function(e){
    // если таблица не вмещается в контейнер, то 
    // создаём скролл
    if(ifWider($(this)) == false){

        /*Находим координаты курсора по оси Х*/
        var x = getPosition(e).x;

        /* Добавляем в бегунок правильную ширину*/
        creatuRerunner($(this));

        /* Сдвигаем ползунок если сдвигаем курсор*/
        newMakeScroll($(this), x); 

    }
    
    
});

slider.on('mouseup', function(){
    
    
    //console.log("good");
});

// курсор выходит за гранницу палзунка 
slider.on(' mouseout', function(e){
    // если таблица не вмещается в контейнер, то 
    // создаём скролл
    if(ifWider($(this)) ){

        /*Находим координаты курсора по оси Х*/
        var x = getPosition(e).x;

        /* Добавляем в бегунок правильную ширину*/
        creatuRerunner($(this));

        /* Сдвигаем ползунок если сдвигаем курсор*/
        newMakeScroll($(this), x); 

    }
    console.log("77777777777");
});

slider.on('click', function(){    
    
    $( document ).hover(
        function () {
            /*Привязываем событие передвижения мыши */
            $(".slider").on('mousemove', function(e) {


                // если таблица не вмещается в контейнер, то 
                // создаём скролл
                if(ifWider($(this)) == false){

                    /*Находим координаты курсора по оси Х*/
                    var x = getPosition(e).x;

                    /* Добавляем в бегунок правильную ширину*/
                    creatuRerunner($(this));

                    /* Сдвигаем ползунок если сдвигаем курсор*/
                    makeScroll($(this), x); 

                }

               // console.log(" // x pos: " + x);
            });
        },
        function () {
            /*Отвязываем событие передвижения мыши */
            $(this).off('mousemove'); // наверно удалить
        }
    );
    $( document ).click(
        function () {
            
            $( ".slider" ).off('mousemove');
        }
        
    );
    
    
    console.log("gohhho0d");
});
 
slider.on('mousedown', function(eventObject){
    
    /*Находим координаты курсора по оси Х*/
    
    $(this).prepend('<div class="bga"></div>');
    
    $( this ).find(".bga").mousemove( function (e) {
        
        if(ifWider($(this)) ){
            
            var x = getPosition(e).x;

            /* Добавляем в бегунок правильную ширину*/
            creatuRerunner($(this).parents(".wrapper"));

            /* Сдвигаем ползунок если сдвигаем курсор*/
            makeScroll2($(this).parents(".wrapper"), x); 
            
            //console.log( x + ' - Вы нажали на кнопку мыши, над элементом "foo". Код нажатой клавиши - ' + eventObject.which);
        }
    });
    
});
slider.on('mouseup ', function(eventObject){
    
    $(this).find(".bga").remove();
    
    
});






        //console.log("абсолютное: " + Math.abs(-2));
        //console.log("wrapper_w : " + wrapper_w);
        //console.log("sum : " + sum);
        //return  console.log("good");