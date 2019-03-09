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
/******************************************************************/
/** вычисление координат курсора **********************************/
/** Для мобильного устройства *************************************/ 
function isContained(m, e){
    var e=e||window.event;
    var c=/(click)|(mousedown)|(mouseup)/i.test(e.type)? e.target : ( e.relatedTarget || ((e.type=="mouseover")? e.fromElement : e.toElement)  );
    while (c && c!=m)
        try {
            c=c.parentNode;
        } 
        catch(e){
            c=m;
        }
    if (c==m)
        return true;
    else
        return false;
}

/**********************************************************
* Проверяем внутреннее содержимое 
* выходит ли за гранницу?*/
function ifWider(cus_scroll){
    
    var wrap_scroll = cus_scroll.closest(".wrap_scroll");
    var table = wrap_scroll.querySelector(".table");
    
    return wrap_scroll.offsetWidth < table.offsetWidth;   
}

/**********************************************************/
/** Добавляем в бегунок` ширину*/
function creatuRerunner(cus_scroll){
    var runner = cus_scroll.querySelector(".slider") === null ? cus_scroll : cus_scroll.querySelector(".slider");  
    var wrap_scroll = cus_scroll.closest(".wrap_scroll");
    var table = wrap_scroll.querySelector(".table");
    
    var wrap_scroll_w = wrap_scroll.offsetWidth;
    var table_w = table.offsetWidth;
    
    // вычисляем сколько процентов составляет "бегунок" от общего размера видимого окна
    var sum = table_w / wrap_scroll_w;
    runner.style.width = "calc(" + "100% / " + sum + ")";

}

/**********************************************************/
/* Сдвигаем ползунок если сдвигаем курсор*/
/* Вторая версия*/
function makeScroll(cus_scroll, x){
    var runner = cus_scroll.querySelector(".slider"); 
    
    var savepos = parseInt(runner.getAttribute( "data-savepos"));
    var savex = parseInt(runner.getAttribute( "data-x"));
    
    var scrollWidth = parseInt(cus_scroll.offsetWidth);
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
/* Сдвигаем ползунок если сдвигаем курсор
*  Скрипт по входу за экран браузера
*/
function makeScrollAdd(runner, x){
    
    var margin_left = runner.style.marginLeft === "" ? 0 : parseInt(runner.style.marginLeft);

    runner.setAttribute("data-x", x);
    runner.setAttribute("data-savepos", margin_left);
    
}

