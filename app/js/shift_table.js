function shift_table(params, wrap_scroll) {
    console.log(params + " + " +  wrap_scroll);

    let table = wrap_scroll.querySelector(".table"); 
    let cus_slider = wrap_scroll.querySelector(".cus_slider"); 

    let ml = cus_slider.style.marginLeft;

    console.log("ml = " + ml  + " cus_slider.style.marginLeft = " + cus_slider.style.marginLeft);
}