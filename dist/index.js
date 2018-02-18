'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.beautifyDate = exports.weightageForPost = exports.checkPostAge = exports.upvote = exports.aboutPost = exports.main = undefined;

var _steem = require('steem');

var _steem2 = _interopRequireDefault(_steem);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

require('babel-polyfill');

var _regex = require('./regex');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function main(author, permlink, config) {
  var maximumPostAge = config.maximumPostAge,
      minimumLength = config.minimumLength,
      optimumLength = config.optimumLength;


  return aboutPost(author, permlink).then(function (data) {
    console.log(data);
    if (data === 'POST_NOT_FOUND') {
      return { msg: 'POST_NOT_FOUND' };
    }

    var author = data.author,
        permlink = data.permlink,
        created = data.created,
        isCheetah = data.isCheetah,
        articleLength = data.articleLength;

    if (isCheetah) {
      return { msg: 'CHEETAH' };
    } else if (checkPostAge(created, maximumPostAge)) {
      // 3.5 days
      return { msg: 'OLD_POST' };
    } else {
      var createdTime = beautifyDate(created);
      var weightage = weightageForPost(articleLength, minimumLength, optimumLength);
      return {
        time: createdTime,
        weightage: weightage,
        author: author,
        permlink: permlink,
        msg: 'The post is created ' + createdTime + ' and will be upvoted by ' + weightage / 100 + '%'
      };
    }
  }).catch(function (error) {
    msg: 'POST_NOT_FOUND';
  });
}

// ABOUT THE POST

function aboutPost(author, permlink) {
  return new Promise(function (resolve, reject) {
    _steem2.default.api.getContent(author, permlink, function (err, result) {
      if (err || result.id === 0 && result.author === '' && result.permlink === '') {
        reject('ERROR');
      }

      var isCheetah = !(result.active_votes.filter(function (data) {
        if (data.voter === 'cheetah') {
          return true;
        }
        return false;
      }).length === 0);

      var bodyParse1 = (0, _regex.imageParser)(result.body);
      var bodyParse2 = (0, _regex.linkParser)(bodyParse1);
      var articleLength = bodyParse2.length;

      resolve({
        author: result.author,
        permlink: permlink,
        created: result.created,
        isCheetah: isCheetah,
        articleLength: articleLength
      });
    });
  }).catch(function (err) {
    return 'POST_NOT_FOUND';
  });
}

// UPVOTE

function upvote(steem_posting_key, steem_username, author, permlink, weightage) {
  return new Promise(function (resolve, reject) {
    _steem2.default.broadcast.vote(steem_posting_key, steem_username, author, permlink, weightage, function (err, result) {
      if (err) {
        reject('ERROR');
      } else if (!result) {
        reject('ERROR');
      } else if (!!result.id && !!result.block_num) {
        resolve(result);
      } else {
        reject('ERROR');
      }
    });
  }).catch(function (err) {
    return 'ERROR';
  });
}

function checkPostAge(isoDate, maximumPostAge, minimumPostAge) {
  var unixDate = new Date(isoDate.replace(/-/g, '/').replace('T', ' ').replace('Z', ''));

  return Date.now() - unixDate > maximumPostAge || Date.now() - unixDate < minimumPostAge;
}

function weightageForPost(postLength, minimumLength, optimumLength) {
  if (postLength < minimumLength) {
    // 10% VP
    return 10 * 100;
  } else if (postLength < optimumLength) {
    // 10% ~ 80% VP
    return parseInt((postLength - minimumLength) / (optimumLength - minimumLength) * 70 * 100 + 10 * 100);
  } else {
    // 80% VP
    return 80 * 100;
  }
}

function beautifyDate(isoDate) {
  return (0, _moment2.default)(isoDate).fromNow();
}

exports.main = main;
exports.aboutPost = aboutPost;
exports.upvote = upvote;
exports.checkPostAge = checkPostAge;
exports.weightageForPost = weightageForPost;
exports.beautifyDate = beautifyDate;
//# sourceMappingURL=index.js.map