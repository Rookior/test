function fadeToTarget(targetJ){
    $('.mask-panel').hide();

    var targetTop = targetJ.offset().top - $(document).scrollTop() + targetJ.height()/2 +273;
    var targetLeft = targetJ.offset().left - $(document).scrollLeft() + targetJ.width()/2 +445;

    $('.mask-pic').animate({
        width:0,
        height:0,
        top:targetTop,
        left:targetLeft
    },800);
    $('.mask').delay(500).fadeOut(500);
}

function initMask(){
    $('.mask').height($(document).height())
    .width($(document).width());

    var timer;
    timer = setTimeout(()=>{
        fadeToTarget($('#target'));
    },15000);

    $('.mask-close').click(function(){
        fadeToTarget($('#target'));
        clearTimeout(timer);
    })
}

function mask(){
    initMask();
}

mask();