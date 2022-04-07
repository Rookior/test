// var promise = new Promise((resolve,reject)=>{
//     setTimeout(function(){
//         console.log("2秒后执行")
//         var num = Math.ceil(Math.random() * 100);
//         if(num % 2 === 0){
//             resolve(num + "可以被2整除")
//         }else{
//             reject(new Error(num + "不可以被2整除"))
//         }
       
//     },2000)

// })

// promise
// .then(
//     (result)=>{
//         console.log(result)
//         return promise
//     }
// )
// .catch(
//     (error)=>{
//         console.log(error)
//     }
// )

var fun1 = (num)=>{
    return new Promise((resolve, reject)=>{
        if (typeof num != 'number') reject(new Error('参数必须是number类型'));
        setTimeout(()=> {
          resolve(`我延迟了${num}毫秒后输出的`)
        }, num * 1000)
    })
}

var fun2 = (num)=>{
    return new Promise((resolve, reject)=>{
        if (typeof num != 'number') reject(new Error('参数必须是number类型'));
        setTimeout(()=> {
            resolve(`我在${num}毫秒后输出的`)
        }, num * 1000)
    })
}

// fun1(3).then(result=>{
//     console.log("fun1"+result);
//     fun2(6).then(result=>{
//         console.log("fun2"+result)
//         fun1(1).then(result=>{
//             console.log(result + '，我完成了')
//         })
//     })
// })


// fun1(3).then(res=>{
//     console.log("fun1"+res);
//     return fun2(6)
// })
// .then(res=>{
//     console.log("fun2"+res)
//     return fun1(1)
// })
// .then(res=>{
//     console.log(res + ',我完成了')
// })
//错误处理 （错误后面的then不在执行）
// .catch(err=>{
//     console.log("error"+err);
// })


//  (async ()=>{
//     const result1 = await fun1(3);
//     console.log("fun1"+result1);
//     const result2 = await fun2(6)
//     console.log("fun2"+result2);
//     const result3 = await fun1(1);
//     console.log(result3 + '，我完成了')
//   })()


//   错误处理

// (async ()=>{
//     const result1 = await fun1(3).catch(err=>{
//         console.log(err)
//     });
//     console.log("fun1"+result1);
//     const result2 = await fun2(6).catch(err=>{
//         console.log(err)
//     })
//     console.log("fun2"+result2);
//     const result3 = await fun1(1).catch(err=>{
//         console.log(err)
//     })
//     console.log(result3 + '，我完成了')
//   })()


  let count = 6;
const demo = async ()=>{
  const result = await fun1(1);
  console.log(result);
  const result1 = await fun2(count);
  console.log(result1);
  if (count > 5) {
      //跳出demo到then
      return '我退出了，下面的不进行了';
    // return; 
    // return false; // 这些写法都可以
    // return null;
  }
  console.log(await fun1(1000));
  console.log('完成了');
};
demo().then(result=>{
  console.log(111,result);
})
.catch(err=>{
  console.log("error"+err);
})





