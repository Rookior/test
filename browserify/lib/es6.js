'use strict';

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//当前js存在，并执行操作
console.log(_jquery2.default);

//绑定给window,外部使用
window.jQuery = _jquery2.default;