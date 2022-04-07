


let product = {
    price :5,
    num:2
}
let total = 0;




let effect = function(){

    total = product.price * product.num
}


let dep = new Set();
function track(){
    dep.add(effect)
}

function trigger(){
    dep.forEach(effect=>effect())
}
// 将可能执行的effect添加到effect集dep里面
track()

product.num = 3;
trigger()
console.log(total)

// effect()


// trigger()

