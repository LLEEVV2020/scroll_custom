/******************************************************************/
/** вычисление координат курсора **********************************/
/** Взято отсюда - https://ruseller.com/lessons.php?rub=32&id=2788*/ 
function getPosition(e) {
  var posx = 0;
  var posy = 0;

  if (!e) var e = window.event;

  if (e.pageX || e.pageY) {
    posx = e.pageX;
    posy = e.pageY;
  }
  else if (e.clientX || e.clientY) {
    posx = e.clientX + document.body.scrollLeft
      + document.documentElement.scrollLeft;
    posy = e.clientY + document.body.scrollTop
      + document.documentElement.scrollTop;
  }

  return {
    x: posx,
    y: posy
  }
}

/**********************************************************
* Проверяем внутреннее содержимое 
* выходит ли за гранницу?*/
function ifWider(scroll){
    
    var wrapper = scroll.closest(".wrapper");
    var table = wrapper.querySelector(".table");
    
    return wrapper.offsetWidth < table.offsetWidth;   
}

/**********************************************************/
/** Добавляем в бегунок` ширину*/
function creatuRerunner(scroll){
    var runner = scroll.querySelector(".slider") === null ? scroll : scroll.querySelector(".slider");  
    var wrapper = scroll.closest(".wrapper");
    var table = wrapper.querySelector(".table");
    
    var wrapper_w = wrapper.offsetWidth;
    var table_w = table.offsetWidth;
    
    // вычисляем сколько процентов составляет "бегунок" от общего размера видимого окна
    var sum = table_w / wrapper_w;
    runner.style.width = "calc(" + "100% / " + sum + ")";

}

/**********************************************************/
/* Сдвигаем ползунок если сдвигаем курсор*/
/* Вторая версия*/
function makeScroll(scroll, x){
    var runner = scroll.querySelector(".slider"); 
    
    var savepos = parseInt(runner.getAttribute( "data-savepos"));
    var savex = parseInt(runner.getAttribute( "data-x"));
    
    var scrollWidth = parseInt(scroll.offsetWidth);
    var runnerWidth = parseInt(runner.offsetWidth);
    // ставим левый отступ
    var margin_left;
    
    var stepLocal = Math.abs(savex - x);
    
    //console.log(Math.abs(savex - x));
    
    // сдвигаем влево
    if(savex > x){
        // ставим ограничение чтоб не уходило в левую сторону за гранницу
        if(savepos > 0){
            if(0 > (savepos - stepLocal)){
               savepos = 0;
            }
            else{
                savepos = savepos - stepLocal; 
            }
        }
    }  
    // сдвигаем вправо
    else{
        // ставим ограничение чтоб не уходило в правую сторону за гранницу
        if(savepos + runnerWidth < scrollWidth){
            if((scrollWidth - runnerWidth) < (savepos + stepLocal)){
               savepos = scrollWidth - runnerWidth;
            }
            else{
                savepos = savepos + stepLocal; 
            }
        } 
    }
    margin_left = savepos;
    savex = x;

    runner.style.marginLeft = margin_left + "px";
    
    /*runner.setAttribute("data-x", savex);
    runner.setAttribute("data-savepos", savepos);*/
}



/**********************************************************/
/* Сдвигаем ползунок если сдвигаем курсор*/
function makeScrollAdd(runner, x){
    
    var margin_left = runner.style.marginLeft === "" ? 0 : parseInt(runner.style.marginLeft);

    runner.setAttribute("data-x", x);
    runner.setAttribute("data-savepos", margin_left);
    
}

