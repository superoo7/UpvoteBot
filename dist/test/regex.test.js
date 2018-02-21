'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regex = require('../regex');

var _assert = require('assert');

var assert = _interopRequireWildcard(_assert);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function regexTest() {
  console.log('==========REGEX TEST START==========');
  try {
    assert.equal((0, _regex.wordParser)("Helo, it's me Ive been"), 6);
    assert.equal((0, _regex.wordParser)('问题来了，博来博去博不出3个1🙈'), 14);
    console.log('success');
    console.log((0, _regex.wordParser)('既然已来到Perth了。 Hahaha world'));
    console.log((0, _regex.wordParser)('\n\u7B2C\u4E00\u6B21\u6CA1\u6709\u548C\u5BB6\u4EBA\u5E86\u795D\u534E\u4EBA\u65B0\u5E74\u3002\u65E2\u7136\u5DF2\u6765\u5230Perth\u4E86\uFF0C\u90A3\u5C31\u53BB\u6211\u7238\u7684\u670B\u53CB\u5BB6\u5E86\u795D\uFF01\n\u987A\u4FBF\u8BD5\u4E00\u4E0B\u6211\u7684\u65B0\u7684Go Pro \uD83D\uDE01\n\u9AD8\u6E05\u7248\u672C\u7684\u5728[YouTube](https://youtu.be/i16RjWX9QY0)\n        '));
  } catch (e) {
    console.log(e);
  }
  console.log('========== REGEX TEST END ==========');
}
exports.default = regexTest;
//# sourceMappingURL=regex.test.js.map