(function(){
//window.addEventListener('load', function(){

/**
 * Добавление обёртки для классов .table
 */

if ("ontouchstart" in document.documentElement) {
    mobile();
}
else {
    desktop();
}

//}, false);
})();