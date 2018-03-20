// MARKDOWN REGEX

// MAIN
// BODY->IMAGE->

function wordParser(textBody) {
  let r = new RegExp(
    '[A-Za-z0-9_]+|' + // ASCII letters (no accents)
    '[\u3040-\u309F]+|' + // Hiragana
    '[\u30A0-\u30FF]+|' + // Katakana
      '[\u4E00-\u9FFF\uF900-\uFAFF\u3400-\u4DBF]', // Single CJK ideographs
    'g'
  );

  let bodyParser1 = imageParser(textBody);
  let bodyParser2 = linkParser(bodyParser1);

  return bodyParser2.match(r).length;
}

// IMAGE: ![]()

function imageParser(textBody) {
  var re = /!\[([^\]]*)]\(([^\)]*)\)/g;
  const returnVal = textBody.replace(re, '');
  return returnVal;
}

// LINK: []()
function linkParser(textBody) {
  let re = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/g;
  const returnVal = textBody.replace(re, '');
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

export {
  wordParser,
  imageParser,
  linkParser,
  divParser,
  breakLineParser
};
