

function effect(eff){
    activeEffect = eff
    activeEffect()
    activeEffect = null
}

const targetMap = new WeakMap()
let activeEffect = null;

function track (target,key){
    if(activeEffect){
        let depsMap = targetMap.get(target);
        if(!depsMap){
            targetMap.set(target,(depsMap = new Map()))
        }
        let dep = depsMap.get(key)
        if(!dep){
            depsMap.set(key,(dep = new Set()))
        }
        dep.add(activeEffect)
    }
   
}

function trigger(target,key){
    const depsMap = targetMap.get(target);
    if(!depsMap){return}
    let dep = depsMap.get(key)
    if(dep){
        dep.forEach(effect => {
            effect()
        });
    }
}


function reactive(target){
    
    const handler = {
        get(target,key,receiver){
            console.log("Get was called with key=" + key)
            let result = Reflect.get(target,key,receiver)
            track(target,key)

            return  result

        },
        set(target,key,value,receiver){
            console.log('Set was called with key=' + key + 'and value =' + value)
            let oldVal = target[key]
            let result = Reflect.set(target,key,value,receiver)
            if(oldVal != value){
                trigger(target,key)
            }
            return result
        }
    }
    return new Proxy(target,handler)

}





let product =  reactive({price:5,quantity:2})
let total = 0;
let salePrice = 0
let effect = ()=>{
    total = product.price * product.quantity
}
let effect = ()=>{
    salePrice = product * 0.9
}

console.log(total)

product.quantity = 3;

console.log(total)


