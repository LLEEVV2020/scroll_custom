
var aTags = document.querySelectorAll('.slider');

for(var i=0; i<aTags.length; i++){
    aTags[i].addEventListener('click', function(){
        var href = this.href;
        alert(href);
    });
}