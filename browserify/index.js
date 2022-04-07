//browserify之后为一个闭包，所以操作需要在当前js执行，或者将当前对象绑定到window

var $ = require('jquery');

//当前js存在，并执行操作
console.log($)

//绑定给window,外部使用
window.$ = $


