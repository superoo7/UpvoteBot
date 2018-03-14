'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getComment = exports.beautifyDate = exports.weightageForPost = exports.checkPostAge = exports.upvote = exports.aboutPost = exports.main = undefined;

var _steem = require('steem');

var _steem2 = _interopRequireDefault(_steem);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

require('babel-polyfill');

var _regex = require('./regex');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function main(author, permlink, config) {
  var maximumPostAge = config.maximumPostAge,
      minimumPostAge = config.minimumPostAge,
      minimumLength = config.minimumLength,
      optimumLength = config.optimumLength,
      _config$unwantedTags = config.unwantedTags,
      unwantedTags = _config$unwantedTags === undefined ? [] : _config$unwantedTags,
      _config$requiredTags = config.requiredTags,
      requiredTags = _config$requiredTags === undefined ? [] : _config$requiredTags;


  return aboutPost(author, permlink, unwantedTags, requiredTags).then(function (data) {
    if (data === 'POST_NOT_FOUND') {
      return { msg: 'POST_NOT_FOUND' };
    }
    console.log(data);
    var author = data.author,
        permlink = data.permlink,
        created = data.created,
        isCheetah = data.isCheetah,
        isUnwantedTagExist = data.isUnwantedTagExist,
        isRequiredTagNotExist = data.isRequiredTagNotExist,
        articleLength = data.articleLength;

    if (isCheetah) {
      return { msg: 'CHEETAH' };
    } else if (isUnwantedTagExist) {
      return { msg: 'UNWANTED_TAGS' };
    } else if (isRequiredTagNotExist) {
      return { msg: 'REQUIRED_TAGS' };
    } else if (checkPostAge(created, maximumPostAge, minimumPostAge)) {
      // 3.5 days or 30 minutes
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
  var unwantedTags = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var requiredTags = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

  return new Promise(function (resolve, reject) {
    _steem2.default.api.getContent(author, permlink, function (err, result) {
      if (err || result.id === 0 && result.author === '' && result.permlink === '') {
        reject('ERROR');
      }

      var tags = JSON.parse(result.json_metadata).tags;
      var isUnwantedTagExist = !(tags.filter(function (tag) {
        if (unwantedTags.includes(tag)) {
          return true;
        }
        return false;
      }).length === 0);
      console.log(requiredTags);
      console.log(tags);
      var isRequiredTagNotExist = !(tags.filter(function (tag) {
        if (requiredTags.includes(tag)) {
          console.log(tag);
          return true;
        }
        return false;
      }).length === requiredTags.length);

      console.log(result.children);
      var isCheetah = !(result.active_votes.filter(function (data) {
        if (data.voter === 'cheetah') {
          return true;
        }
        return false;
      }).length === 0);

      var articleLength = (0, _regex.wordParser)(result.body);

      resolve({
        author: result.author,
        permlink: permlink,
        created: result.created,
        isCheetah: isCheetah,
        isUnwantedTagExist: isUnwantedTagExist,
        isRequiredTagNotExist: isRequiredTagNotExist,
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
    // 0% VP
    return 0;
  } else if (postLength < optimumLength) {
    // 10% ~ 30% VP
    return parseInt((postLength - minimumLength) / (optimumLength - minimumLength) * 10 * 100 + 20 * 100);
  } else {
    // 30% VP
    return 30 * 100;
  }
}

function beautifyDate(isoDate) {
  return (0, _moment2.default)(isoDate).fromNow();
}

function getComment(author, permlink) {
  return _axios2.default.get('https://api.steemjs.com/get_content_replies?author=' + author + '&permlink=' + permlink).then(function (data) {
    return data.data;
  });
}

exports.main = main;
exports.aboutPost = aboutPost;
exports.upvote = upvote;
exports.checkPostAge = checkPostAge;
exports.weightageForPost = weightageForPost;
exports.beautifyDate = beautifyDate;
exports.getComment = getComment;
//# sourceMappingURL=index.js.map