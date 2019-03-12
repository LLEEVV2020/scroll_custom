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
    var runner = cus_scroll.querySelector(".cus_slider") === null ? cus_scroll : cus_scroll.querySelector(".cus_slider");  
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
    var runner = cus_scroll.querySelector(".cus_slider"); 
    
    var savepos = parseInt(runner.getAttribute( "data-savepos"));
    var savex = parseInt(runner.getAttribute( "data-x"));
    
    var wrap_scroll = cus_scroll.closest(".wrap_scroll");

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
                shift_table("ВЛЕВО: savepos = " + 0, wrap_scroll);
                savepos = 0;
            }
            else{
                shift_table("ВЛЕВО: savepos - stepLocal = " + (savepos - stepLocal), wrap_scroll);
                savepos = savepos - stepLocal; 
            }
        }
    }  
    // сдвигаем вправо
    else{
        // ставим ограничение чтоб не уходило в правую сторону за гранницу
        if(savepos + runnerWidth < scrollWidth){
            if((scrollWidth - runnerWidth) < (savepos + stepLocal)){
                shift_table("ВПРАВО: scrollWidth - runnerWidth = " + (scrollWidth - runnerWidth), wrap_scroll);
                savepos = scrollWidth - runnerWidth;
            }
            else{
                shift_table("ВПРАВО: savepos + stepLocal = " + (savepos + stepLocal), wrap_scroll);
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

/**
 * 
 * @param {событие ошибки} e 
 */
function onWheel(wrap_scroll, x, e) {
    e = e || window.event;
    
    let delta = e.deltaY || e.detail || e.wheelDelta;
    if(delta > 0){
        delta = 5;
    } else {
        delta = -5;
    }
    let stepLocal = delta;


    let runner = wrap_scroll.querySelector(".cus_slider"); 
    let wrap_cus_scroll = wrap_scroll.querySelector(".cus_scroll").scrollWidth; 

    let savepos = parseInt(runner.getAttribute( "data-savepos"));
    let savex = parseInt(runner.getAttribute( "data-x"));

    let ml = runner.style.marginLeft !== "" ? parseInt(runner.style.marginLeft) : 0;
    let wFloat = runner.style.width !== "" ? runner.style.width.match(/[\d|,|.|\+]+/g) : 0;
    wFloat = +wFloat[0];

    let scrollWidth = parseInt(wrap_scroll.offsetWidth);
    let runnerWidth = parseInt(runner.offsetWidth);
    let runnerWidthsavepos = runnerWidth + savepos;
    let scrollWidthrunnerWidth = scrollWidth - runnerWidth;
    if(ml !== savepos){
        shift_table("ВЛЕВО --ШЕСТЕРЁНОК--: ml = " + ml, wrap_scroll);
        savepos = ml;
    }
    else {
        if(0 > savepos ){
            shift_table("ВЛЕВО --ШЕСТЕРЁНОК--: 0 = " + 0, wrap_scroll);
            savepos = 0;
        }
        else if(scrollWidth > runnerWidthsavepos ){
            if((scrollWidth - runnerWidthsavepos) < stepLocal){
                shift_table("ВПРАВО --ШЕСТЕРЁНОК--: scrollWidthrunnerWidth = " + scrollWidthrunnerWidth, wrap_scroll);
                savepos = scrollWidthrunnerWidth;
            } else{
                shift_table("ВПРАВО --ШЕСТЕРЁНОК--: savepos + stepLocal = " + (savepos + stepLocal), wrap_scroll);
                savepos = savepos + stepLocal;
            }
        }
        else{
            if(stepLocal > 0){
                shift_table("ВЛЕВО --ШЕСТЕРЁНОК--: savepos = " + savepos, wrap_scroll);
                savepos = savepos;
                wFloat = Math.round(wFloat * 10000) / 10000 ;
                let sum = wrap_cus_scroll * wFloat   / 100; 
                sum = sum + 0.001;
                let localSum = parseInt(sum);
                sum =  sum - localSum;
                if(sum > 0.499999999999999 ){
                    savepos++;
                } 
            } else{
                shift_table("ВЛЕВО --ШЕСТЕРЁНОК--: savepos = " + (savepos + stepLocal), wrap_scroll);
                savepos = savepos + stepLocal;
            }
            
        }
    }
    
    margin_left = savepos;
    if(margin_left < 0){
        margin_left = 0;
    }
    
    runner.style.marginLeft = margin_left + "px";
    runner.setAttribute("data-x", savex);
    runner.setAttribute("data-savepos", margin_left);

    //info.innerHTML = +info.innerHTML + delta;

    e.preventDefault ? e.preventDefault() : (e.returnValue = false);
}

