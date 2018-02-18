'use strict';

var _index = require('./index.test');

var _regex = require('./regex.test');

var _regex2 = _interopRequireDefault(_regex);

var _index2 = require('../index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// REGEX TEST
(0, _regex2.default)();

// ABOUT POST TEST
(0, _index.aboutTest)();

// main
var config = {
  maximumPostAge: 302400000,
  minimumPostAge: 1800000,
  minimumLength: 250,
  optimumLength: 4000
};

(0, _index2.main)('superoo7', 'edi2ys68', config).then(function (data) {
  return console.log(data);
});
//# sourceMappingURL=main.test.js.map