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

/**********************************************************/
/** Добавляем в бегунок` ширину*/
function creatuRerunner(scroll){
    var runner = scroll.find(".slider");  
    var wrapper = scroll.parents(".wrapper");
    var table = wrapper.find(".table");
    
    var wrapper_w = wrapper.width();
    var table_w = table.width();
    
    // вычисляем сколько процентов составляет "бегунок" от общего размера видимого окна
    var sum = table_w / wrapper_w;
    runner.css({
        "width": "calc(" + "100% / " + sum + ")"
    });
}


/**********************************************************/
/* Сдвигаем ползунок если сдвигаем курсор*/
/* Вторая версия*/
function makeScroll2(scroll, x){
    var runner = scroll.find(".slider"); 
    
    var savepos = parseInt(runner.attr( "data-savepos"));
    var savex = parseInt(runner.attr( "data-x"));
    
    var scrollWidth = parseInt(scroll.css("width"));
    var runnerWidth = parseInt(runner.css("width"));
    // ставим левый отступ
    var margin_left;
    
    var stepLocal = Math.abs(savex - x);
    
    console.log(Math.abs(savex - x));
    
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

    runner.css({
        "margin-left": margin_left + "px"
    });
    runner.attr({"data-x": savex});
    runner.attr({"data-savepos": savepos});
    
}

/**********************************************************/
/* Сдвигаем ползунок если сдвигаем курсор*/
function newMakeScroll(runner, x){
    
    var savepos = parseInt(runner.attr( "data-savepos"));
    var savex = parseInt(runner.attr( "data-x"));
    
    var scrollWidth = parseInt(scroll.css("width"));
    var runnerWidth = parseInt(runner.css("width"));
    // ставим левый отступ
    var margin_left;
    
    // сдвигаем влево
    if(savex > x){
        // ставим ограничение чтоб не уходило в левую сторону за гранницу
        if(savepos > 0){
            savepos = savepos - step; 
        }
    }  
    // сдвигаем вправо
    else{
        // ставим ограничение чтоб не уходило в правую сторону за гранницу
        if(savepos + runnerWidth < scrollWidth){
            savepos = savepos + step; 
        } 
    }
    margin_left = savepos;
    savex = x;

    runner.css({
        "margin-left": margin_left + "px"
    });
    runner.attr({"data-x": savex});
    runner.attr({"data-savepos": savepos});
    
}

/**********************************************************/
/* Проверяем внутреннее содержимое 
выходит ли за гранницу?*/
function ifWider(scroll){
    
    var wrapper = scroll.parents(".wrapper");
    var table = wrapper.find(".table");
    
    return wrapper.width() < table.width();   
}
