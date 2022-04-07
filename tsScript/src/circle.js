"use strict";
exports.__esModule = true;
exports.circumference = exports.area = void 0;
// circle.js
// 输出
var PI = Math.PI;
var area = function (r) { return PI * Math.pow(r, 2); };
exports.area = area;
var circumference = function (r) { return 2 * PI * r; };
exports.circumference = circumference;
