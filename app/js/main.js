let scroll = document.querySelectorAll(".scroll");

// ставим ползунок при загрузке странницы
// scroll.forEach(function(item, i, scroll) {
//     creatuRerunner(item);
// });
[].forEach.call(scroll, function(item) {
    creatuRerunner(item);
});

let slider = document.querySelectorAll(".slider");

for(var i=0; i<slider.length; i++){
    
    slider[i].onmouseout = function(e){
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
        return false;
    };
    // Событие mousedown срабатывает, когда кнопка 
    // мыши нажата над элементом.
    slider[i].onmousedown = function(eventObject){
        
        /*Находим координаты курсора по оси Х*/
        if(this.children.length < 1){
            var div_bga =  document.createElement('div');
            div_bga.className = "bga";
            this.appendChild(div_bga);
        }
        //console.log(this);
        this.querySelector(".bga").onmousemove = function (e) {
            
            if(ifWider(this) ){
                
                var x = getPosition(e).x;

                /* Добавляем в бегунок правильную ширину*/
                creatuRerunner(this.closest(".wrapper"));

                /* Сдвигаем ползунок если сдвигаем курсор*/
                makeScroll(this.closest(".wrapper"), x); 
                
                //console.log( x + ' - Вы нажали на кнопку мыши, над элементом "foo". Код нажатой клавиши - ' + eventObject.which);
            }
            return false;
        };
        
        return false;
    };
    slider[i].onmouseup = function(eventObject){
        //$(this).find(".bga").remove();
    
        var el_del = this.querySelector(".bga");
        if(el_del !== undefined){
            el_del.remove();
        }
        return false;
    };

}