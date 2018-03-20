import moment from 'moment';
import {
  aboutPost,
  checkPostAge,
  weightageForPost,
  beautifyDate,
  getComment
} from '../index';
import regexTest from './regex.test';
import { main, upvote } from '../index';


// REGEX TEST
regexTest();


// main
const config = {
  maximumPostAge: 302400000,
  minimumPostAge: 1800000,
  minimumLength: 250,
  optimumLength: 4000,
  unwantedTags: [
    'steepshot',
    'dmania',
    'decentmeme',
    'nsfw'
  ],
  requiredTags: ['teammalaysia'],
  consideredTags: ['bitcoin', 'cryptocurrency']
};


main('cicbar', 'steemit-necessary-changes', config).then(
  data => console.log(`end: ${data.msg}`)
);


// import steem from 'steem';

// getComment(
//   'nikisteem',
//   'why-i-love-eating-eggs-on-keto'
// ).then(data => {
//   // console.log(data);
//   console.log(
//     !(
//       data.filter(comment => comment.author === 'cheetah')
//         .length === 0
//     )
//   );
// });
