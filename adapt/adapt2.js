function adapt2 (w){
    var docEl = window.document.documentElement;
    var width = docEl.getBoundingClientRect().width;
    var rem = width / w * 20;
    docEl.style.fontSize = rem + "px";
    // var actualSize = parseFloat(window.getComputedStyle(docEl)["font-size"]);
    // if (actualSize !== rem) {
    //     var remScaled = rem / ( actualSize / rem );
    //     docEl.style.fontSize = remScaled + "px"
    // }
    return rem
}

$(function(){
    setTimeout("adapt2(1920)",0);
    // 1920 的 1rem = 20px
})