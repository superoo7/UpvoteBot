import { aboutTest } from './index.test';
import regexTest from './regex.test';
import { main, upvote, checkPostAge } from '../index';

// REGEX TEST
regexTest();

// ABOUT POST TEST
aboutTest();

// main
const config = {
  maximumPostAge: 302400000,
  minimumPostAge: 1800000,
  minimumLength: 250,
  optimumLength: 4000
};

//https://steemit.com/sevendaybnwchallenge/@elizacheng/my-third-round-of-seven-day-black-and-white-challenge-day-5

let res = checkPostAge(
  '2018-02-18T19:10:15',
  config.maximumPostAge,
  config.minimumPostAge
);
console.log(res);

main(
  'oliverbix',
  'earn-free-100-tlc-coins-uecretsiz-100-tlc-coin-kazanin',
  config
).then(data => console.log(data));
