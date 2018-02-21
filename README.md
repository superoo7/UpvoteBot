# UpvoteBot for Teammalaysia

Bot that contains function for upvoting quality content on steem blog.

## Quality check

* Make sure content is not plagiarize. (by cheetah bot)
* Make sure post is not too old.
* Make sure post is not too short. Upvote weightage scale with length of post.

## Installation

`npm install --save steem-upvote-util` or `yarn add steem-upvote-util`

## Usage

### CommonJS

#### Get data of a post

##### code

```
const util = require('steem-upvote-util');

const author = 'superoo7';
const permlink = 'gopro-hero-6-2018-02-13-09-33-41';
const config = {
  maximumPostAge: 302400000,
  minimumPostAge: 1800000,
  minimumLength: 250,
  optimumLength: 4000
};

util.main(author, permlink, config).then(data => console.log(data));
```

##### result

* If okay

```
{
  time: 'a day ago',
  weightage: 1188,
  author: 'superoo7',
  permlink: 'gopro-hero-6-2018-02-13-09-33-41',
  msg: 'The post is created a day ago and will be upvoted by 11.88%'
}
```

* If voted by cheetah

```
{  msg: 'CHEETAH' }
```

* if post too old

```
{ msg: 'OLD_POST' }
```

* if post not found

```
{ msg: 'POST_NOT_FOUND' }
```

#### Upvote

##### code

```
const util = require('steem-upvote-util');

const author = 'superoo7';
const permlink = 'gopro-hero-6-2018-02-13-09-33-41';
const weightage = 50 * 100;

util.upvote('STEEM_POSTING_KEY', 'STEEM_USERNAME', author, permlink, weightage)
    .then(data => {
      if (data === 'ERROR') {
        console.log('unable to upvote');
      } else {
        console.log('upvoted');
      }
    });
```

## LICENSE

MIT
