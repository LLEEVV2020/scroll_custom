function mobile() {
    
let wrap_scroll = document.querySelectorAll(".wrap_scroll");

[].forEach.call(wrap_scroll, function(item) {
    creatuRerunner(item);
});

let wrapscroll = document.getElementsByClassName('wrap_scroll');
let statusdiv = document.getElementsByClassName('statusdiv');
statusdiv = statusdiv[0];


let ontouchstartinwindow = !!('ontouchstart' in window);
let ontouchstartdocumentdocumentElement =!!('ontouchstart' in document.documentElement);
let windowontouchstart =  !!window.ontouchstart 
let windowTouch = !!window.Touch; 
let windowonmsgesturechange = !!window.onmsgesturechange 
let windowDocumentTouch = (window.DocumentTouch && window.document instanceof window.DocumentTouch);

for(let i=0; i<wrapscroll.length; i++){
    
    let startx = 0;    
    
    wrapscroll[i].addEventListener('touchstart', function(e){
        let touchobj = e.changedTouches[0]; // reference first touch point (ie: first finger)
        startx = parseInt(touchobj.clientX);
        statusdiv.innerHTML = 'Событие: touchstart<br /> ClientX: ' + startx + 'px';
        e.preventDefault();
    }, false);
    
    wrapscroll[i].addEventListener('touchmove', function(e){
        let touchobj = e.changedTouches[0]; // reference first touch point (ie: first finger)
        let dist = parseInt(touchobj.clientX) - startx;
        statusdiv.innerHTML = 'Событие: touchmove<br /> Гориз. перемещение: ' + dist + 'pxxx' + ' ' + ontouchstartinwindow + ' ' + ontouchstartdocumentdocumentElement  + ' ' + windowontouchstart + ' ' + windowTouch + ' ' + windowonmsgesturechange + ' ' + windowDocumentTouch + ' ';
        e.preventDefault();
    }, false);
    
    wrapscroll[i].addEventListener('touchend', function(e){
        let touchobj = e.changedTouches[0]; // reference first touch point (ie: first finger)
        statusdiv.innerHTML = 'Событие: touchend<br /> Координаты точки x: ' + touchobj.clientX + 'px ????';
        e.preventDefault();
    }, false);
    
    
}        
}