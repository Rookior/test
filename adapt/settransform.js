(function(){

    var doc = document;
    var docEle = doc.documentElement;
    // doc.getElementsByTagName('body')[0].id = 'main'; //增加calss
    var nw = docEle.getBoundingClientRect().width;
    var w = 1920;
    //w->nw ==> w * nw/w = nw;
    if(nw<w){
       scale = nw/w;
    }else{
        scale = nw/w;
    }
    // doc.querySelector('#main').style = 'transform: scale('+scale+')';  
    // doc.querySelector('#main').style.transformOrigin="0 0";
    doc.querySelector('body').style = 'transform: scale('+scale+')';  
    doc.querySelector('body').style.transformOrigin="0 0";
    
    })()