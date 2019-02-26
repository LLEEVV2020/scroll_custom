'use strict';

var slider = $(".slider");
var step = 1;

$.each(scroll, function(key, val){ creatuRerunner($(val)) });

/**********************************************************/




 
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
