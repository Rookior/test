/********基础类型
语法：let 变量: 变量类型
    boolean, number, string, number[], 元组[string,number], 枚举{red,green.blue}, 
    any, void, null, undefined, 永远不存在never, object
******************/
let a : Number = 9
console.log(a)

/***
 * 变量声明
 * let、const块级作用域，
 * 被声明之前属于暂时性死区，不能在声明前访问，不允许重复声明
 * const不能重新赋值
 * 
 * 
 * 
 * ******/ 
let b = 1;
// let b = 2;
for (var i = 0; i < 10 ; i++) {
    setTimeout(function() {console.log(i); }, 100 * i);  //10
}
for (let i = 0; i < 10 ; i++) {
    setTimeout(function() {console.log(i); }, 100 * i);  //1,2,3,4,5...10
}
/*******
 * 属性重命名：let { a: newName1, b: newName2 } = o;
 * 
 * ********/ 
 let { p: newName1, q: newName2 } = {p:'p',q:'q'};

/***********
 * 接口
 * 
 * 
 * ***************/  
interface Person{
    firstName:string,
    lastName:string
}
class Student {
    fullName: string;
    constructor(public firstName, public middleInitial, public lastName) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}
let user = new Student( "wei", "M.", "ziyan" );
console.log(user)
/***********
 * 
 * 静态与动态
 * 
 * ***************/  
// interface ClockConstructor {
//     new (hour: number, minute: number);
// }

// class Clock implements ClockConstructor {
//     currentTime: Date;
//     constructor(h: number, m: number) { }
// }
/*****
 * 
 * 继承接口extends
 * 可以继承多个
 * *******/ 

interface Shape {
    color: string;
}
interface PenStroke {
    penWidth: number;
}

interface Square extends Shape, PenStroke {
    sideLength: number;
}

let square = <Square>{};
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

 class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

let greeter = new Greeter("world");


// 输入
import {
    area
} from './circle.js'
console.log(`半径为 4 的圆的面积是: ${area(4)}`)