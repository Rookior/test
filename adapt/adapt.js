
// function setRootFontSize(){
//     var doc = document;
//     var docEle = doc.documentElement;
//     var nw = docEle.getBoundingClientRect().width;
//     var w = 1920;
//     //w->nw ==> w * nw/w = nw;
//     if(nw<w){
//        scale = nw/w;
//     }else{
//         scale = nw/w;
//     }
//    doc.querySelector('#main').style = 'transform: scale('+scale+')';     
// }
// setRootFontSize()

(function(){

    var doc = document;
    var docEle = doc.documentElement;
    var nw = docEle.getBoundingClientRect().width;
    var w = 1920;
    //w->nw ==> w * nw/w = nw;
    if(nw<w){
       scale = nw/w;
    }else{
        scale = nw/w;
    }
    docEle.style.zoom = scale;
  //  doc.querySelector('#main').style.zoom = scale;
//    doc.querySelector('#main').style = 'transform: scale('+scale+')';  
//    doc.querySelector('#main').style.transformOrigin="0 0";

})()