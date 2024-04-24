/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/circle.js":
/*!***********************!*\
  !*** ./src/circle.js ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nexports.__esModule = true;\r\nexports.circumference = exports.area = void 0;\r\n// circle.js\r\n// 输出\r\nvar PI = Math.PI;\r\nvar area = function (r) { return PI * Math.pow(r, 2); };\r\nexports.area = area;\r\nvar circumference = function (r) { return 2 * PI * r; };\r\nexports.circumference = circumference;\r\n\n\n//# sourceURL=webpack://tsscript/./src/circle.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nexports.__esModule = true;\r\n/********基础类型\r\n语法：let 变量: 变量类型\r\n    boolean, number, string, number[], 元组[string,number], 枚举{red,green.blue},\r\n    any, void, null, undefined, 永远不存在never, object\r\n******************/\r\nvar a = 9;\r\nconsole.log(a);\r\n/***\r\n * 变量声明\r\n * let、const块级作用域，\r\n * 被声明之前属于暂时性死区，不能在声明前访问，不允许重复声明\r\n * const不能重新赋值\r\n *\r\n *\r\n *\r\n * ******/\r\nvar b = 1;\r\n// let b = 2;\r\nfor (var i = 0; i < 10; i++) {\r\n    setTimeout(function () { console.log(i); }, 100 * i); //10\r\n}\r\nvar _loop_1 = function (i_1) {\r\n    setTimeout(function () { console.log(i_1); }, 100 * i_1); //1,2,3,4,5...10\r\n};\r\nfor (var i_1 = 0; i_1 < 10; i_1++) {\r\n    _loop_1(i_1);\r\n}\r\n/*******\r\n * 属性重命名：let { a: newName1, b: newName2 } = o;\r\n *\r\n * ********/\r\nvar _a = { p: 'p', q: 'q' }, newName1 = _a.p, newName2 = _a.q;\r\nvar Student = /** @class */ (function () {\r\n    function Student(firstName, middleInitial, lastName) {\r\n        this.firstName = firstName;\r\n        this.middleInitial = middleInitial;\r\n        this.lastName = lastName;\r\n        this.fullName = firstName + \" \" + middleInitial + \" \" + lastName;\r\n    }\r\n    return Student;\r\n}());\r\nvar user = new Student(\"wei\", \"M.\", \"ziyan\");\r\nconsole.log(user);\r\nvar square = {};\r\nsquare.color = \"blue\";\r\nsquare.sideLength = 10;\r\nsquare.penWidth = 5.0;\r\n/*********\r\n * 类\r\n *\r\n * 公共public，私有private与受保护的修饰符protected（派生类可以访问）\r\n * readonly只读\r\n * 抽象函数abstract\r\n * *************/\r\nvar Greeter = /** @class */ (function () {\r\n    function Greeter(message) {\r\n        this.greeting = message;\r\n    }\r\n    Greeter.prototype.greet = function () {\r\n        return \"Hello, \" + this.greeting;\r\n    };\r\n    return Greeter;\r\n}());\r\nvar greeter = new Greeter(\"world\");\r\n// 输入\r\nvar circle_js_1 = __webpack_require__(/*! ./circle.js */ \"./src/circle.js\");\r\nconsole.log(\"\\u534A\\u5F84\\u4E3A 4 \\u7684\\u5706\\u7684\\u9762\\u79EF\\u662F: \" + circle_js_1.area(4));\r\n\n\n//# sourceURL=webpack://tsscript/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;