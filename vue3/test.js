const depsMap=new Map()

function tract(key){
    let dep = depsMap.get(key)
    if(!dep){
        depsMap.set(key,(dep = new Set()))
    }
    dep.add(effect)
}
function trigger(key){
    let dep = depsMap.get(key)
    if(dep){
        dep.forEach(effect => {
            effect()
        });
    }
}

let product = {price:5,quantity:2}

let total = 0;

let effect = ()=>{
    total = product.price * product.quantity
}

tract('quantity')
effect()

console.log(total)

product.quantity = 3;

trigger('quantity')

console.log(total)
