function desktop() {

    let cus_scroll = document.querySelectorAll(".cus_scroll");

    // ставим ползунок при загрузке странницы
    [].forEach.call(cus_scroll, function(item) {
        creatuRerunner(item);
    });
    // cus_scroll.forEach(function(item, i, cus_scroll) {
    //     creatuRerunner(item);
    // });

    let cus_slider = document.querySelectorAll(".cus_slider");

    for(var i=0; i<cus_slider.length; i++){
        
        cus_slider[i].onmouseout = function(e){

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
        cus_slider[i].onmousedown = function(eventObject){
            
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
                    creatuRerunner(this.closest(".wrap_scroll"));

                    /* Сдвигаем ползунок если сдвигаем курсор*/
                    makeScroll(this.closest(".wrap_scroll"), x); 
                    
                    //console.log( x + ' - Вы нажали на кнопку мыши, над элементом "foo". Код нажатой клавиши - ' + eventObject.which);
                }
                return false;
            };
            return false;
        };
        cus_slider[i].onmouseup = function(eventObject){
            //$(this).find(".bga").remove();
        
            var el_del = this.querySelector(".bga");
            if(el_del !== undefined){
                el_del.remove();
            }
            return false;
        };

    }

    /**************************************************************
     * Вылавливает редкую ошибку. Проявлялась когда обводишь текст,
     * кликаешь на бегунок и курсором выходишь за экран.
     */
    window.onmouseout=function(event){ 
        if(event.relatedTarget ===null ){
            var el_del = document.querySelector(".bga");
            if(el_del === undefined || el_del === null){
                return false;
            }
            el_del.remove();
        } 
        return false;
    }

}