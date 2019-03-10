(function(){
//window.addEventListener('load', function(){

if ("ontouchstart" in document.documentElement) {
    mobile();
}
else {
    desktop();
}

//}, false);
})();