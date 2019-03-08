function mobile() {
    
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
    
    window.addEventListener('load', function(){
        
        /*
        * Получаем интересующие нас элементы
        */
        var wrapscroll = document.getElementsByClassName('wrapper');
        wrapscroll = wrapscroll[0];
        var statusdiv = document.getElementsByClassName('statusdiv');
        statusdiv = statusdiv[0];
        
        var startx = 0;
        var dist = 0;
        var ontouchstartinwindow = !!('ontouchstart' in window);
        var ontouchstartdocumentdocumentElement =!!('ontouchstart' in document.documentElement);
        var windowontouchstart =  !!window.ontouchstart 
        var windowTouch = !!window.Touch; 
        var windowonmsgesturechange = !!window.onmsgesturechange 
        var windowDocumentTouch = (window.DocumentTouch && window.document instanceof window.DocumentTouch);
        
        
        var detecttouch = !!('ontouchstart' in window) || !!('ontouchstart' in document.documentElement) || !!window.ontouchstart || !!window.Touch || !!window.onmsgesturechange || (window.DocumentTouch && window.document instanceof window.DocumentTouch);
        
        var ismousedown = false;
        
        wrapscroll.addEventListener('touchstart', function(e){
            var touchobj = e.changedTouches[0]; // reference first touch point (ie: first finger)
            startx = parseInt(touchobj.clientX);
            statusdiv.innerHTML = 'Событие: touchstart<br /> ClientX: ' + startx + 'px';
            e.preventDefault();
        }, false);
        
        wrapscroll.addEventListener('touchmove', function(e){
            var touchobj = e.changedTouches[0]; // reference first touch point (ie: first finger)
            var dist = parseInt(touchobj.clientX) - startx;
            statusdiv.innerHTML = 'Событие: touchmove<br /> Гориз. перемещение: ' + dist + 'pxxx' + ' ' + ontouchstartinwindow + ' ' + ontouchstartdocumentdocumentElement  + ' ' + windowontouchstart + ' ' + windowTouch + ' ' + windowonmsgesturechange + ' ' + windowDocumentTouch + ' ';
            e.preventDefault();
        }, false);
        
        wrapscroll.addEventListener('touchend', function(e){
            var touchobj = e.changedTouches[0]; // reference first touch point (ie: first finger)
            statusdiv.innerHTML = 'Событие: touchend<br /> Координаты точки x: ' + touchobj.clientX + 'px';
            e.preventDefault();
        }, false);
        
        if (detecttouch){
    
            document.body.addEventListener('mousedown', function(e){
                if ( isContained(wrapscroll, e) ){
                    var touchobj = e;
                    ismousedown = true;
                    startx = parseInt(touchobj.clientX);
                    statusdiv.innerHTML = 'Событие: touchstart<br /> ClientX: ' + startx + 'px';
                    e.preventDefault();
                }
            }, false);
            
            document.body.addEventListener('mousemove', function(e){
                if (ismousedown){
                    var touchobj = e;
                    var dist = parseInt(touchobj.clientX) - startx;
                    statusdiv.innerHTML = 'Событие: touchmove<br /> Гориз. перемещение: ' + dist + 'px';
                    e.preventDefault();
                }
            }, false);
            
            document.body.addEventListener('mouseup', function(e){
                var touchobj = e;
                ismousedown = false;
                statusdiv.innerHTML = 'Событие: touchend<br /> Координаты точки x: ' + touchobj.clientX + 'px'
                e.preventDefault();
            }, false);
    
        }
    
    }, false);
        
}