class MyPromise{
    constructor(executor){
        this.initValue();
        this.initBind();
        try {
            executor(this.resolve,this.reject)
        } catch (error) {
            this.reject(error)
        }
    }
    initBind(){
        this.resolve = this.resolve.bind(this);
        this.reject = this.reject.bind(this)
    }
    initValue(){
        this.promiseResult = null;
        this.promiseState = 'pending'
        this.onFulfilledCallbacks = [] // 保存成功回调
        this.onRejectedCallbacks = [] // 保存失败回调
    }
    resolve(val){
        if(this.promiseState !== 'pending') return
        this.promiseState = 'fulfilled';
        this.promiseResult = val
        while (this.onFulfilledCallbacks.length) {
            this.onFulfilledCallbacks.shift()(this.promiseResult)
        }
    }
    reject(error){
        if(this.promiseState !== 'pending') return
        this.promiseState = 'rejected';
        this.promiseResult = error;
        while (this.onRejectedCallbacks.length) {
            this.onRejectedCallbacks.shift()(this.promiseResult)
        }
    }
    then(onFulfilled,onRejected){

        var thenPromise = new MyPromise((resolve,reject)=>{
            const resolvePromise = cb => {
                try {
                    const x = cb(this.promiseResult)
                    if (x === thenPromise) {
                        // 不能返回自身哦
                        throw new Error('不能返回自身。。。')
                    }
                    if (x instanceof MyPromise) {
                        // 如果返回值是Promise
                        // 如果返回值是promise对象，返回值为成功，新promise就是成功
                        // 如果返回值是promise对象，返回值为失败，新promise就是失败
                        // 谁知道返回的promise是失败成功？只有then知道
                        x.then(resolve, reject)
                    } else {
                        // 非Promise就直接成功
                        resolve(x)
                    }
                } catch (err) {
                    // 处理报错
                    reject(err)
                }
            }
            if (this.promiseState === 'fulfilled') {
                // 如果当前为成功状态，执行第一个回调
               // onFulfilled(this.promiseResult)
                resolvePromise(onFulfilled)
            } else if (this.promiseState === 'rejected') {
                // 如果当前为失败状态，执行第二哥回调
                resolvePromise(onRejected)
                //onRejected(this.promiseResult)
            }else if (this.promiseState === 'pending') {
                // 如果状态为待定状态，暂时保存两个回调
                this.onFulfilledCallbacks.push(resolvePromise.bind(this, onFulfilled))
                this.onRejectedCallbacks.push(resolvePromise.bind(this, onRejected))
            }

        })
        return thenPromise

      

    }

   
}
// const test = new MyPromise((resolve,reject)=>{
//      setTimeout(() => {
//         reject('失败')
//      }, 1000)
// }).then(res => console.log(res), err => console.log(err))

const test3 = new MyPromise((resolve, reject) => {
    resolve(100) // 输出 状态：成功 值： 200
    // reject(100) // 输出 状态：失败 值：300
}).then(res => 2 * res, err => 3 * err)
    .then(res => console.log(res), err => console.log(err))




