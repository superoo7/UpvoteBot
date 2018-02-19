import steem from 'steem';
import moment from 'moment';

import 'babel-polyfill';

import { wordParser } from './regex';

function main(author, permlink, config) {
  const {
    maximumPostAge,
    minimumPostAge,
    minimumLength,
    optimumLength
  } = config;

  return aboutPost(author, permlink)
    .then(data => {
      if (data === 'POST_NOT_FOUND') {
        return { msg: 'POST_NOT_FOUND' };
      }
      const {
        author,
        permlink,
        created,
        isCheetah,
        articleLength
      } = data;
      if (isCheetah) {
        return { msg: 'CHEETAH' };
      } else if (
        checkPostAge(
          created,
          maximumPostAge,
          minimumPostAge
        )
      ) {
        // 3.5 days or 30 minutes
        return { msg: 'OLD_POST' };
      } else {
        let createdTime = beautifyDate(created);
        let weightage = weightageForPost(
          articleLength,
          minimumLength,
          optimumLength
        );
        return {
          time: createdTime,
          weightage,
          author,
          permlink,
          msg: `The post is created ${createdTime} and will be upvoted by ${weightage /
            100}%`
        };
      }
    })
    .catch(error => {
      msg: 'POST_NOT_FOUND';
    });
}

// ABOUT THE POST
function aboutPost(author, permlink) {
  return new Promise(function(resolve, reject) {
    steem.api.getContent(author, permlink, function(
      err,
      result
    ) {
      if (
        err ||
        (result.id === 0 &&
          result.author === '' &&
          result.permlink === '')
      ) {
        reject('ERROR');
      }

      const isCheetah = !(
        result.active_votes.filter(data => {
          if (data.voter === 'cheetah') {
            return true;
          }
          return false;
        }).length === 0
      );

      const articleLength = wordParser(result.body);

      resolve({
        author: result.author,
        permlink,
        created: result.created,
        isCheetah,
        articleLength
      });
    });
  }).catch(err => 'POST_NOT_FOUND');
}

// UPVOTE

function upvote(
  steem_posting_key,
  steem_username,
  author,
  permlink,
  weightage
) {
  return new Promise(function(resolve, reject) {
    steem.broadcast.vote(
      steem_posting_key,
      steem_username,
      author,
      permlink,
      weightage,
      function(err, result) {
        if (err) {
          reject('ERROR');
        } else if (!result) {
          reject('ERROR');
        } else if (!!result.id && !!result.block_num) {
          resolve(result);
        } else {
          reject('ERROR');
        }
      }
    );
  }).catch(err => 'ERROR');
}

function checkPostAge(
  isoDate,
  maximumPostAge,
  minimumPostAge
) {
  const unixDate = new Date(
    isoDate
      .replace(/-/g, '/')
      .replace('T', ' ')
      .replace('Z', '')
  );

  return (
    Date.now() - unixDate > maximumPostAge ||
    Date.now() - unixDate < minimumPostAge
  );
}

function weightageForPost(
  postLength,
  minimumLength,
  optimumLength
) {
  if (postLength < minimumLength) {
    // 10% VP
    return 10 * 100;
  } else if (postLength < optimumLength) {
    // 10% ~ 80% VP
    return parseInt(
      (postLength - minimumLength) /
        (optimumLength - minimumLength) *
        10 *
        100 +
        10 * 100
    );
  } else {
    // 20% VP
    return 20 * 100;
  }
}

function beautifyDate(isoDate) {
  return moment(isoDate).fromNow();
}

export {
  main,
  aboutPost,
  upvote,
  checkPostAge,
  weightageForPost,
  beautifyDate
};
