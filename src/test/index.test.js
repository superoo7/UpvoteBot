import moment from 'moment';
import {
  aboutPost,
  checkPostAge,
  weightageForPost,
  beautifyDate
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
  unwantedTags: ['steepshot', 'dmania', 'decentmeme'],
  requiredTags: ['teammalaysia']
};

main(
  'superoo7',
  'my-heart-will-go-on-harmonica-version',
  config
).then(data => console.log(data));
