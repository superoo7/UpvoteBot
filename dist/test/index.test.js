'use strict';

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _index = require('../index');

var _regex = require('./regex.test');

var _regex2 = _interopRequireDefault(_regex);

var _steem = require('steem');

var _steem2 = _interopRequireDefault(_steem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// REGEX TEST
(0, _regex2.default)();

// main
var config = {
  maximumPostAge: 302400000,
  minimumPostAge: 1800000,
  minimumLength: 250,
  optimumLength: 4000,
  unwantedTags: ['steepshot', 'dmania', 'decentmeme', 'nsfw'],
  requiredTags: ['teammalaysia']
};

// main(
//   'nikisteem',
//   'why-i-love-eating-eggs-on-keto',
//   config
// ).then(data => console.log(data));

(0, _index.getComment)('nikisteem', 'why-i-love-eating-eggs-on-keto').then(function (data) {
  // console.log(data);
  console.log(!(data.filter(function (comment) {
    return comment.author === 'cheetah';
  }).length === 0));
});
//# sourceMappingURL=index.test.js.map