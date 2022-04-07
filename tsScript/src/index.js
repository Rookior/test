"use strict";
exports.__esModule = true;
/********基础类型
语法：let 变量: 变量类型
    boolean, number, string, number[], 元组[string,number], 枚举{red,green.blue},
    any, void, null, undefined, 永远不存在never, object
******************/
var a = 9;
console.log(a);
/***
 * 变量声明
 * let、const块级作用域，
 * 被声明之前属于暂时性死区，不能在声明前访问，不允许重复声明
 * const不能重新赋值
 *
 *
 *
 * ******/
var b = 1;
// let b = 2;
for (var i = 0; i < 10; i++) {
    setTimeout(function () { console.log(i); }, 100 * i); //10
}
var _loop_1 = function (i_1) {
    setTimeout(function () { console.log(i_1); }, 100 * i_1); //1,2,3,4,5...10
};
for (var i_1 = 0; i_1 < 10; i_1++) {
    _loop_1(i_1);
}
/*******
 * 属性重命名：let { a: newName1, b: newName2 } = o;
 *
 * ********/
var _a = { p: 'p', q: 'q' }, newName1 = _a.p, newName2 = _a.q;
var Student = /** @class */ (function () {
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
    return Student;
}());
var user = new Student("wei", "M.", "ziyan");
console.log(user);
var square = {};
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;
/*********
 * 类
 *
 * 公共public，私有private与受保护的修饰符protected（派生类可以访问）
 * readonly只读
 * 抽象函数abstract
 * *************/
var Greeter = /** @class */ (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    return Greeter;
}());
var greeter = new Greeter("world");
// 输入
var circle_js_1 = require("./circle.js");
console.log("\u534A\u5F84\u4E3A 4 \u7684\u5706\u7684\u9762\u79EF\u662F: " + circle_js_1.area(4));
