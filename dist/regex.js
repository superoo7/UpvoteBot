'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// MARKDOWN REGEX

// MAIN
// BODY->IMAGE->

function wordParser(textBody) {
  var r = new RegExp('[A-Za-z0-9_]+|' + // ASCII letters (no accents)
  '[\u3040-\u309F]+|' + // Hiragana
  '[\u30A0-\u30FF]+|' + // Katakana
  '[\u4E00-\u9FFF\uF900-\uFAFF\u3400-\u4DBF]', // Single CJK ideographs
  'g');

  var bodyParser1 = imageParser(textBody);
  var bodyParser2 = linkParser(bodyParser1);

  return bodyParser2.match(r).length;
}

// IMAGE: ![]()

function imageParser(textBody) {
  var re = /!\[([^\]]*)]\(([^\)]*)\)/g;
  var returnVal = textBody.replace(re, '');
  return returnVal;
}

// LINK: []()
function linkParser(textBody) {
  var re = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/g;
  var returnVal = textBody.replace(re, '');
  return returnVal;
}

// DIV: <div class="pull-left"></div> <center></center>
function divParser(textBody) {
  return;
}

// <br><hr>
function breakLineParser(textBody) {
  return;
}

exports.wordParser = wordParser;
exports.imageParser = imageParser;
exports.linkParser = linkParser;
exports.divParser = divParser;
exports.breakLineParser = breakLineParser;
//# sourceMappingURL=regex.js.map